<?php
namespace App\Traits\Auth;

//use Dingo\Api\Dispatcher;
use App\Http\Controllers\Helpers;
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
        $collection = $this->nilde->index($this->model->select('*'), $request);

        return $this->response->paginator($collection, new $this->transformer());
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
        $collection = $this->nilde->optionList($this->model, $request);

        return $this->response->array($collection->toArray());
    }

    public function show(Request $request, $id)
    {
        $model = $this->nilde->show($this->model, $request, $id);

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages());
    }

    public function store(Request $request)
    {
        if( !empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->nilde->store($this->model, $request);

        if($this->broadcast && config('apiclu.broadcast'))
            broadcast(new ApiStoreBroadcast($model, $model->getTable(), $request->input('include')));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages());
    }


    public function update(Request $request, $id)
    {
        if(!empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->nilde->update($this->model, $request, $id);

        if($this->broadcast && config('apiclu.broadcast'))
            broadcast(new ApiUpdateBroadcast($model, $model->getTable(), $request->input('include')));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages());
    }

    public function bulkSave(Request $request)
    {
        $collection = $this->nilde->bulkSave($this->model, $request);

        return $this->response->collection($collection, new $this->transformer());
    }

    public function delete(Request $request, $id)
    {
        $model = $this->nilde->delete($this->model, $request, $id);

        if($this->broadcast && config('apiclu.broadcast'))
            broadcast(new ApiDeleteBroadcast($model->id, $model->getTable()));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages());
    }

    public function bulkDelete(Request $request, $ids)
    {
        $collection = $this->nilde->bulkDelete($this->model, $request, $ids);

        return $this->response->collection($collection, new $this->transformer());
    }

    public function destroy(Request $request, $id)
    {
        $model = $this->nilde->destroy($this->model, $request, $id);

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages());
    }

    public function bulkDestroy(Request $request, $ids)
    {
        $collection = $this->nilde->bulkDestroy($this->model, $request, $ids);

        return $this->response->collection($collection, new $this->transformer());
    }

    public function restore(Request $request, $id)
    {
        $model = $this->nilde->restore($this->model, $request, $id);

        if($this->broadcast && config('apiclu.broadcast'))
            broadcast(new ApiRestoreBroadcast($model->id, $model->getTable()));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages());
    }

    public function bulkRestore(Request $request, $ids)
    {
        $collection = $this->nilde->bulkRestore($this->model, $request, $ids);

        return $this->response->collection($collection, new $this->transformer());
    }

    public function attach(Request $request, $id, $relation_name, $ids=null)
    {
        if(!empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->nilde->attach($this->model, $request, $id, $relation_name, $ids);

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages());
    }

    public function detach(Request $request, $id, $relation_name, $ids=null)
    {
        if(!empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->nilde->detach($this->model, $request, $id, $relation_name, $ids);

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages());
    }

    public function sync(Request $request, $id, $relation_name, $ids=null)
    {
        if(!empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->nilde->sync($this->model, $request, $id, $relation_name, $ids);

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages());
    }
}
