<?php
//TODO: FIX

namespace App\Http\Controllers\Requests;

use App\Http\Controllers\ApiController;
use App\Models\References\Reference;
use App\Models\BaseTransformer;
use App\Models\Libraries\Tag;
use App\Models\Requests\BorrowingDocdelRequest;
use App\Models\Requests\BorrowingDocdelRequestTransformer;
use App\Resolvers\StatusResolver;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

        if($u->can('manage',$l)||$u->can('borrow',$l)||$u->can('deliver',$l))
        {
            if($request->has("archived"))
            {
                $arc=$request->input("archived");
                $arc+=0; //force to be integer
                $this->model = $this->model->Archived($arc);   
            }
            else $this->model->Archived(0); //not archived
            
            if($request->has("tagIds"))
                $this->model = $this->model->byTags($request->input("tagIds"));        
            

            $collection = $this->nilde->index( $this->model , $request);        
            return $this->response->paginator($collection, new $this->transformer())->morph();
        }
        else  $this->response->errorUnauthorized(trans('apinilde::auth.unauthorized'));
    }

    public function filterRelations($request) {
        $lib = $request->route()->parameters['library'];
        return $this->model->inLibrary($lib);
    }

     //takes a JSON with { requests: [id,id,id], field1: val, field2:val ... labelIds:[id,id,id,'newlabel'] }
     public function updateSelected(Request $request)
     {
        $libid = $request->route()->parameters['library'];

        $u=Auth::user();        

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

     public function show(Request $request, $id)
     {
         $id = $request->route()->parameters['id'];
         $model = $this->nilde->show($this->model, $request, $id);
 
         return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
     }

     //override update()
     public function update(Request $request, $id)
     {        
        $bid = $request->route()->parameters['id'];  
        
        $model = $this->nilde->update($this->model, $request, $bid);

        if($request->has("reference"))
        {    
            
            $reffields=$request->input("reference");
            
            //NOTE: this will not call Policy!!
            $model->reference()->update($reffields);                   
        }

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

    //TODO: FIX
    public function changeStatus(Request $request,$id)
    {
        // $this->authorize($this->model);
        $id = $request->route()->parameters['id'];
        $model = $this->model->findOrFail($id);

        if($request->input("status"))
        {
            $sr=new StatusResolver($model);
            
            $newstatus=$request->input("status");

            $others=[];            

            switch ($newstatus)
            {                
                case 'canceled': 
                    $others=['cancel_date'=>Carbon::now()]; 
                    if($model->borrowing_status=="newrequest" && !$model->patrondocdelrequest) //new request without patron
                    {                        
                        $model->forceDelete();
                        return $this->response->item($model, new $this->transformer())->morph();
                    }
                    else if($model->borrowing_status=="newrequest") //new request with patron
                    {
                        $newstatus="canceleddirect";                        
                    } 
                    else if($model->lendingLibrary) 
                        $newstatus="cancelrequested";                              
                    else {
                        $newstatus="canceleddirect";
                    }
                    break;
                    
                case 'canceleddirect': 
                    $others=['cancel_date'=>Carbon::now()];
                    break;
            }

            $sr->changeStatus($newstatus,$others);
        }
        return $this->response->item($model, new $this->transformer())->morph();
    }
}





