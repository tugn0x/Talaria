<?php

namespace App\Http\Controllers\Requests;

use App\Http\Controllers\ApiController;
use App\Models\References\Reference;
use App\Models\References\ReferenceTransformer;
use App\Models\Requests\PatronDocdelRequest;
use App\Models\Requests\PatronDocdelRequestTransformer;
use App\Resolvers\StatusResolver;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PatronDocdelRequestController extends ApiController
{
    public function __construct(PatronDocdelRequest $model, PatronDocdelRequestTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //Sto cercando le richieste di un riferimento
        if($request->route()->parameters['id'])
        {
            $rifid=$request->route()->parameters['id'];
            $this->model = $this->model->InReference($rifid);
        }
        
        $collection = $this->nilde->index($this->model->owned(), $request);

        return $this->response->paginator($collection, new $this->transformer())->morph();
    }

    public function my(Request $request)
    {
        $model=$this->model->owned();
        if($request->has("archived"))
        {
            $arc=$request->input("archived");
            $arc+=0; //force to be integer
            $model=$model->Archived($arc);   
        }
        
        if($request->has("labelIds"))
            $model=$model->byLabel($request->input("labelIds"));
        
        if($request->has("groupIds"))
            $model=$model->byGroup($request->input("groupIds"));            
       
        $collection = $this->nilde->index($model, $request);
        return $this->response->paginator($collection, new $this->transformer())->morph();
    }

    public function store(Request $request)
    {
        $model = $this->nilde->store($this->model, $request, null, function ($model, $request) {
//            $model = $model->firstOrNew([
//                'user_id' => $model->user_id,
//                'library_id' => $request->library,
//            ]);
            return $model;
        });
        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

    public function changeStatus(Request $request,$id)
    {
       // $this->authorize($this->model);
        $model = $this->model->findOrFail($id);

        if($request->input("status"))
        {
            $sr=new StatusResolver($model);
            
            $newstatus=$request->input("status");

            $others=[];

            switch ($newstatus)
            {
               // case 'userAskCancel': $others=['cancel_request_date'=>Carbon::now()]; break;
                
                case 'canceled': $others=['cancel_date'=>Carbon::now()]; break;
                
                case "waitingForCost": $others=['cost'=>$request->input("cost")]; break;
                
                case "costAccepted": 
                case "costNotAccepted": $others=['answer_cost_date'=>Carbon::now()]; break;
                
                case "readyToDelivery": $others=['delivery_ready_date'=>Carbon::now()]; break;
                
                case 'received': $others=['fullfill_date'=>Carbon::now()]; break;    
                case 'notReceived': $others=['notfulfill_date'=>Carbon::now()]; break;                    
            }

            $sr->changeStatus($newstatus,$others);
        }
        return $this->response->item($model, new $this->transformer())->morph();
    }
}
