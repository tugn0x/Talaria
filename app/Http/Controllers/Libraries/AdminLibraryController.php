<?php

/* NOTE: this controller uses standard dispatch method so it can run without "filter" or policy 
and uses AdminApiController that disable authorization/permission/abilities*/

namespace App\Http\Controllers\Libraries;

use App\Models\Libraries\Library;
use App\Models\Libraries\LibraryTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AdminApiController;

class AdminLibraryController extends AdminApiController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Library $model, LibraryTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;        

        $this->broadcast = false;
    }

    public function update(Request $request, $id)
    {
        if (!empty($this->validate))
            $this->validate($request, $this->validate);

        $model = $this->nilde->update($this->model, $request, $id, function ($model, $request) {            
            return $this->nilde->syncGrantedPermissions($model, $request);
        });

        //sync projects
        if($request->has('project_id'))
                $model->projects()->sync($request->input('project_id'));   

        //TODO: sync identifiers
        //if($request->has('identifier_id'))
        //        $model->identifiers()->sync($request->input('identifier_id'));           
        
        if ($this->broadcast && config('apinilde.broadcast'))
            broadcast(new ApiUpdateBroadcast($model, $model->getTable(), $request->input('include')));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

}    
