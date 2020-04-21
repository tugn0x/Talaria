<?php

namespace App\Policies;

use App\Models\Users\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Access\HandlesAuthorization;
use Bouncer;

class ListBasePolicy extends BasePolicy
{

    public function optionList(User $user, Model $model)
    {
        return true;
    }
}
