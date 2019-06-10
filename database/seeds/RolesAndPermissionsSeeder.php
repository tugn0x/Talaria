<?php

use Illuminate\Database\Seeder;

//use Bouncer;

class RolesAndPermissionsSeeder extends Seeder
{

    protected $roles_and_permissions = [
        'Super Admin' => [
            'GENERIC' => [
                'Query'
            ],
            'BY_MODEL' => [
                Library::class => [
                    ['update', true], // only owned
                ]
            ],
        ],

        'Lybrary Admin' => [
            'GENERIC' => [
                'Query'
            ],
            'BY_MODEL' => [
                Library::class => [
                    ['update', true], // only owned
                ]
            ],
        ],

        'Lybrary Operator' => [
            'GENERIC' => [
                'Query'
            ],
            'BY_MODEL' => [
                Library::class => [
                    ['update', true], // only owned
                ]
            ],
        ],

        'Registered' => [

        ],

        'Guest' => [

        ],
    ];
    protected $standard_methods = [
        'show',
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
        foreach ($this->roles_and_permissions as $role_title => $all_abilities) {
            /*
             * Create or get Role
             */
            $role = Bouncer::role()->firstOrCreate([
                'name' => str_slug($role_title),
                'title' => $role_title,
            ]);

            /*
             * Creating GENERIC permissions
             */
            foreach (array_get($all_abilities, 'GENERIC', []) as $ability) {
                $this->createAbilityAndAssignToRole($role, $ability);
            }

            /*
             * Creating BY MODEL permissions
             */
            foreach (array_get($all_abilities, 'BY_MODEL', []) as $model => $abilities) {
                foreach ($abilities as $ability) {
                    $this->createAbilityAndAssignToRole($role, $ability, $model);
                }
            }
        }
    }

    public function createAbilityAndAssignToRole($role, $ability, $model=null)
    {
        if (is_string($ability)) {
            $ability = [$ability, false];
        }

        $abilityInstance = Bouncer::ability()->firstOrCreate([
            'name' => str_slug($ability[0]),
            'title' => $ability[0],
            'entity_type' => $model,
            'only_owned' => $ability[1]
        ]);

        if (!$role->can($abilityInstance)) {
            Bouncer::allow($role)->to($abilityInstance);
        }
    }
}
