<?php

namespace App\Http\Controllers\Institutions;

use App\Http\Controllers\ApiController;
use App\Models\Institutions\Institution;
use App\Models\Institutions\InstitutionTransformer;
use Illuminate\Http\Request;

class InstitutionController extends ApiController
{
    public function __construct(Institution $model, InstitutionTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;

        //$this->talaria->disableAuthorize();
    }

    public function store(Request $request)
    {
        if( !empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->talaria->store($this->model, $request, function($model, $request)
        {
            return $this->talaria->syncGrantedPermissions($model, $request);
        });

        if($this->broadcast && config('apitalaria.broadcast'))
            broadcast(new ApiStoreBroadcast($model, $model->getTable(), $request->input('include')));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

    public function update(Request $request, $id)
    {
        if(!empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->talaria->update($this->model, $request, $id, function($model, $request)
        {
            return $this->talaria->syncGrantedPermissions($model, $request);
        });

        if($this->broadcast && config('apitalaria.broadcast'))
            broadcast(new ApiUpdateBroadcast($model, $model->getTable(), $request->input('include')));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

    public function optionList(Request $request)
    {                   
        $collection = $this->talaria->optionList($this->model, $request,function ($model,$request){
            //only active
            return $model->active()->byCountryAndType($request->input('country_id'),$request->input('institution_type_id'));
        });

        return $this->response->array($collection->toArray());
    }

  
    //override     
    public function index(Request $request)
    {        
        //filter active only
        $this->model=$this->model->active();

        return parent::index($request);    
    }

}
