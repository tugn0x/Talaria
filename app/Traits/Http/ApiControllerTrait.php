<?php
namespace App\Traits\Http;

//use Dingo\Api\Dispatcher;
use App\Traits\Helpers;
use Illuminate\Cache\TaggableStore;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;
use InvalidArgumentException;
use Silber\Bouncer\Database\HasRolesAndAbilities;
use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Bus\DispatchesJobs;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

/*
NOTA x ALE: 
nei controller posso chiamare $this->authorize($model)
che non fa altro che chiamare la AuthorizesRequests::authorize($ability, $arguments)
dove se $ability non è una stringa (ma un model ad es.), allora va a prendere il nome della funzione chiamata nel controller!
(es: se dalla route chiamo index del controlle dove vado a eseguire $this->authorize($this->model), in pratica
viene chimato app(Gate::class)->authorize("index", $this->model) ... che chiamaerà la policy ...

Quindi in pratica se da controller@index chiamo authorize($model) in pratica sto chiamando authorize("index",$model)
*/     

trait ApiControllerTrait
{
    use AuthorizesRequests,
        DispatchesJobs,
        ValidatesRequests,
        Helpers;

//    protected static $modelClass = null;
//    protected static $transformerClass = null;

    protected $model;
    protected $api;
    protected $transformer;
    protected $broadcast = false;
    protected $validate = [];

    /*
     * The attributes that should override default attach, detach, sync.
     *
     * @var array
     */
    protected $custom_relationship_methods = [];

    /**
     * Retrive paginated list
     *
     * Get a JSON representation of all the registered users.
     *
     * @Get("/")
     * @Versions({"v1"})
     * @Transaction({
     *      @Request("include=&page=1&pageSize=20&sort=id&sortInfo=desc&status=publish&trashed=false"),
     *      @Response(200, body={"id": 10, "username": "foo"}),
     *      @Response(422, body={"error": {"username": {"Username is already taken."}}})
     * })
     * @Parameters({
     *      @Parameter("example", type="integer", required=true, description="This is an example.", default=1)
     * })
     *
     * @param Request $request
     * @return ApiResponse
     */
    public function index(Request $request)
    {
        $collection = $this->talaria->index($this->model->select('*'), $request);

        return $this->response->paginator($collection, new $this->transformer())->morph();
    }

    /**
     * OPTION LIST
     * Retrive collection and return all items with the column passed as 'label', 'value'.
     *
     * @param Request $request
     * @return ApiResponse
     */
    public function optionList(Request $request)
    {
        $collection = $this->talaria->optionList($this->model, $request);

        return $this->response->array($collection->toArray());
    }

    public function show(Request $request, $id)
    {
        $model = $this->talaria->show($this->model, $request, $id);

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

    public function store(Request $request)
    {
        if( !empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->talaria->store($this->model, $request);

        if($this->broadcast && config('apitalaria.broadcast'))
            broadcast(new ApiStoreBroadcast($model, $model->getTable(), $request->input('include')));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();;
    }

    public function create(Request $request)
    {
        return $this->store($request);
    }


    public function update(Request $request, $id)
    {
        if(!empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->talaria->update($this->model, $request, $id);

        if($this->broadcast && config('apitalaria.broadcast'))
            broadcast(new ApiUpdateBroadcast($model, $model->getTable(), $request->input('include')));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

    public function bulkSave(Request $request)
    {
        $collection = $this->talaria->bulkSave($this->model, $request);

        return $this->response->collection($collection, new $this->transformer())->morph();
    }

    public function delete(Request $request, $id)
    {
        $model = $this->talaria->delete($this->model, $request, $id);

        if($this->broadcast && config('apitalaria.broadcast'))
            broadcast(new ApiDeleteBroadcast($model->id, $model->getTable()));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

    public function bulkDelete(Request $request, $ids)
    {
        $collection = $this->talaria->bulkDelete($this->model, $request, $ids);

        return $this->response->collection($collection, new $this->transformer())->morph();
    }

    public function destroy(Request $request, $id)
    {
        $model = $this->talaria->destroy($this->model, $request, $id);

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

    public function bulkDestroy(Request $request, $ids)
    {
        $collection = $this->talaria->bulkDestroy($this->model, $request, $ids);

        return $this->response->collection($collection, new $this->transformer())->morph();
    }

    public function restore(Request $request, $id)
    {
        $model = $this->talaria->restore($this->model, $request, $id);

        if($this->broadcast && config('apitalaria.broadcast'))
            broadcast(new ApiRestoreBroadcast($model->id, $model->getTable()));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

    public function bulkRestore(Request $request, $ids)
    {
        $collection = $this->talaria->bulkRestore($this->model, $request, $ids);

        return $this->response->collection($collection, new $this->transformer())->morph();
    }

    public function attach(Request $request, $id, $relation_name, $ids=null)
    {
        if(!empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->talaria->attach($this->model, $request, $id, $relation_name, $ids);

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

    public function detach(Request $request, $id, $relation_name, $ids=null)
    {
        if(!empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->talaria->detach($this->model, $request, $id, $relation_name, $ids);

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

    public function sync(Request $request, $id, $relation_name, $ids=null)
    {
        if(!empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->talaria->sync($this->model, $request, $id, $relation_name, $ids);

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }
}
