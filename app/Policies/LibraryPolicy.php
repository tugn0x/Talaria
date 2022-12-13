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

    public function update(User $user, Model $model)
    {
        //il manager puo' aggiornare i dati della sua biblio        
        return $this->canManage($user,$model);
    }


    public function renewSubscription(User $user, Model $model)
    {
        //il manager puo' rinnovare la sottoscrizione della sua biblio        
        return $this->canManage($user,$model);
    }

    public function manage(User $user,Model $model)
    {
        //return $this->canManage($user,$model);
        //qui ci arriva solo se l'utente non ha l'ability di manage
        //quindi se ce l'ha viene gestita da bouncer che ritorna true
        //altrimenti arriva qui ma non dovendo gestire altro ritorniamo false
        //altrimenti si crea un loop infinito
        return false;
    }
}
