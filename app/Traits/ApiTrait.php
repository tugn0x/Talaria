<?php  namespace App\Traits;

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

        if($this->broadcast && config('api.broadcast'))
            broadcast(new ApiStoreBroadcast($model, $model->getTable(), $request->input('include')));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }


    public function update(Request $request, $id)
    {
        if(!empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->talaria->update($this->model, $request, $id);

        if($this->broadcast && config('api.broadcast'))
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

        if($this->broadcast && config('api.broadcast'))
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

        if($this->broadcast && config('api.broadcast'))
            broadcast(new ApiRestoreBroadcast($model->id, $model->getTable()));

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

    public function bulkRestore(Request $request, $ids)
    {
        $collection = $this->talaria->bulkRestore($this->model, $request, $ids);

        return $this->response->collection($collection, new $this->transformer())->morph();
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
