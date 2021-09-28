<?php

namespace App\Policies;

use App\Policies\BasePolicy;
use App\Models\Users\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Database\Eloquent\Model;

class DocdelRequestPolicy extends BasePolicy
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
        return $this->canManage($user,$model);
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
        return $this->canManage($user,$model);
    }
    
    //already filtered by controller
    public function canManage(User $user, Model $model)
    {    
        return true;   
        
        //TODO: should call this but doesn't work!
        /*return 
               $user->can('manage', $model->borrowinglibrary)||
               $user->can('borrow', $model->borrowinglibrary)||
               $user->can('deliver', $model->borrowinglibrary)||
               $user->can('lend', $model->borrowinglibrary)||
               $user->can('manage', $model->lendinglibrary)||
               $user->can('borrow', $model->lendinglibrary)||
               $user->can('deliver', $model->lendinglibrary)||
               $user->can('lend', $model->lendinglibrary);
               */

    }
}