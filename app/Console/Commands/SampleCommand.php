<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SampleCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sample:command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    protected $roles_and_permissions = [
        'Super Admin' => [
//            \App\Models\X::class => [
//                'create',
//                'update',
//                ['delete', true], // only owned
//            ]
        ],
        'Lybrary Admin' => [
            Library::class => [
                ['update', true], // only owned
            ]
        ],
        'Registered' => [

        ],
        'Guest' => [

        ],
    ];

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        foreach ($this->roles_and_permissions as $role_title => $all_abilities) {
            /*
             * Create or get Role
             */
//            $role = Bouncer::role()->firstOrCreate([
//                'name' => str_slug($role_title),
//                'title' => $role_title,
//            ]);

            /*
             * Creazione permessi
             */
            foreach ($all_abilities as $model=>$abilities) {
                foreach ($abilities as $ability) {
                    if(is_string($ability)) {
                        $ability = [$ability, false];
                    }
                    $this->line($role_title);
                    $this->line($model);
                    $this->line(json_encode($ability));

//                    $ability = Bouncer::ability()->firstOrCreate([
//                        'name' => str_slug($ability[0]),
//                        'title' => $ability[0],
//                        'entity_type' => $model,
//                        'only_owned' => $ability[1]
//                    ]);
//
//                    if (!$role->can($ability)) {
//                        Bouncer::allow($role)->to($ability);
//                    }
                }
            }
        }
    }

}
