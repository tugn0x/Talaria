<?php

namespace App\Http\Controllers\Requests;

use App\Http\Controllers\ApiController;
use App\Models\References\Reference;
use App\Models\BaseTransformer;
use App\Models\Libraries\Tag;
use App\Models\Requests\BorrowingDocdelRequest;
use App\Models\Requests\BorrowingDocdelRequestTransformer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Notifications\BorrowingDocdelRequestNotification;

class BorrowingDocdelRequestController extends ApiController
{
    public function __construct(BorrowingDocdelRequest $model, BorrowingDocdelRequestTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;
        
    }

   
    public function index(Request $request)
    {
        $this->model = $this->filterRelations($request);        
        
        $l=\App\Models\Libraries\Library::find($request->route()->parameters['library']);
        $u=Auth::user();

        if( $request->has("toDeliver") && $request->input("toDeliver")==1 )
        {
            if( $u->can('manage',$l) || $u->can('deliver',$l))
            {
                $this->model = $this->model->InDelivery($l->id,$request->input("deliveryId"));    
                $collection = $this->nilde->index( $this->model , $request);        
                return $this->response->paginator($collection, new $this->transformer())->morph();
            }
            else  $this->response->errorUnauthorized(trans('apinilde::auth.unauthorized'));    
        }
        else //normal borrow
        {
            if($u->can('manage',$l)||$u->can('borrow',$l))
            {
                if($request->has("archived"))
                {
                    $arc=$request->input("archived");
                    $arc+=0; //force to be integer
                    $this->model = $this->model->Archived($arc);   
                }
                else $this->model = $this->model->Archived(0); //not archived
                            
                if($request->has("tagIds"))
                    $this->model = $this->model->byTags($request->input("tagIds"));        

                $collection = $this->nilde->index( $this->model , $request);        
                return $this->response->paginator($collection, new $this->transformer())->morph();
                   
            }
            else  $this->response->errorUnauthorized(trans('apinilde::auth.unauthorized'));
        }       
    }

    public function filterRelations($request) {
        $lib = $request->route()->parameters['library'];
        return $this->model->inLibrary($lib);
    }

     //takes a JSON with { requests: [id,id,id], field1: val, field2:val ... labelIds:[id,id,id,'newlabel'] }
     public function updateSelected(Request $request)
     {
        $libid = $request->route()->parameters['library'];

        $l=\App\Models\Libraries\Library::find($libid);
        $u=Auth::user();

        if($u->can('manage',$l)||$u->can('borrow',$l))
        {
            if($request->has("requests"))
            {
             $ids=$request->input("requests");
             if(sizeof($ids)>0)
             {                
                //aggiorno i campi della richiesta (nel caso mi venissero passati)
                BorrowingDocdelRequest::whereIn('id', $ids)->update($request->except(["requests","tagIds"]));
    
                foreach($ids as $reqid) 
                {
                    $req=BorrowingDocdelRequest::find($reqid);                                                                                     
                    //update manually all tags
                    if($request->has("tagIds"))
                    {    
                        $lids=$request->input("tagIds");
                        $i=0;
                        foreach($lids as $lid)
                        {
                            if(is_string($lid))
                            {
                                $l=Tag::firstOrCreate([
                                    'name'=>$lid,
                                    'library_id'=>$libid
                                ]);
                                if($l)
                                    $lids[$i]=$l->id; //sostituisco la stringa con l'ID appena ottenuto creando la nuova etichetta
                            }
                            $i++;
                        }
                    
                        //uso il syncWithoutDetaching in modo da aggingere evitando i doppioni (e senza eliminare quelli già esistenti)
                        //Nota: non mi preoccupo di eliminare le label non passate perchè questa funzione
                        //viene usata solo x aggiungere
                        $req->tags()->syncWithoutDetaching($lids);    
                    }
                    
                } 
              }
              $model=BorrowingDocdelRequest::whereIn('id', $ids);
            }
            else $model=$this->model;
         
             
            $collection = $this->nilde->index($model, $request);
            return $this->response->paginator($collection, new $this->transformer())->morph();
        }
        else  $this->response->errorUnauthorized(trans('apinilde::auth.unauthorized'));
     }


