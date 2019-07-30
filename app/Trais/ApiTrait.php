<?php  namespace App\Traits;

//use Dingo\Api\Http\Request; // Request sostituito per poter utilizzare le form request anche richiamando il dispatcher. FormRequest estende le request base anzichpè quelle di dingo!
use Illuminate\Http\Request;
//use App\Events\ApiStoreBroadcast;
//use App\Events\ApiDeleteBroadcast;
//use App\Events\ApiRestoreBroadcast;
//use App\Events\ApiUpdateBroadcast;
use App\Events\Event;

trait ApiTrait
{
    protected $model;

    protected $transformer;

    protected $broadcast = false;

    protected $validate = [];

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
        $collection = $this->clu->index($this->model->select('*'), $request);

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
        $collection = $this->clu->optionList($this->model, $request);

        return $this->response->array($collection->toArray());
    }

    public function show(Request $request, $id)
    {
        $model = $this->clu->show($this->model, $request, $id);

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages());
    }

    public function store(Request $request)
    {
        if( !empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->clu->store($this->model, $request);

        if($this->broadcast && config('api.broadcast'))
            broadcast(new ApiStoreBroadcast($model, $model->getTable(), $request->input('include')));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages());
    }


    public function update(Request $request, $id)
    {
        if(!empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->clu->update($this->model, $request, $id);

        if($this->broadcast && config('api.broadcast'))
            broadcast(new ApiUpdateBroadcast($model, $model->getTable(), $request->input('include')));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages());
    }

    public function bulkSave(Request $request)
    {
        $collection = $this->clu->bulkSave($this->model, $request);

        return $this->response->collection($collection, new $this->transformer());
    }

    public function delete(Request $request, $id)
    {
        $model = $this->clu->delete($this->model, $request, $id);

        if($this->broadcast && config('api.broadcast'))
            broadcast(new ApiDeleteBroadcast($model->id, $model->getTable()));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages());
    }

    public function bulkDelete(Request $request, $ids)
    {
        $collection = $this->clu->bulkDelete($this->model, $request, $ids);

        return $this->response->collection($collection, new $this->transformer());
    }

    public function destroy(Request $request, $id)
    {
        $model = $this->clu->destroy($this->model, $request, $id);

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages());
    }

    public function bulkDestroy(Request $request, $ids)
    {
        $collection = $this->clu->bulkDestroy($this->model, $request, $ids);

        return $this->response->collection($collection, new $this->transformer());
    }

    public function restore(Request $request, $id)
    {
        $model = $this->clu->restore($this->model, $request, $id);

        if($this->broadcast && config('api.broadcast'))
            broadcast(new ApiRestoreBroadcast($model->id, $model->getTable()));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages());
    }

    public function bulkRestore(Request $request, $ids)
    {
        $collection = $this->clu->bulkRestore($this->model, $request, $ids);

        return $this->response->collection($collection, new $this->transformer());
    }

    public function getInfo(Request $request)
    {
        $config = config('api.info');
        return $this->response->array( $config );
    }

    public function attach(Request $request, $id, $relation_name, $ids=null)
    {
        if(!empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->clu->attach($this->model, $request, $id, $relation_name, $ids);

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages());
    }

    public function detach(Request $request, $id, $relation_name, $ids=null)
    {
        if(!empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->clu->detach($this->model, $request, $id, $relation_name, $ids);

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages());
    }

    public function sync(Request $request, $id, $relation_name, $ids=null)
    {
        if(!empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->clu->sync($this->model, $request, $id, $relation_name, $ids);

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages());
    }

}
