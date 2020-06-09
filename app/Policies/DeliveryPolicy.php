<?php

namespace App\Policies;

use App\Policies\BasePolicy;
use App\Models\Users\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Database\Eloquent\Model;

class DeliveryPolicy extends BasePolicy
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

    //ritorno true perchè tanto nella index filtro sempre x biblio
    public function index(User $user, Model $model)
    {
        return true;
    }

    public function create(User $user, Model $model)
    {
        return $this->canManage($user,$model);

    }

    public function show(User $user, Model $model)
    {
        return $this->canManage($user, $model);
    }


    public function update(User $user, Model $model)
    {
        return $this->canManage($user, $model);
    }

    public function canManage(User $user, Model $model)
    {
        //solo la biblio puo' creare i suoi Delivery
        //quindi verifico che l'utente sia manager della biblio per la quale si sta inserendo un Delivery
        //oppure è il manager del Delivery stesso
        return $user->can('manage', $model->library)||$user->can('deliver', $model);
    }
}
