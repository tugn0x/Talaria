<?php

namespace App\Http\Controllers\References;

use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Models\References\GroupReference;
use App\Models\References\GroupReferenceTransformer;
use App\Models\References\Reference;
use Illuminate\Support\Facades\Auth;

class GroupReferenceController extends ApiController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(GroupReference $model, GroupReferenceTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;
    }

    public function store(Request $request)
    {
        if( !empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->talaria->store($this->model, $request);

        if($this->broadcast && config('apitalaria.broadcast'))
            broadcast(new ApiStoreBroadcast($model, $model->getTable(), $request->input('include')));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();;
    }

    /*public function update(Request $request, $id)
    {
        if(!empty($this->validate) )
            $this->validate($request, $this->validate);

        $id = $request->route()->parameters['group_reference'];
        $model = $this->talaria->update($this->model, $request, $id);

        if($this->broadcast && config('apitalaria.broadcast'))
            broadcast(new ApiUpdateBroadcast($model, $model->getTable(), $request->input('include')));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();;
    }*/

    public function index(Request $request)
    {
        $rif=Reference::find($request->route()->parameters['reference']);
        $u=Auth::user();
        if($rif->owner()->first()->id==$u->id)
        {
            $this->model = $this->filterRelations($request);
            $collection = $this->talaria->index($this->model, $request);

            return $this->response->paginator($collection, new $this->transformer())->morph();
        }
        else
            $this->response->errorUnauthorized(trans('apitalaria::auth.unauthorized'));

    }

    public function filterRelations($request) {
        $ref = $request->route()->parameters['reference'];
        return $this->model->inReference($ref);
    }

   /* public function show(Request $request, $id)
    {
        $id = $request->route()->parameters['group_reference'];
        $model = $this->talaria->show($this->model, $request, $id);

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }*/


    // ApiControllerTrait@delete override
        public function delete(Request $request, $id)
    {
        $ref = $request->route()->parameters['reference'];    
        $group = $request->route()->parameters['group'];
        $model=$this->model->InReference($ref)->InGroup($group)->first();

        $model = $this->talaria->delete($model, $request);

        if($this->broadcast && config('apitalaria.broadcast'))
            broadcast(new ApiDeleteBroadcast($model->id, $model->getTable()));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }


}
