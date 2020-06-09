<?php

namespace App\Http\Controllers\References;

use App\Http\Controllers\ApiController;
use App\Models\BaseLightTransformer;
use App\Models\References\Label;
use App\Models\References\Reference;
use App\Models\References\ReferenceTransformer;
use Illuminate\Http\Request;

class LabelController extends ApiController
{
    public function __construct(Label $model, BaseLightTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $collection = $this->nilde->index($this->model->owned(), $request);
        return $this->response->paginator($collection, new $this->transformer())->morph();
    }

   /* public function my(Request $request)
    {
        $this->authorize($this->model);
        $count = $request->input('pageSize', config('api.page_size'));
        $my_applications = $this->model->owned()->orderBy('updated_at','desc')->paginate($count);

        return $this->response->paginator($my_applications, new $this->transformer())->morph();
    }*/

    public function store(Request $request)
    {
        $model = $this->nilde->store($this->model, $request, null, function ($model, $request) {
//            $model = $model->firstOrNew([
//                'user_id' => $model->user_id,
//                'library_id' => $request->library,
//            ]);
            return $model;
        });
        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }
}
