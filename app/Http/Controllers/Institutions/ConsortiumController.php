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
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $items = $this->model->get();
        return response()->json($items);
        return $this->response->collection($items, $this->transformer);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function create(Request $request)
    {

    }


//    /**
//     * Store a newly created resource in storage.
//     *
//     * @param  \Illuminate\Http\Request  $request
//     * @return \Illuminate\Http\Response
//     */
//    public function store(Request $request)
//    {
////        $this->authorize('create', $this->model);
//        $model = $this->model->fill($request->only($this->model->getFillable()));
//        $model->save();
////        return $this->response->item($model, $this->transformer);
//        return $this->response->item($model, $this->transformer);
//    }
//
//    /**
//     * Display the specified resource.
//     *
//     * @param  \App\Models\Libraries\Consortium $consortium
//     * @return \Illuminate\Http\Response
//     */
//    public function show(Consortium $consortium)
//    {
//        //
//    }
//
//    /**
//     * Show the form for editing the specified resource.
//     *
//     * @param  \App\Models\Libraries\Consortium $consortium
//     * @return \Illuminate\Http\Response
//     */
//    public function edit(Consortium $consortium)
//    {
//        //
//    }
//
//    /**
//     * Update the specified resource in storage.
//     *
//     * @param  \Illuminate\Http\Request  $request
//     * @param  \App\Models\Libraries\Consortium $consortium
//     * @return \Illuminate\Http\Response
//     */
//    public function update(Request $request, Consortium $consortium)
//    {
//        //
//    }
//
//    /**
//     * Remove the specified resource from storage.
//     *
//     * @param  \App\Models\Libraries\Consortium $consortium
//     * @return \Illuminate\Http\Response
//     */
//    public function destroy(Consortium $consortium)
//    {
//        //
//    }
}
