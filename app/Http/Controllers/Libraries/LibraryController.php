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

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages());
    }


}
