<?php

namespace App\Http\Controllers\Libraries;

use App\Http\Controllers\ApiController;
use App\Models\BaseTransformer;
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

    /*public function index(Request $request)
    {
        $this->model = $this->filterRelations($request);
        $items = $this->model->get();
        return response()->json($items);
        //$collection = $this->nilde->index($this->model, $request);
        //return $this->response->paginator($collection, new $this->transformer())->morph();
    }*/

    public function index(Request $request)
    {
        $this->model = $this->filterRelations($request);
        $items = $this->model->get();
        
        return $this->response->collection($items, new $this->transformer())->morph();

        //col paginatore
        //$collection = $this->nilde->index($this->model, $request);
        //return $this->response->paginator($collection, new $this->transformer())->morph();

    }

    public function show(Request $request, $id)
    {
        $id = $request->route()->parameters['delivery_id'];
        $model = $this->nilde->show($this->model, $request, $id);

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

     //i miei Delivery della biblioteca x cui sto operando
    //NB: non mi serve definire la policy perchè tanto è filtrata x owner
    public function my(Request $request)
    {
        $this->model = $this->filterRelations($request);
        $count = $request->input('pageSize', config('api.page_size'));

        $my_applications = $this->model
        ->join('delivery_user', 'deliveries.id', '=', 'delivery_user.delivery_id')
        ->where('delivery_user.user_id',Auth::user()->id)
        ->select('deliveries.*')
        ->paginate($count);
        return $this->response->paginator($my_applications, new $this->transformer())->morph();
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
        $library = $request->route()->parameters();
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
                'deliveryable_id' => $request->deliveryable_id,
                'deliveryable_type' => $request->deliveryable_type
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
}
