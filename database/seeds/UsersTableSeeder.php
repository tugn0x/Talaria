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
        $defaultpw='password'; //will be encrypted by UserObserver (called from Factory)
        Model::unguard(); //othewise password will not be set cause it's unfillable

        //Super-Admin
        $admin = factory(\App\Models\Users\User::class)->create([
            'email' => 'admin@talaria.local',
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
            'email' => 'manager@talaria.local',
            'name' => 'Manager',
            'surname' => 'Manager',
            'password' => $defaultpw,
            'password_confirmation' => $defaultpw,
            'privacy_policy_accepted'=>now(),
            'country_id'=>1,
        ]);
        $manager->assign('manager');   
        
        //Sample code to ALLOW a user to have some permission on a model
        /*
         $library = factory(\App\Models\Libraries\Library::class)->create([            
            'name' => 'Library Name',
            'status'=>1,            
            'subject_id'=>1,            
            'country_id'=>1,
            'profile_type'=>2,
            'external'=>0,
        ]);

         $user = factory(\App\Models\Users\User::class)->create([
            'email' => 'xx@domain.com',
            'name' => 'Name',
            'surname' => 'Surname',
            'status'=>1,            
            'privacy_policy_accepted'=>now(),            
        ]);
        
        $user->allow('somepermissioname', $library); //user became "somepermissioname" on library $library
        */

        Model::reguard();
    }

}
