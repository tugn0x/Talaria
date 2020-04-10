<?php

use Illuminate\Database\Seeder;
use App\Models\Institutions\Institution;

//use Bouncer;

class RolesAndPermissionsSeeder extends Seeder
{
    /*
     * MAPPA GENERICA DEI MACRO-PERMESSI E DEI RUOLI VERI:
     */
//    protected $roles = [
//        'Super Admin' => [], // SUPER ADMIN DOESN'T ASK FOR PERMISSIONS
//        /*
//         * Amministratore Nilde
//         */
//        'Admin Nilde' => [],
//        /*
//         * Gestore Nilde
//         */
//        'Manager Nilde' => [
//            // create, update, delete delle libraries
//            // create, update, delete delle institution
//        ],
//        /*
//         * Contabile Nilde
//         */
//        'Accountant Nilde' => [],
//        /*
//         * Operatore Alpe
//         */
//        'Operator Standard Licenses' => [],
//        /*
//         * Utente semplice, ricercatore
//         */
//        'Patron' => [],
////        'Library User' => [],
//
//    ];

    protected $macro_permissions = [
        \App\Models\Libraries\Library::class => [
            //Manager
            'manage',
            //Op. Utenti
            'manage-users',
            //Op. Borr
            'borrow',
            //Op. Lend
            'lend',
            //Op. Consegna
            'deliver',
            //Op. ILL Borr
            'ill-borrow',
            //Op. ILL Lend
            'ill-lend',
            //Op. Licenze
            'manage-licenses',
        ],
      \App\Models\Institutions\Institution::class => [
            // Manager
            'manage',
            // ManagerTech.
            'manage-tech',
            // Op. Licenze
            'manage-licenses',
        ],
      \App\Models\Projects\Project::class => [
            // Manager,
            'manage',
            // ManagerTech.
            'manage-tech',
            // Op. Licenze
            'manage-licenses',
        ],
        \App\Models\Institutions\Consortium::class => [
            // Op. Licenze
            'manage-licenses',
        ],
    ];

    protected $roles_and_permissions = [
        'Super Admin' => [
//            'GENERIC' => [
//                'Query'
//            ],
//            'BY_MODEL' => [
//                Library::class => [
//                    ['update', true], // only owned
//                ]
//            ],
        ],

//        'Lybrary Admin' => [
//            'GENERIC' => [
//                'Query'
//            ],
//            'BY_MODEL' => [
//                Library::class => [
//                    ['update', true], // only owned
//                ]
//            ],
//        ],

        'Manager Nilde' => [
            'GENERIC' => [
//                'Query'
            ],
            'BY_MODEL' => [
                Library::class => [
                    'show',
//                    'create',
                    'update',
//                    'delete',
                ],
                \App\Models\Users\User::class => [
                    'show',
                    'create',
                    'update',
                    'delete',
                ],
                \App\Models\Institutions\Institution::class => [
                    'show',
                    'create',
                    'update',
                    'delete',
                ]
            ],
        ],
        'Accountant Nilde' => [
            'GENERIC' => [
//                'Query'
            ],
            'BY_MODEL' => [
                \App\Models\Libraries\Library::class => [
                    'show',
                ],
                \App\Models\Institutions\Institution::class => [
                    'show',
                ],
                \App\Models\Projects\Project::class => [
                    'show',
                ]
            ],
        ],

//
//        'Lybrary Operator' => [
//            'GENERIC' => [
//                'Query'
//            ],
//            'BY_MODEL' => [
//                Library::class => [
//                    ['update', true], // only owned
//                ]
//            ],
//        ],

        'Patron' => [

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
                'name' => \Str::slug($role_title),
                'title' => $role_title,
            ]);

            /*
             * Creating GENERIC permissions
             */
            foreach (\Arr::get($all_abilities, 'GENERIC', []) as $ability) {
                $this->createAbilityAndAssignToRole($role, $ability);
            }

            /*
             * Creating BY MODEL permissions
             */
            foreach (\Arr::get($all_abilities, 'BY_MODEL', []) as $model => $abilities) {
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
            'name' => \Str::slug($ability[0]),
            'title' => $ability[0],
            'entity_type' => $model,
            'only_owned' => $ability[1]
        ]);

        if (!$role->can($abilityInstance)) {
            Bouncer::allow($role)->to($abilityInstance);
        }
    }
}
