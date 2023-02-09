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

        Model::reguard();
    }

}
