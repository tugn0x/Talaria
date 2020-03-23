<?php

namespace App\Http\Controllers\Libraries;

use App\Models\Libraries\DepartmentTransformer;
use App\Models\Libraries\Library;
use App\Models\Libraries\LibraryTransformer;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;

class LibraryController extends ApiController
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

    public function show(Request $request, $id)
    {
        $model = $this->nilde->show($this->model, $request, $id);
//        $model->departments()->select('name', 'id')->get();
        $model->departments;

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

    public function departments(Request $request, $id)
    {
//        dd($id);
        $departments = $this->model->findOrFail($id)->departments()->select('name', 'id')->get();

        return $this->collection($departments, new DepartmentTransformer());
//        $model = $this->nilde->show($this->model->with('departments'), $request, $id);
//
//        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages());
    }

//    public function optionList(Request $request)
//    {
//        $this->nilde->disableAuthorize();
//
//        $collection = $this->nilde->optionList($this->model, $request, function($collection, $request)
//        {
//            if($request->get('type'))
//            {
//                $collection->where('valid', 1);
//            }
//
//            return $collection;
//        });
//        $this->nilde->enableAuthorize();
//
//        return $this->response->array($collection->sortBy('name')->values()->sortBy('id')->all());
//    }

    public function store(Request $request)
    {
        if( !empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->nilde->store($this->model, $request);

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

//            //Update relation with Granted_permissions
            if($request->has('granted_permissions'))
            {
                $granted_permissions = (is_array($request->input('granted_permissions'))) ? $request->input('granted_permissions') : [$request->input('granted_permissions')];
                if( $model->setPermissionOnObject($granted_permissions) )
                {
                    $model->addInternalMessage(trans('apiclu::response.update_relation_failed', ['name' => 'Granted_permissions']), 'error');
                }
            }
            return $model;
        });

        if($this->broadcast && config('apinilde.broadcast'))
            broadcast(new ApiUpdateBroadcast($model, $model->getTable(), $request->input('include')));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }
}
