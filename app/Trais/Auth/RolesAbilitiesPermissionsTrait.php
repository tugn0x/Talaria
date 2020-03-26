<?php
namespace App\Traits\Auth;

use Illuminate\Cache\TaggableStore;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;
use InvalidArgumentException;
use Silber\Bouncer\Database\HasRolesAndAbilities;
use Illuminate\Support\Arr;


trait RolesAbilitiesPermissionsTrait
{
    use HasRolesAndAbilities;

    public function isSuperAdmin() {
        return $this->isAn('super-admin');
    }
    public function permissions() {
        return $this->abilities()->wherePivot('forbidden', false);
    }

    public function serializeAuthorizations($items) {
        if(is_string($items))
            if(strpos($items, ',') === false)
                $items = [$items];
            else
                $items = explode(',', $items);
        return $items;
    }

    /**
     * Scope a query to get only user with specific role(s).
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeHavingRole($query, $roles, $requireAll = false)
    {
        $roles = $this->serializeAuthorizations($roles);

        if ($requireAll) {
            return $query->whereIsAll(...$roles);
        } else {
            return $query->whereIs(...$roles);
        }
    }

    /**
     * Checks if the user has a role(s) by its name.
     *
     * @param string|array $roles       Role name or array of role names.
     * @param bool         $requireAll All roles in the array are required.
     *
     * @return bool
     */
    public function hasRole($roles, $requireAll = false)
    {
        $roles = $this->serializeAuthorizations($roles);
//        dd($roles);
        if ($requireAll) {
            return $this->isAll(...$roles);
        } else {
            return $this->isAn(...$roles);
        }
        return false;
    }

    /**
     * Grant a role to a user
     *
     * @param mixed $role
     */
    public function attachRole($role)
    {
        $this->attachRoles($role);
    }

    /**
     * Remove a role to a user
     *
     * @param mixed $role
     */
    public function detachRole($role)
    {
        $this->detachRoles($role);
    }
    /**
     * Attach multiple roles to a user
     *
     * @param mixed $roles
     */
    public function attachRoles($roles)
    {
        $roles = $this->serializeAuthorizations($roles);
        $this->assign($roles);
    }
    /**
     * Detach multiple roles from a user
     *
     * @param mixed $roles
     */
    public function detachRoles($roles)
    {
        $roles = $this->serializeAuthorizations($roles);
        if (!$roles) $roles = $this->roles()->get();
        $this->retract($roles);
    }
    /**
     * Detach multiple roles from a user
     *
     * @param mixed $roles
     */
    public function syncRoles($roles=null)
    {
        $roles = $this->serializeAuthorizations($roles);
        $userRoles = $this->roles->pluck('name')->toArray();
        $toAttach = array_diff($roles, $userRoles);
        $toDetach = array_diff($userRoles, $roles);
        if($toAttach)
            $this->attachRoles($toAttach);
        if($toDetach)
            $this->detachRoles($toDetach);
    }

    /*
     * Scope per filtrare gli utenti in base all'abilità.
     * Cfr.: https://github.com/JosephSilber/bouncer/wiki/Querying-Data
     */
    public function scopeWhereCan($query, $ability)
    {
        $query->where(function ($query) use ($ability) {
            // direct
            $query->whereHas('abilities', function ($query) use ($ability) {
                $query->byName($ability);
            });
            // through roles
            $query->orWhereHas('roles', function ($query) use ($ability) {
                $query->whereHas('abilities', function ($query) use ($ability) {
                    $query->byName($ability);
                });
            });
        });
    }

    public function scopeHasAbilitiesOn($query, $class, $id=null)
    {
        $query->whereHas('abilities', function ($query) use ($class, $id) {
            $query->where([
                'abilities.entity_id' => $id,
                'abilities.entity_type' => $class,
            ]);
        });
    }

    public function object_abilities($class, $id=null)
    {
        return $this->abilities()->where([
            'abilities.entity_id' => $id,
            'abilities.entity_type' => $class,
        ])
        ->select('name')
        ->get()
        ->pluck('name')
        ->toArray();
    }

    public function attachAbilities() {

    }

    public function detachAbilities() {

    }

