<?php

namespace App\Http\Controllers\Users;

use App\Models\Users\User;
use App\Models\Users\UserTransformer;
use Illuminate\Http\Request;
use Silber\Bouncer\Database\Role;
use Silber\Bouncer\Database\Ability;

class RolePermissionController extends \App\Http\Controllers\ApiController
{
    public function index(Request $request)
    {
        $roles = Role::all()->pluck("name")->toArray();
        return $this->response->array([
            "data" => [
                "roles" => $roles,
                "abilities" => config('permissions.macro'),
            ]
        ]);
    }
}
