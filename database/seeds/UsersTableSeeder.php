<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $defaultpw=Hash::make('password');

        $admin = factory(\App\Models\Users\User::class)->create([
            'email' => 'nilde@nilde.it',
            'name' => 'nildenilde',
            'surname' => 'nildenilde',
            'password' => $defaultpw,
            'password_confirmation' => $defaultpw,
            'privacy_policy_accepted'=>now(),
            'country_id'=>1,
        ]);
        $admin->assign('super-admin');

//        $admin = App\Models\Users\User::create(new App\Models\Users\User([
//            'email' => 'nilde@nilde.it',
//            'name' => 'nildenilde',
//            'surname' => 'nildenilde',
//            'password' => ('nildenilde'),
//        ]));
//        $admin->verified = true;
//        $admin->save();

        // Crea qualche altro utente variegato
        factory(\App\Models\Users\User::class, 25)->create();

        //creo il mio utente (e non gli assegno alcun ruolo, di default=registered)
        $ale = factory(\App\Models\Users\User::class)->create([
            'email' => 'alessandro.tugnoli@gmail.com',
            'name' => 'Alessandro',
            'surname' => 'Tugnoli',
            'password' => $defaultpw,
            'password_confirmation' => $defaultpw,
            'status'=>1,
            'country_id'=>1,
            'privacy_policy_accepted'=>now(),
        ]);

        $librarian = factory(\App\Models\Users\User::class)->create([
            'email' => 'a.tugnoli@area.bo.cnr.it',
            'name' => 'Mario',
            'surname' => 'Rossi',
            'password' => $defaultpw,
            'password_confirmation' => $defaultpw,
            'status'=>1,
            'country_id'=>1,
            'privacy_policy_accepted'=>now(),
        ]);

        $lib1=App\Models\Libraries\Library::find(1);

        $librarian->allow('manage', $lib1);

        /*$myuser->libraries()->sync([
            1 => [
                'status'=>1,
                'department_id'=>1,
                'title_id'=>2,
            ]
        ]);*/

        /*$myuser = factory(\App\Models\Users\User::class)->create([
            'email' => 'giorgio@nilde.com',
            'name' => 'giorgio',
            'surname' => 'giorgio',
            'password' => 'nildenilde',
            'password_confirmation' => 'nildenilde',
            'status'=>1,
            'country_id'=>1,
            'privacy_policy_accepted'=>now(),
        ]);*/

/*
        foreach (\App\Models\Libraries\Library::all() as $item) {
            $myuser->allow('manage', $item);
        }
        */
        factory(\App\Models\Users\User::class, 5)->create();

        /*
         *
        $contentIds = \Auth::user()->abilities()
            ->select('abilities.entity_id')
            ->whereIn('abilities.entity_type', config('constants.module_classes.App\Models\Modules\Cms'))
            ->get()
            ->pluck('entity_id')
            ->toArray();
         */

//        DB::table('library_user')->insert([
//            'library_id' => 1,
//            'user_id' => 2,
//            'status'=>1,
//            'department_id'=>1,
//            'title_id'=>2,
//        ]);
    }

}
