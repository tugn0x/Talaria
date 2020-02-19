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
        if ($user->hasRole('super-admin')) {
            return true;
        }
    }

    protected function check(User $user, Model $model, $function=NULL)
    {
        if(is_null($function))
            throw new \Symfony\Component\HttpKernel\Exception\HttpException('Function Permission Must Be Defined in App\Policies::check for '.$function);

        if($user->can(\Str::slug($function.'-'.$model->getTable())))
        {
            return true;
        }
//        \Log::info("PERMISSIONS: \n USER => ".$user."\n REQ: ".str_slug($function.'-'.$model->getTable())."\n");
        return false;
    }
//
    protected function checkOthers(User $user, Model $model, $function=NULL)
    {
        if(is_null($function))
            throw new \Symfony\Component\HttpKernel\Exception\HttpException('Function Permission Must Be Defined in App\Policies::check for '.$function);

        if($user->can($function.'-others-'.\Str::slug($model->getTable())))
        {
            return true;
        }
        return false;
    }

    public function viewAny(User $user, Model $model)
    {
        return $this->check($user,$model,__FUNCTION__);
    }

    public function optionList(User $user, Model $model)
    {
        return $this->check($user, $model,__FUNCTION__);
    }

    public function index(User $user, Model $model)
    {
        return $this->check($user,$model,__FUNCTION__);
    }

    public function indexOthers(User $user, Model $model)
    {
        return $this->checkOthers($user,$model,'index');
    }

    public function show(User $user, Model $model)
    {
        return $this->check($user,$model,__FUNCTION__);
    }
    public function showOthers(User $user, Model $model)
    {
        return $this->checkOthers($user,$model,'show');
    }

    public function store(User $user, Model $model)
    {
        return $this->check($user,$model,__FUNCTION__);
    }

    public function storeOthers(User $user, Model $model)
    {
        return $this->checkOthers($user,$model,'store');
    }

    public function update(User $user, Model $model)
    {
        return $this->check($user,$model,__FUNCTION__);
    }

    public function updateOthers(User $user, Model $model)
    {
        return $this->checkOthers($user,$model,'update');
    }

    public function delete(User $user, Model $model)
    {
        return $this->check($user,$model,__FUNCTION__);
    }

    public function deleteOthers(User $user, Model $model)
    {
        return $this->checkOthers($user,$model,'delete');
    }

    public function restore(User $user, Model $model)
    {
        return $this->check($user,$model,__FUNCTION__);
    }

    public function restoreOthers(User $user, Model $model)
    {
        return $this->checkOthers($user,$model,'restore');
    }

    public function destroy(User $user, Model $model)
    {
        return false;
    }

    public function destroyOthers(User $user, Model $model)
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
