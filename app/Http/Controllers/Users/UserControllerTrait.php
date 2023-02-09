<?php namespace App\Http\Controllers\Users;

use App\Traits\ApiTrait;
use Event;
use Illuminate\Http\Request;

trait UserControllerTrait
{
    use ApiTrait;

    public function store(Request $request)
    {
        if( !empty($this->validate) )
            $this->validate($request, $this->validate);

        $model = $this->talaria->store($this->model, $request, function($model, $request)
        {
            //Create relation with Roles
            if($request->has('roles'))
            {
                $roles = (is_array($request->input('roles'))) ? $request->input('roles') : [$request->input('roles')];
                if( $model->syncRoles($roles) )
                {
                    $model->addInternalMessage(trans('apitalaria::response.update_relation_failed', ['name' => 'Roles']), 'error');
                }
            }
            //Update relation with Roles
            if($request->has('resources'))
            {
//                $resources = (is_array($request->input('resources'))) ? $request->input('resources') : [$request->input('resources')];
//                if( $model->syncRoles($roles) )
//                {
//                    $model->addInternalMessage(trans('apitalaria::response.update_relation_failed', ['name' => 'Roles']), 'error');
//                }
            }

            //Create Meta
            if($request->has('meta'))
            {
                $metas = (is_array($request->input('meta'))) ? $request->input('meta') : [$request->input('meta')];
                foreach($metas as $key => $meta)
                {
                    if(isset($key) && isset($meta))
                    {
                        if(!$model->meta()->updateOrCreate(['meta_key' => $key], ['meta_key' => $key, 'meta_value' => $meta]))
                        {
                            $model->addInternalMessage(trans('apitalaria::response.update_meta_failed'), 'error');
                        }
                    }
                }

            }

            return $model;
        });

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }


    public function update(Request $request, $id)
    {
        $model = $this->talaria->update($this->model, $request, $id, function($model, $request)
        {
            //Update relation with Roles
            if($request->has('roles'))
            {
                $roles = (is_array($request->input('roles'))) ? $request->input('roles') : [$request->input('roles')];
                if( $model->syncRoles($roles) )
                {
                    $model->addInternalMessage(trans('apitalaria::response.update_relation_failed', ['name' => 'Roles']), 'error');
                }
            }
            //Update relation with Roles
            if($request->has('resources'))
            {
//                $resources = (is_array($request->input('resources'))) ? $request->input('resources') : [$request->input('resources')];
//                if( $model->syncRoles($roles) )
//                {
//                    $model->addInternalMessage(trans('apitalaria::response.update_relation_failed', ['name' => 'Roles']), 'error');
//                }
            }

            //Update Meta table
            if($request->has('meta'))
            {
                $metas = (is_array($request->input('meta'))) ? $request->input('meta') : [$request->input('meta')];
                foreach($metas as $key => $meta)
                {
                    if(isset($key) && isset($meta))
                    {
                        if(!$model->meta()->updateOrCreate(['meta_key' => $key], ['meta_key' => $key, 'meta_value' => $meta]))
                        {
                            $model->addInternalMessage(trans('apitalaria::response.update_meta_failed'), 'error');
                        }
                    }
                }

            }

            return $model;
        }, function($model, $request)
        {
            /*
             * TODO: set not directly fillable fields
             */
            return $model;
        });

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages())->morph();
    }

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

        $collection = $this->talaria->index($this->model->select('*'), $request, function( $model, $request)
        {

            if($request->has('status')  && in_array($request->input('status'), ['active','lock']))
            {
                $model = $model->InStatus($request->input('status'));
            }

            return $model;
        });

        return $this->response->paginator($collection, new $this->transformer())->morph();
    }

}
