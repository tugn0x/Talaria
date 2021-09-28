<?php

namespace App\Http\Controllers\Libraries;

use App\Http\Controllers\ApiController;
use App\Models\BaseLightTransformer;
use App\Models\Libraries\Tag;
use App\Models\References\Reference;
use App\Models\References\ReferenceTransformer;
use Illuminate\Http\Request;
use App\Models\Libraries\Library;
use Illuminate\Support\Facades\Auth;


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
 
         $tid = $request->route()->parameters['tag_id'];
         $model = $this->nilde->update($this->model, $request, $tid);
 
         if($this->broadcast && config('apinilde.broadcast'))
             broadcast(new ApiUpdateBroadcast($model, $model->getTable(), $request->input('include')));
 
         return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();;
     }

     public function show(Request $request, $id)
     {
         $tid = $request->route()->parameters['tag_id'];
         $model = $this->nilde->show($this->model, $request, $tid);
 
         return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
     }

    public function filterRelations($request) {
        $library = $request->route()->parameters();
        return $this->model->inLibrary($library);
    }


    public function store(Request $request)
    {
        $l=Library::find($request->library);
        $u=Auth::user();
        if($u->can('manage',$l)||$u->can('borrow',$l)||$u->can('lend',$l)||$u->can('deliver',$l))
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
        else  $this->response->errorUnauthorized(trans('apinilde::auth.unauthorized'));
    }

    //NOTE: i cannot auth the model (because is an OptionList)
    //so i have to filter here by library andh auth
    public function optionList(Request $request)
    {   
        $l=Library::find($request->route()->parameters['library']);
        $u=Auth::user();
        if($u->can('manage',$l)||$u->can('borrow',$l)||$u->can('lend',$l)||$u->can('deliver',$l))
        {
            $collection = $this->nilde->optionList($this->model, $request,function ($model,$request) use ($l) {
                return $model->inLibrary($l->id);
            });

            return $this->response->array($collection->toArray());
        }
        else  $this->response->errorUnauthorized(trans('apinilde::auth.unauthorized'));
    }

    // ApiControllerTrait@delete override    
    public function delete(Request $request, $id)
    {
        $tid = $request->route()->parameters['tag_id'];
        $model = $this->nilde->delete($this->model, $request, $tid);

        if($this->broadcast && config('apinilde.broadcast'))
            broadcast(new ApiDeleteBroadcast($model->id, $model->getTable()));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
       
    }
}
