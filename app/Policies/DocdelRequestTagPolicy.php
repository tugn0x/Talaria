<?php

namespace App\Policies;

use App\Policies\BasePolicy;
use App\Models\Users\User;
use App\Models\Requests\DocdelRequest;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Database\Eloquent\Model;

class DocdelRequestTagPolicy extends BasePolicy
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
    
    //non essendoci il model, la filtro dal controller e qui ritorno true
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
        return $this->canManage($user,$model);
    }


    public function update(User $user, Model $model)
    {
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
            //return $this->canManage($user,$model->docdelrequest());                        
    }
}
