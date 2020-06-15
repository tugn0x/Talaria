<?php
/* NB: l'avevo preparato ma probabilmente non servirà quindi si puo' eliminare*/

namespace App\Http\Controllers\Libraries;

use App\Models\Libraries\Library;
use App\Models\Libraries\LibraryTransformer;
use App\Models\Libraries;
use App\Models\LibrariesTransformer;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Models\Libraries\DeliveryUserTransformer;
use App\Models\Libraries\DeliveryUser;
use Illuminate\Support\Facades\Auth;

class DeliveryUserController extends ApiController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(DeliveryUser $model, DeliveryUserTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;
    }

    //i miei Delivery della biblioteca x cui sto operando
    //NB: non mi serve definire la policy perchè tanto è filtrata x owner
    /*public function my(Request $request)
    {
        $library=$request->route()->parameters['library'];

        $count = $request->input('pageSize', config('api.page_size'));

        $my_applications = $this->model->owned()
        ->join('deliveries', 'delivery_id', '=', 'deliveries.id')
        ->where('library_id',$library)->paginate($count);

        return $this->response->paginator($my_applications, new $this->transformer())->morph();
    }*/
    
    public function store(Request $request)
    {
        if( !empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->nilde->store($this->model, $request);

        if($this->broadcast && config('apinilde.broadcast'))
            broadcast(new ApiStoreBroadcast($model, $model->getTable(), $request->input('include')));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();;
    }

    public function update(Request $request, $id)
    {
        if(!empty($this->validate) )
            $this->validate($request, $this->validate);

        $id = $request->route()->parameters['delivery_user'];
        $model = $this->nilde->update($this->model, $request, $id);

        if($this->broadcast && config('apinilde.broadcast'))
            broadcast(new ApiUpdateBroadcast($model, $model->getTable(), $request->input('include')));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();;
    }

    //Solo il manager della biblio puo' vedere gli operatori dei PdC
    public function index(Request $request)
    {
        $l=Library::find($request->route()->parameters['library']);
        $u=Auth::user();
        if($u->can('manage',$l))
        {
            $this->model = $this->filterRelations($request);
            $collection = $this->nilde->index($this->model, $request);

            return $this->response->paginator($collection, new $this->transformer())->morph();
        }
        else
            $this->response->errorUnauthorized(trans('apinilde::auth.unauthorized'));

    }

    public function filterRelations($request) {
        $delivery = $request->route()->parameters();
        return $this->model->inDelivery($delivery);
    }

    public function show(Request $request, $id)
    {
        $id = $request->route()->parameters['library_user'];
        $model = $this->nilde->show($this->model, $request, $id);

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

    // ApiControllerTrait@delete override
    // because we use only library_user id to delete it instead of library_id
    public function delete(Request $request, $id)
    {
        $id = $request->route()->parameters['library_user'];
        $model = $this->nilde->delete($this->model, $request, $id);

        if($this->broadcast && config('apinilde.broadcast'))
            broadcast(new ApiDeleteBroadcast($model->id, $model->getTable()));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

}
