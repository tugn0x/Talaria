<?php

namespace App\Policies;

use App\Policies\BasePolicy;
use App\Models\Users\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Database\Eloquent\Model;

class TagPolicy extends BasePolicy
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
        //ogni operatore della biblio puo' vedere i tag
        return $this->canManage($user,$model);
    }


    public function update(User $user, Model $model)
    {
        //ogni operatore della biblio puo' vedere i tag
        return $this->canManage($user,$model);
    }

    public function delete(User $user, Model $model)
    {
        //ogni operatore della biblio puo' vedere i tag
        return $this->canManage($user,$model);
    }

    public function canManage(User $user, Model $model)
    {
        //ogni operatore della biblio puo' gestire i tag
        return $user->can('manage', $model->library)||
               $user->can('manage-users', $model->library)||
               $user->can('borrow', $model->library)||
               $user->can('lend', $model->library);

    }
}