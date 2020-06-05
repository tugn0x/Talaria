<?php

namespace App\Policies;

use App\Policies\BasePolicy;
use App\Models\Users\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Database\Eloquent\Model;

class DeskInstitutionPolicy extends BasePolicy
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
        //il manager dell'istituzione puo' vedere i suoi desk
        return $this->canManage($user,$model);
    }


    public function update(User $user, Model $model)
    {
        //il manager dell'istituzione puo' modificare i suoi desk
        return $this->canManage($user,$model);
    }

    public function delete(User $user, Model $model)
    {
        //il manager dell'istituzione puo' eliminare i suoi desk
        return $this->canManage($user,$model);
    }

    public function canManage(User $user, Model $model)
    {
        //il manager dell'istituzione puo' gestire i suoi desk
        return $user->can('manage', $model->institution);
    }
}
