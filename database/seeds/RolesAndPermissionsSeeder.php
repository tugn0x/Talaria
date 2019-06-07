<?php

use Illuminate\Database\Seeder;

class RolesAndPermissionsSeeder extends Seeder
{

    protected $roles_and_permissions = [
        'Super Admin' => [
//            ['create', \App\Models\X::class],
//            ['update', \App\Models\X::class],
//            ['delete', \App\Models\X::class],
        ],
        'Lybrary Admin' => [
//            ['create', \App\Models\X::class],
//            ['update', \App\Models\X::class],
//            ['delete', \App\Models\X::class],
        ],
        'registered' => [
//            ['create', \App\Models\X::class],
//            ['update', \App\Models\X::class],
//            ['delete', \App\Models\X::class],
        ],
        'guest' => [
//            ['create', \App\Models\X::class],
//            ['update', \App\Models\X::class],
//            ['delete', \App\Models\X::class],
        ],
    ];
    protected $standard_methods = [
        'create',
        'update',
        'delete',
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->roles_and_permissions as $role_title => $abilityies) {
            /*
             * Create or get Role
             */
            $role = Bouncer::role()->firstOrCreate([
                'name' => str_slug($role_title),
                'title' => $role_title,
            ]);

            /*
             * Creazione permessi
             */
            foreach ($abilityies as $ability_to_grant) {

                $ability = Bouncer::ability()->firstOrCreate([
                    'name' => str_slug($ability_to_grant[0]),
                    'title' => $ability_to_grant[0],
                    'entity_type' => array_get($ability_to_grant, 1, null),
                    'only_owned' => array_get($ability_to_grant, 3, false)
                ]);

                if (!$role->can($ability)) {
                    Bouncer::allow($role)->to($ability);
                }
            }
        }
    }
}
