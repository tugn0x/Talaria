<?php

namespace App\Http\Controllers\Projects;

use App\Models\Projects\Project;
use App\Models\Projects\ProjectTransformer;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;

class ProjectController extends ApiController
{
    public function __construct(Project $model, ProjectTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;
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

}
