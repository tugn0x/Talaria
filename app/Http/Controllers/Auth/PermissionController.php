<?php namespace App\Http\Controllers\Auth;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
//use App\Traits\Http\Auth\PermissionControllerTrait;
use Illuminate\Http\Request;
use App\Models\User\Permission;
use App\Models\User\PermissionTransformer;

/**
 * Permission resource representation.
 *
 * @Resource("Permission", uri="/permission")
 */
class PermissionController extends ApiController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Permission $model, PermissionTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->event_prefix = 'permission';
    }

}
