<?php

namespace App\Policies;

use App\Policies\BasePolicy;
use App\Models\Users\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Database\Eloquent\Model;

class GroupReferencePolicy extends BasePolicy
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

    public function create(User $user, Model $model)
    {
        return true;
    }

    public function show(User $user, Model $model)
    {
        return $this->canManage($user,$model);
    }

     public function index(User $user, Model $model)
     {
         return true;
     }

     public function delete(User $user, Model $model)
    {
        return $this->canManage($user,$model);
    }


    public function update(User $user, Model $model)
    {
        return $this->canManage($user, $model);

    }

    public function canManage(User $user, Model $model)
    {
        return ($model->reference->user()->first()->id==$user->id);
    }
}
