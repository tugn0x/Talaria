<?php

namespace App\Policies;

use App\Policies\BasePolicy;
use App\Models\Users\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Database\Eloquent\Model;

class LibraryPolicy extends BasePolicy
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
        //return $this->canManage($user, $model) || $user->isAbleOn($model) || $user->isPatronOf($model->id);
        return true; //chiunque puo' vedere i dati della biblio
    }

    //chiunque puo' vedere le biblio
    public function index(User $user, Model $model)
    {
        return true;
    }

    public function optionList(User $user, Model $model)
    {
        return true;
    }

    public function manageUsers(User $user, Model $model)
    {
        return $this->canManage($user, $model);
    }

    //NOTA: questo metodo è fondamentale, altrimenti laravel non chiama il before()
    //utile nel caso ci si logghi come admin!
    public function manage(User $user,Model $model)
    {
        return $this->canManage($user,$model);
    }
}
