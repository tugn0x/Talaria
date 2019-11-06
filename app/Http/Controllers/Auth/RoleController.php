<?php namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Traits\Http\Auth\RoleControllerTrait;
use Illuminate\Http\Request;
use App\Models\User\Role;
use App\Models\User\RoleTransformer;

/**
 * Role resource representation.
 *
 * @Resource("Role", uri="/role")
 */
class RoleController extends Controller
{
    use RoleControllerTrait;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Role $model, RoleTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->event_prefix = 'role';
    }

}
