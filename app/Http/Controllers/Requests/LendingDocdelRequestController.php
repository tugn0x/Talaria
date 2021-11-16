<?php
//TODO: FIX

namespace App\Http\Controllers\Requests;

use App\Http\Controllers\ApiController;
use App\Models\References\Reference;
use App\Models\BaseTransformer;
use App\Models\Libraries\Tag;
use App\Models\Requests\LendingDocdelRequest;
use App\Models\Requests\LendingDocdelRequestTransformer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LendingDocdelRequestController extends ApiController
{
    public function __construct(LendingDocdelRequest $model, LendingDocdelRequestTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;
         
    }

   
    public function index(Request $request)
    {
        
         $l=\App\Models\Libraries\Library::find($request->route()->parameters['library']);
        
        //$libid = $request->route()->parameters['library']; 

        if ($request->has("all_lender")) //request to all library
        {
            if($request->has("all_lender"))
            {
                //Log::info(print_r($request->has("all_lender"), true));   

                $all=$request->input("all_lender");
                $all+=0; //force to be integer
                
                $this->model = $this->model->Lendingalllender($all);   
            }

            $collection = $this->nilde->index( $this->model , $request);        

            return $this->response->paginator($collection, new $this->transformer())->morph();
        }
        else //one library selected
        {
            $this->model = $this->filterRelations($request);        
        $l=\App\Models\Libraries\Library::find($request->route()->parameters['library']);
        $u=Auth::user();

        if($u->can('manage',$l)||$u->can('lend',$l)||$u->can('borrow',$l)||$u->can('deliver',$l))
        {
            if($request->has("all_lender"))
            {
                $all=$request->input("all_lender");
                $all+=0; //force to be integer
                Log::info(print_r( $all, true));   

                $this->model = $this->model->Lendingalllender($all);   
            }
            else 
            {
                //$this->model->Lendingalllender(0); // not sending to all libraries
                
                if($request->has("lending_archived"))
                {
                    $arc=$request->input("lending_archived");
                    $arc+=0; //force to be integer
                    $this->model = $this->model->Lendingarchived($arc);   
                }
                else $this->model->Lendingarchived(0); //not archived
            
            }

            

            
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

    public function show(Request $request, $id)
    {
        $id = $request->route()->parameters['id'];
        
        $model = $this->nilde->show($this->model, $request, $id);

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

    public function selectAllrequests(Request $request)
    {
        $model = $this->nilde->show($this->model, $request, $id);

        $collection = $this->nilde->index( $this->model , $request);        

        return $this->response->paginator($collection, new $this->transformer())->morph();

    }

    //TODO: FIX
    public function changeStatus(Request $request,$id)
    {

        //$this->authorize($this->model);
        $id = $request->route()->parameters['id'];
        $model = $this->model->findOrFail($id);
        $lib = $request->route()->parameters['library'];
        $extra=$request->has("extrafields")?$request->input("extrafields"):[];
        
        if($request->input("status"))
             $model=$model->changeStatus($request->input("status"),$extra);
        
        if($model)
            return $this->response->item($model, new $this->transformer())->morph();           
        else //if i delete the model 
            return $this->response->noContent();
    }

    public function changelendingarchived(Request $request,$id)
    {
        $id = $request->route()->parameters['id'];
        
        $arcl = LendingDocdelRequest::find($id);
        
        $model = $this->nilde->show($this->model, $request, $id);
  
        if($arcl->lending_archived==0) {
            $arcl->lending_archived = 1;
            $arcl->save();
        }
        else
        {
            $arcl->lending_archived = 0;
            $arcl->save();
        }

        return $this->response->item($model, new $this->transformer())->morph();         
    }

    public function acceptallLenderLending(Request $request,$id)
    { 

        Log::info(print_r($request->route()->parameters['library'], true));   

        $id = $request->route()->parameters['id'];
        $arcl = LendingDocdelRequest::find($id);
        $model = $this->nilde->show($this->model, $request, $id);
  
        if($arcl->all_lender==1) {
            $arcl->lending_library_id=26;
            $arcl->all_lender = 0;
            $arcl->lending_status="willSupply";
            $arcl->save();
        }
        else
        {
            //$arcl->lending_archived = 0;
            //$arcl->save();
        }

        return $this->response->item($model, new $this->transformer())->morph();         
    }


    //takes a JSON with { requests: [id,id,id], field1: val, field2:val ... labelIds:[id,id,id,'newlabel'] }
    public function updateSelected(Request $request)
    {
       $libid = $request->route()->parameters['library'];
 
      
       //$u=Auth::user();        
     
        if($request->has("requests"))
        {
            $ids=$request->input("requests");
            if(sizeof($ids)>0)
            {                
               //aggiorno i campi della richiesta (nel caso mi venissero passati)
               LendingDocdelRequest::whereIn('id', $ids)->update($request->except(["requests","tagIds"]));
   
               foreach($ids as $reqid) 
               {
                   $req=LendingDocdelRequest::find($reqid);  

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
            $model=LendingDocdelRequest::whereIn('id', $ids);
        }
        else $model=$this->model;
        
            
        $collection = $this->nilde->index($model, $request);
        return $this->response->paginator($collection, new $this->transformer())->morph();
    }

}