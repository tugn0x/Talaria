<?php

namespace App\Http\Controllers\Requests;

use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Models\Requests\DocdelRequestTag;
use App\Models\Requests\DocdelRequestTagTransformer;
use App\Models\Requests\DocdelRequest;
use Illuminate\Support\Facades\Auth;

class DocdelRequestTagController extends ApiController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(DocdelRequestTag $model, DocdelRequestTagTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;
    }
/*
    public function store(Request $request)
    {
        if( !empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->nilde->store($this->model, $request);

        if($this->broadcast && config('apinilde.broadcast'))
            broadcast(new ApiStoreBroadcast($model, $model->getTable(), $request->input('include')));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();;
    }

    public function index(Request $request)
    {
        $rif=Reference::find($request->route()->parameters['reference']);
        $u=Auth::user();
        if($rif->owner()->first()->id==$u->id)
        {
            $this->model = $this->filterRelations($request);
            $collection = $this->nilde->index($this->model, $request);

            return $this->response->paginator($collection, new $this->transformer())->morph();
        }
        else
            $this->response->errorUnauthorized(trans('apinilde::auth.unauthorized'));

    }*/

    public function filterRelations($request) {
        $ref = $request->route()->parameters['reference'];
        return $this->model->inReference($ref);
    }
   
    // ApiControllerTrait@delete override
    public function delete(Request $request, $id)
    {
        $tag = $request->route()->parameters['tag'];
        $ddrequest=$request->route()->parameters['ddrequest'];
        $model=$this->model->InDocdelRequest($ddrequest)->InTag($tag)->first();
       
        $l=\App\Models\Libraries\Library::find($request->route()->parameters['library']);
        $u=Auth::user();

        if($u->can('manage',$l)||$u->can('borrow',$l)||$u->can('lend',$l)||$u->can('deliver',$l))
        {
            $model = $this->nilde->delete($model, $request);

            if($this->broadcast && config('apinilde.broadcast'))
                broadcast(new ApiDeleteBroadcast($model->id, $model->getTable()));

            return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();        
        }
        else  $this->response->errorUnauthorized(trans('apinilde::auth.unauthorized'));

    }

}
