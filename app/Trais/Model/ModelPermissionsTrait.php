<?php namespace App\Traits\Model;
use App\Models\Users\Permission;
use App\Models\Users\User;
use Auth;
//use Silber\Bouncer\Database\Queries\Abilities;
use Illuminate\Support\Arr;
use Silber\Bouncer\Database\Ability;

trait ModelPermissionsTrait
{
    public function user_permissions()
    {
        return User::hasAbilitiesOn(self::class, $this->id);
    }

    public function user_with_permissions()
    {
        $class = self::class;
        $id = $this->id;
        return collect($this->user_permissions()->get()->map(function ($u) use($class, $id){
            return [
                'user_id'    => $u->id,
                'full_name'    => $u->full_name,
                'permissions'    => $u->object_abilities($class, $id),
            ];
        }));
    }

    public function granted_permissions()
    {
        return $this->hasManyThrough(Permission::class, Ability::class, 'entity_id')
            ->where('abilities.entity_type', self::class);
    }

    public function setPermissionOnObject($granted_permissions)
    {
        $resource = $this;
        $user_with_permissions = Arr::pluck($granted_permissions, 'user_id');
        $this->user_permissions()->whereNotIn('id', $user_with_permissions)->get()->each(function ($user) use ($resource) {
            foreach ($user->object_abilities(self::class, $resource->id) as $ability) {
                $user->disallow($ability, $resource);
            }
        });
        foreach ($granted_permissions as $resources_to_grant) {
            foreach ($resources_to_grant['permissions'] as $permission)
            {
                User::find($resources_to_grant['user_id'])->allow($permission, $resource);
            }
        }
    }
}
