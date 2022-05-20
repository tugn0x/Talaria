<?php

namespace App\Http\Controllers\Libraries;

use App\Http\Controllers\ApiController;
use App\Models\BaseTransformer;
use App\Models\Libraries\Library;
use App\Models\Libraries\Delivery;
use App\Models\Libraries\DeliveryTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DeliveryController extends ApiController
{
    public function __construct(Delivery $model, DeliveryTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;

    }

    public function index(Request $request)
    {
        $this->model = $this->filterRelations($request);
        $items = $this->model->get();
        
        //return $this->response->collection($items, new $this->transformer())->morph();

        //col paginatore
        $collection = $this->nilde->index($this->model, $request);
        return $this->response->paginator($collection, new $this->transformer())->morph();
        

    }

    public function show(Request $request, $id)
    {
        $id = $request->route()->parameters['delivery_id'];
        $model = $this->nilde->show($this->model, $request, $id);

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }
    
    public function update(Request $request, $id)
    {
         if(!empty($this->validate) )
             $this->validate($request, $this->validate);
 
         $id = $request->route()->parameters['delivery_id'];
         $model = $this->nilde->update($this->model, $request, $id);
 
         if($this->broadcast && config('apinilde.broadcast'))
             broadcast(new ApiUpdateBroadcast($model, $model->getTable(), $request->input('include')));
 
         return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();;
     }

    public function filterRelations($request) {
        $library = $request->route()->parameters['library'];
        return $this->model->inLibrary($library);
    }


    public function store(Request $request)
    {
        $model = $this->nilde->store($this->model, $request, null, function ($model, $request) {
            $model = $model->firstOrNew([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'openinghours' => $request->openinghours,
                'library_id' => $request->library,
                'description'=> $request->description,
                'country_id'=> $request->country_id,
                'address'=> $request->address,
                'town'=> $request->town,
                'district'=> $request->district,
                'postcode'=> $request->postcode,
                'state'=> $request->state,                 
            ]);
            return $model;
        });
        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }
     // ApiControllerTrait@delete override
    // because we use only delivery_id id to delete it instead of library_id
    public function delete(Request $request, $id)
    {
        $id = $request->route()->parameters['delivery_id'];
        $model = $this->nilde->delete($this->model, $request, $id);

        if($this->broadcast && config('apinilde.broadcast'))
            broadcast(new ApiDeleteBroadcast($model->id, $model->getTable()));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

    //NOTE: i cannot auth the model (because is an OptionList)
    //so i have to filter here by library andh auth
    public function optionList(Request $request)
    {   
        $l=Library::find($request->route()->parameters['library']);
        
        /*$u=Auth::user();
        if($u->can('manage',$l)||$u->can('deliver',$l)||$u->can('borrow',$l))
        {
            $collection = $this->nilde->optionList($this->model, $request,function ($model,$request) use ($l) {
                return $model->inLibrary($l->id);
            });

            return $this->response->array($collection->toArray());

        }
        else  $this->response->errorUnauthorized(trans('apinilde::auth.unauthorized'));
        */

        //option list must be public available
        $collection = $this->nilde->optionList($this->model, $request,function ($model,$request) use ($l) {
            return $model->inLibrary($l->id);
        });
        return $this->response->array($collection->toArray());
    }

}
