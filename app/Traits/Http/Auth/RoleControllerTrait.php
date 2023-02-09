<?php namespace App\Traits\Http\Auth;

use App\Traits\Http\ApiControllerTrait;
use Clu\Api\ApiTrait;
use Dingo\Api\Http\Request;

trait RoleControllerTrait
{
    use ApiControllerTrait;

    public function store(Request $request)
    {
        $model = $this->talaria->store($this->model, $request, function($model, $request)
        {
            //Update relation with permission
            if($request->has('perms'))
            {
                $perms = $model->filterIds($request->input('perms'));

                if( !$model->perms()->attach( $perms ) )
                {
                    $model->addInternalMessage(trans('apitalaria::response.create_relation_failed', ['name' => 'Permissions']), 'error');
                }
            }

            //Update relation with users
            if($request->has('users'))
            {
                $users = $model->filterIds($request->input('users'));

                if( !$model->users()->attach( $users ) )
                {
                    $model->addInternalMessage(trans('apitalaria::response.create_relation_failed', ['name' => 'Users']), 'error');
                }
            }

            return $model;
        });

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages());
    }


    public function update(Request $request, $id)
    {
        $model = $this->talaria->update($this->model, $request, $id, function($model, $request)
        {
            //Update relation with permission
            if($request->has('perms'))
            {
                $perms = $model->filterIds($request->input('perms'));
                if( !$model->perms()->sync( $perms ) )
                {
                    $model->addInternalMessage(trans('apitalaria::response.update_relation_failed', ['name' => 'Permissions']), 'error');
                }
            }

            //Update relation with users
            if($request->has('users'))
            {
                $users = $model->filterIds($request->input('users'));
                if( !$model->users()->sync( $users ) )
                {
                    $model->addInternalMessage(trans('apitalaria::response.update_relation_failed', ['name' => 'Users']), 'error');
                }
            }

            return $model;
        });

        return $this->response->item($model, new $this->transformer())->setMeta($model->getInternalMessages());
    }
}
