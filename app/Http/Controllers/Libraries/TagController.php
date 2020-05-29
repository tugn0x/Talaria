<?php

namespace App\Http\Controllers\Libraries;

use App\Http\Controllers\ApiController;
use App\Models\BaseLightTransformer;
use App\Models\Libraries\Tag;
use App\Models\References\Reference;
use App\Models\References\ReferenceTransformer;
use Illuminate\Http\Request;

class TagController extends ApiController
{
    public function __construct(Tag $model, BaseLightTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;
    }

    public function index(Request $request)
    {
        $this->model = $this->filterRelations($request);
        $items = $this->model->get();
        return response()->json($items);
        //$collection = $this->nilde->index($this->model, $request);
        //return $this->response->paginator($collection, new $this->transformer())->morph();
    }

    public function update(Request $request, $id)
    {
         if(!empty($this->validate) )
             $this->validate($request, $this->validate);
 
         $id = $request->route()->parameters['tag_id'];
         $model = $this->nilde->update($this->model, $request, $id);
 
         if($this->broadcast && config('apinilde.broadcast'))
             broadcast(new ApiUpdateBroadcast($model, $model->getTable(), $request->input('include')));
 
         return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();;
     }

    public function filterRelations($request) {
        $library = $request->route()->parameters();
        return $this->model->inLibrary($library);
    }


    public function store(Request $request)
    {
        $model = $this->nilde->store($this->model, $request, null, function ($model, $request) {
            $model = $model->firstOrNew([
                'name' => $model->name,
                'library_id' => $request->library,
            ]);
            return $model;
        });
        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }
}
