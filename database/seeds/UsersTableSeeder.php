<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
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
        Model::unguard(); //altrienti non setta la passw perchè è unfillable

        //Super-Admin
        $admin = factory(\App\Models\Users\User::class)->create([
            'email' => 'admin@talaria.eu',
            'name' => 'SuperAdmin',
            'surname' => 'SuperAdmin',
            'password' => $defaultpw,
            'password_confirmation' => $defaultpw,
            'privacy_policy_accepted'=>now(),
            'country_id'=>1,
        ]);
        $admin->assign('super-admin');

        //Library/Institutions/Project Manager
        $manager = factory(\App\Models\Users\User::class)->create([
            'email' => 'manager@talaria.eu',
            'name' => 'Manager',
            'surname' => 'Manager',
            'password' => $defaultpw,
            'password_confirmation' => $defaultpw,
            'privacy_policy_accepted'=>now(),
            'country_id'=>1,
        ]);
        $manager->assign('manager');        

//        $admin = App\Models\Users\User::create(new App\Models\Users\User([
//            'email' => 'nilde@nilde.it',
//            'name' => 'nildenilde',
//            'surname' => 'nildenilde',
//            'password' => ('nildenilde'),
//        ]));
//        $admin->verified = true;
//        $admin->save();
        
        //My user (associated to a library as a manager)
        /*$ale = factory(\App\Models\Users\User::class)->create([
            'email' => 'alessandro.tugnoli@gmail.com',
            'name' => 'Alessandro',
            'surname' => 'Tugnoli',
            'password' => $defaultpw,
            'password_confirmation' => $defaultpw,
            'status'=>1,
            'country_id'=>1,
            'privacy_policy_accepted'=>now(),
        ]);*/

        /*$librarian = factory(\App\Models\Users\User::class)->create([
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

        $librarian->allow('manage', $lib1);*/                      

        Model::reguard();
    }

}
