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
        $my_applications = $this->model->owned()->with('library')->orderBy('updated_at','desc')->paginate($count);

        return $this->response->paginator($my_applications, new $this->transformer());
    }

    public function store(Request $request)
    {
        $model = $this->nilde->store($this->model, $request, null, function ($model, $request) {
            $model = $model->firstOrNew([
                'user_id' => $model->user_id,
                'library_id' => $request->library_id,

                'department_id' => $request->department_id,
                'title_id' => $request->title_id,
            ]);
            return $model;
        });
        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages());
    }

    public function update(Request $request, $id)
    {
        if(!empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->nilde->update($this->model, $request, $id);

        if($this->broadcast && config('apinilde.broadcast'))
            broadcast(new ApiUpdateBroadcast($model, $model->getTable(), $request->input('include')));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages());
    }

}
