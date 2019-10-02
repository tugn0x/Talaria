<?php

namespace App\Http\Controllers\Institutions;

use App\Http\Controllers\ApiController;
use App\Models\Institutions\Consortium;
use App\Models\Institutions\ConsortiumTransformer;
use Illuminate\Http\Request;

class ConsortiumController extends ApiController
{
    public function __construct(Consortium $model, ConsortiumTransformer $transformer)
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
    public function index()
    {
        $items = $this->model->get();
//        dd(get_class($this->response->collection($this->model->get(), new $this->transformer())));
        return $this->response->collection($items, $this->transformer);
    }

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

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Libraries\Consortium $consortium
     * @return \Illuminate\Http\Response
     */
    public function show(Consortium $consortium)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Libraries\Consortium $consortium
     * @return \Illuminate\Http\Response
     */
    public function edit(Consortium $consortium)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Libraries\Consortium $consortium
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Consortium $consortium)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Libraries\Consortium $consortium
     * @return \Illuminate\Http\Response
     */
    public function destroy(Consortium $consortium)
    {
        //
    }
}
