<?php

namespace App\Http\Controllers\Libraries;

use App\Models\Libraries\Library;
use App\Models\Libraries\LibraryTransformer;
use App\Models\Libraries;
use App\Models\LibrariesTransformer;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Models\Libraries\LibraryUserTransformer;
use App\Models\Libraries\LibraryUser;

class LibraryUserController extends ApiController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(LibraryUser $model, LibraryUserTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;
    }

    public function my(Request $request)
    {
        $this->authorize($this->model);
        $count = $request->input('pageSize', config('api.page_size'));
//        $my_applications = $this->model->owned()->with('library')->orderBy('updated_at','desc')->paginate($count);
        $my_applications = $this->model->owned()->orderBy('updated_at','desc')->paginate($count);

        return $this->response->paginator($my_applications, new $this->transformer())->morph();
    }

    public function store(Request $request)
    {
        $model = $this->nilde->store($this->model, $request, null, function ($model, $request) {
            //ogni nuova rich va messa in attesa
            $model->status=config("constants.patron_status.pending");
            return $model;
        });
        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

    public function update(Request $request, $id)
    {
        if(!empty($this->validate) )
            $this->validate($request, $this->validate);

        $id = $request->route()->parameters['library_user'];
        $model = $this->nilde->update($this->model, $request, $id);

        if($this->broadcast && config('apinilde.broadcast'))
            broadcast(new ApiUpdateBroadcast($model, $model->getTable(), $request->input('include')));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();;
    }

    public function index(Request $request)
    {
        $this->model = $this->filterRelations($request);
        $collection = $this->nilde->index($this->model, $request);

        return $this->response->paginator($collection, new $this->transformer())->morph();
    }

    public function filterRelations($request) {
        $library = $request->route()->parameters();
        return $this->model->inLibrary($library);
    }

    public function show(Request $request, $id)
    {
        $id = $request->route()->parameters['library_user'];
        $model = $this->nilde->show($this->model, $request, $id);

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

}
