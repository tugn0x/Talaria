<?php

namespace App\Policies;

use App\Policies\BasePolicy;
use App\Models\Users\User;
use App\Models\Libraries\Library;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Database\Eloquent\Model;

class UserPolicy extends BasePolicy
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

    public function optionList(User $user, Model $model)
    {
      //chiunque sia manager di una biblioteca puo' visualizzare elenco utenti di nilde
      //dd($user->getAbilities());
     foreach($user->getAbilities() as $abil)
     {
         if($abil->name=="manage" && $abil->entity_type=='App\Models\Libraries\Library')
         return true;
     }
     return false;
    }
}
