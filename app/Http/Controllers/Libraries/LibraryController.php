<?php

namespace App\Http\Controllers\Libraries;

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

//        app('Dingo\Api\Transformer\Factory')->register(Library::class, LibraryTransformer::class);

//        dd($this->transformer);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
//        dd(get_class($this->nilde));
        $collection = $this->nilde->index($this->model->select('*'), $request);

        return $this->response->paginator($collection, new $this->transformer());
    }
//    public function index()
//    {
//        $items = $this->model->get();
//        return $this->response->collection($items, $this->transformer);
//    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
//        $this->authorize('create', $this->model);
        $model = $this->model->fill($request->only($this->model->getFillable()));
        $model->save();
        return $this->response->item($model, $this->transformer);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }
}