    public function syncAbilities() {

    }

//    public function syncMacroAbilities($resources) {
//        $abilities = [];
//        foreach(config('nilde.morphmap') as $alias => $class) {
//            $resources = $this->permissions()
//                ->select('abilities.entity_id','abilities.entity_type','abilities.name')
//                ->where('abilities.entity_type', $class)
//                ->whereNotNull('abilities.entity_id')
//                ->distinct()
//                ->get();
//        }
//        foreach ($resources as $class => $items) {
//            $class = config('nilde.morphmap.'.$class);
//            $abilities[$class] = [];
//            foreach ($items as $item) {
//                foreach ($item['permissions'] as $permission) {
//                    $abilities[] = [
//                        'entity_id' => $item['permissions']['id'],
//                        'entity_type' => $class,
//                        'name' => $permission,
//                    ];
//                }
//            }
//        }
////        $macro = config('permissions.macro');
////        foreach ($macro as $key=>$class) {
////
////        }
//    }

//    /**
//     * Check if user has a permission by its name.
//     *
//     * @param string|array $permission Permission string or array of permissions.
//     * @param bool         $requireAll All permissions in the array are required.
//     *
//     * @return bool
//     */
//    public function may($permission, $requireAll = false)
//    {
//        if (is_array($permission)) {
//            foreach ($permission as $permName) {
//                $hasPerm = $this->can($permName);
//                if ($hasPerm && !$requireAll) {
//                    return true;
//                } elseif (!$hasPerm && $requireAll) {
//                    return false;
//                }
//            }
//            // If we've made it this far and $requireAll is FALSE, then NONE of the perms were found
//            // If we've made it this far and $requireAll is TRUE, then ALL of the perms were found.
//            // Return the value of $requireAll;
//            return $requireAll;
//        } else {
//            foreach ($this->cachedRoles() as $role) {
//                // Validate against the Permission table
//                foreach ($role->cachedPermissions() as $perm) {
//                    if (str_is( $permission, $perm->name) ) {
//                        return true;
//                    }
//                }
//            }
//        }
//        return false;
//    }

//    /**
//     * Checks role(s) and permission(s).
//     *
//     * @param string|array $roles       Array of roles or comma separated string
//     * @param string|array $permissions Array of permissions or comma separated string.
//     * @param array        $options     validate_all (true|false) or return_type (boolean|array|both)
//     *
//     * @throws \InvalidArgumentException
//     *
//     * @return array|bool
//     */
//    public function ability($roles, $permissions, $options = [])
//    {
//        // Convert string to array if that's what is passed in.
//        if (!is_array($roles)) {
//            $roles = explode(',', $roles);
//        }
//        if (!is_array($permissions)) {
//            $permissions = explode(',', $permissions);
//        }
//        // Set up default values and validate options.
//        if (!isset($options['validate_all'])) {
//            $options['validate_all'] = false;
//        } else {
//            if ($options['validate_all'] !== true && $options['validate_all'] !== false) {
//                throw new InvalidArgumentException();
//            }
//        }
//        if (!isset($options['return_type'])) {
//            $options['return_type'] = 'boolean';
//        } else {
//            if ($options['return_type'] != 'boolean' &&
//                $options['return_type'] != 'array' &&
//                $options['return_type'] != 'both') {
//                throw new InvalidArgumentException();
//            }
//        }
//        // Loop through roles and permissions and check each.
//        $checkedRoles = [];
//        $checkedPermissions = [];
//        foreach ($roles as $role) {
//            $checkedRoles[$role] = $this->hasRole($role);
//        }
//        foreach ($permissions as $permission) {
//            $checkedPermissions[$permission] = $this->can($permission);
//        }
//        // If validate all and there is a false in either
//        // Check that if validate all, then there should not be any false.
//        // Check that if not validate all, there must be at least one true.
//        if(($options['validate_all'] && !(in_array(false,$checkedRoles) || in_array(false,$checkedPermissions))) ||
//            (!$options['validate_all'] && (in_array(true,$checkedRoles) || in_array(true,$checkedPermissions)))) {
//            $validateAll = true;
//        } else {
//            $validateAll = false;
//        }
//        // Return based on option
//        if ($options['return_type'] == 'boolean') {
//            return $validateAll;
//        } elseif ($options['return_type'] == 'array') {
//            return ['roles' => $checkedRoles, 'permissions' => $checkedPermissions];
//        } else {
//            return [$validateAll, ['roles' => $checkedRoles, 'permissions' => $checkedPermissions]];
//        }
//    }

}
