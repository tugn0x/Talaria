<?php

namespace App\Policies;

use App\Models\Users\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Access\HandlesAuthorization;
use Bouncer;

class BasePolicy
{
    use HandlesAuthorization;

    public function before($user, $ability)
    {
        if ($user->hasRole('super-admin')||$user->hasRole('manager')) {
            return true;
        }
    }

    public function canManage(User $user, Model $model)
    {
        return $user->can('manage', $model);
    }

    protected function check(User $user, Model $model, $function=NULL)
    {
        if(is_null($function))
            throw new \Symfony\Component\HttpKernel\Exception\HttpException('Function Permission Must Be Defined in App\Policies::check for '.$function);

        return $this->canManage($user, $model);
//        return false;
    }

    public function viewAny(User $user, Model $model)
    {
        return $this->index($user,$model);
    }

    public function optionList(User $user, Model $model)
    {
        return $this->check($user, $model,__FUNCTION__);
    }

    public function index(User $user, Model $model)
    {
        return $this->check($user,$model,__FUNCTION__);
    }

    public function show(User $user, Model $model)
    {
        return $this->check($user,$model,__FUNCTION__);
    }

    public function store(User $user, Model $model)
    {
        return $this->check($user,$model,__FUNCTION__);
    }

    public function update(User $user, Model $model)
    {
        return $this->check($user,$model,__FUNCTION__);
    }

    public function delete(User $user, Model $model)
    {
        return $this->check($user,$model,__FUNCTION__);
    }

    public function restore(User $user, Model $model)
    {
        return $this->check($user,$model,__FUNCTION__);
    }

    public function destroy(User $user, Model $model)
    {
        return false;
    }

    public function bulkDelete(User $user, Model $model)
    {
        return $this->check($user,$model,__FUNCTION__);
    }

    public function bulkSave(User $user, Model $model)
    {
        return $this->check($user,$model,__FUNCTION__);
    }

    public function bulkRestore(User $user, Model $model)
    {
        return $this->check($user,$model,__FUNCTION__);
    }

    public function bulkDestroy(User $user, Model $model)
    {
        return false;
    }

    public function info(User $user, Model $model)
    {
        return false;
    }

    public function attach(User $user, Model $model)
    {
        return $this->check($user,$model,__FUNCTION__);
    }

    public function detach(User $user, Model $model)
    {
        return $this->check($user,$model,__FUNCTION__);
    }

    public function sync(User $user, Model $model)
    {
        return $this->check($user,$model,__FUNCTION__);
    }

    /*
     * ALIASES
     */
    public function view(User $user, Model $model)
    {
        return $this->show($user,$model,__FUNCTION__);
    }

    public function create(User $user, Model $model)
    {
        return $this->store($user,$model,__FUNCTION__);
    }
}