     public function store(Request $request)
     {
         /*$model = $this->nilde->store($this->model, $request, null, function ($model, $request) {
 //            $model = $model->firstOrNew([
 //                'user_id' => $model->user_id,
 //                'library_id' => $request->library,
 //            ]);
             return $model;
         });
         return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
         */

        $libid = $request->route()->parameters['library'];

        $l=\App\Models\Libraries\Library::find($libid);
        $u=Auth::user();

        if($u->can('manage',$l)||$u->can('borrow',$l))
        {
            //Create new Ref with data on body, and get ID
            $ref=Reference::create($request->all()); 
            $rid=$ref->id;

            //Create new borrow with reference: ID + borrowing_library_id: request->library
            //return newly created borrowing
            $model = $this->model;
            $model->fill([
                "reference_id"=>$rid,             
                "borrowing_library_id"=>$request->route()->parameters['library']
            ]);

            $model->save();
            

            return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
        }
        else  $this->response->errorUnauthorized(trans('apinilde::auth.unauthorized'));
         
     }

     public function show(Request $request, $id)
     {

        $libid = $request->route()->parameters['library'];

        $l=\App\Models\Libraries\Library::find($libid);
        $u=Auth::user();

        if($u->can('manage',$l)||$u->can('borrow',$l)||$u->can('deliver',$l))
        {
            $id = $request->route()->parameters['id'];
            $model = $this->nilde->show($this->model, $request, $id);
    
            return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
        }
        else  $this->response->errorUnauthorized(trans('apinilde::auth.unauthorized'));
        
     }

     //override update()
     public function update(Request $request, $id)
     {                 

        $libid = $request->route()->parameters['library'];

        $l=\App\Models\Libraries\Library::find($libid);
        $u=Auth::user();

        if($u->can('manage',$l)||$u->can('borrow',$l))
        {
            $bid = $request->route()->parameters['id'];  
        
            if($request->has("forward") && $request->input("forward")==1)
            {
                //when i forward i need also to archive the request
                $request->merge(["forward"=>$request->input("forward"), 
                "archived"=>1]); 
            }
    
            if($request->has("trash_type")) {
                $request->merge(["trash_type"=>$request->input("trash_type")]);
            }
    
            $model = $this->nilde->update($this->model, $request, $bid);
    
            if($request->has("reference"))
            {    
                
                $reffields=$request->input("reference");
                
                //NOTE: this will not call Policy, and will overwrite model!!            
                $model->reference()->update($reffields);                   
            }
            
            if($request->has("forward") && $request->input("forward")==1)
            {
                //App\Jobs\BorrowingRequestCloseAndForward::dispatchNow($this->model); 
                        
                //"clone" current request
                $newReq=new BorrowingDocdelRequest; //i use this instead of ::create([...]) otherwise it will not call the constructor!
                $newReq->reference_id=$model->reference_id;
                $newReq->borrowing_library_id=$model->borrowing_library_id;
                $newReq->patron_docdel_request_id=$model->patron_docdel_request_id;
                $newReq->docdel_request_parent_id=$model->id;
                            
                if($newReq->save())
                {                         
                    $n=new BorrowingDocdelRequestNotification($newReq);
                    
                    foreach ($newReq->borrowingLibraryOperators() as $op)    
                    $op->notify($n);           
                } 
    
                return $this->response->item($newReq, new $this->transformer())->setMeta($newReq->getInternalMessages())->morph();
            }
    
            return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
        }
        else  $this->response->errorUnauthorized(trans('apinilde::auth.unauthorized'));

       
    }

    
    public function changeStatus(Request $request,$id)
    {
        // $this->authorize($this->model);
        $id = $request->route()->parameters['id'];
        $model = $this->model->findOrFail($id);

        $extra=$request->has("extrafields")?$request->input("extrafields"):[];
        
        if($request->input("status"))
            $model=$model->changeStatus($request->input("status"),$extra);
        
        if($model)
            return $this->response->item($model, new $this->transformer())->morph();           
        else //if i delete the model 
            return $this->response->noContent();
    }
}





