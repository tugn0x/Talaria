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

        //$this->nilde->disableAuthorize();
    }

    public function store(Request $request)
    {
        if( !empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->nilde->store($this->model, $request, function($model, $request)
        {
            return $this->nilde->syncGrantedPermissions($model, $request);
        });

        if($this->broadcast && config('apinilde.broadcast'))
            broadcast(new ApiStoreBroadcast($model, $model->getTable(), $request->input('include')));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

    public function update(Request $request, $id)
    {
        if(!empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->nilde->update($this->model, $request, $id, function($model, $request)
        {
            return $this->nilde->syncGrantedPermissions($model, $request);
        });

        if($this->broadcast && config('apinilde.broadcast'))
            broadcast(new ApiUpdateBroadcast($model, $model->getTable(), $request->input('include')));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

    public function optionList(Request $request)
    {                   
        $collection = $this->nilde->optionList($this->model, $request,function ($model,$request){
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
