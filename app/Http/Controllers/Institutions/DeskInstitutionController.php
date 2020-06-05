<?php

namespace App\Http\Controllers\Institutions;

use App\Http\Controllers\ApiController;
use App\Models\Institutions\DeskInstitution;
use App\Models\Institutions\DeskInstitutionTransformer;
use Illuminate\Http\Request;

class DeskInstitutionController extends ApiController
{
        /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(DeskInstitution $model, DeskInstitutionTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;
    }
    
   public function update(Request $request, $id)
   {
        if(!empty($this->validate) )
            $this->validate($request, $this->validate);

        $id = $request->route()->parameters['desk_institution'];
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
        $inst = $request->route()->parameters();
        return $this->model->inInstitution($inst);
    }

    public function show(Request $request, $id)
    {
        $id = $request->route()->parameters['desk_institution'];
        $model = $this->nilde->show($this->model, $request, $id);

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

    // ApiControllerTrait@delete override
    public function delete(Request $request, $id)
    {
        $id = $request->route()->parameters['desk_institution'];
        $model = $this->nilde->delete($this->model, $request, $id);

        if($this->broadcast && config('apinilde.broadcast'))
            broadcast(new ApiDeleteBroadcast($model->id, $model->getTable()));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

}
