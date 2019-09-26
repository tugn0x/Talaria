<?php

namespace App\Policies;

use App\Models\Users\User;
use App\Models\Institutions\Institution;
use Illuminate\Auth\Access\HandlesAuthorization;

class InstitutionPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any institutions.
     *
     * @param  \App\Models\Users\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the institution.
     *
     * @param  \App\Models\Users\User  $user
     * @param  \App\Models\Institutions\Institution  $institution
     * @return mixed
     */
    public function view(User $user, Institution $institution)
    {
        //
    }

    /**
     * Determine whether the user can create institutions.
     *
     * @param  \App\Models\Users\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the institution.
     *
     * @param  \App\Models\Users\User  $user
     * @param  \App\Models\Institutions\Institution  $institution
     * @return mixed
     */
    public function update(User $user, Institution $institution)
    {
        //
    }

    /**
     * Determine whether the user can delete the institution.
     *
     * @param  \App\Models\Users\User  $user
     * @param  \App\Models\Institutions\Institution  $institution
     * @return mixed
     */
    public function delete(User $user, Institution $institution)
    {
        //
    }

    /**
     * Determine whether the user can restore the institution.
     *
     * @param  \App\Models\Users\User  $user
     * @param  \App\Models\Institutions\Institution  $institution
     * @return mixed
     */
    public function restore(User $user, Institution $institution)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the institution.
     *
     * @param  \App\Models\Users\User  $user
     * @param  \App\Models\Institutions\Institution  $institution
     * @return mixed
     */
    public function forceDelete(User $user, Institution $institution)
    {
        //
    }
}
