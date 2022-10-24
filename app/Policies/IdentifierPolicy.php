<?php

namespace App\Policies;

use App\Policies\BasePolicy;
use App\Models\Users\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Database\Eloquent\Model;

class IdentifierPolicy extends BasePolicy
{
    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function show(User $user, Model $model)
    {
        return $this->canManage($user, $model) || $user->isAbleOn($model);
    }

    public function optionList(User $user, Model $model)
    {
        return true;
    }
}
