<?php

//TODO: BEFORE RUNNING THIS, please edit accordingly to RSCVD Partner's data
//in order to fill DB with their accounts!

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class CreateDemoLibrariesAndAccountSeeder extends Seeder
{    
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard(); //altrienti non setta la passw perchè è unfillable
        $defaultpw=Hash::make('d3mo$Demo');

        $lib1 = factory(\App\Models\Libraries\Library::class)->create([            
            'name' => 'Library kkk',
            'status'=>1,            
            'subject_id'=>1,            
            'country_id'=>1,
            'profile_type'=>2,
            'external'=>0,
        ]);

        //DESK
        DB::table('deliveries')->insert([
            'library_id' => $lib1->id,
            'name'=>'Desk kkk'
        ]);

        //User
        $user1 = factory(\App\Models\Users\User::class)->create([
            'email' => 'mariorossi33@ggg.com',
            'name' => 'Mario',
            'surname' => 'Rossi',
            'status'=>1,            
            'privacy_policy_accepted'=>now(),
        ]);

        //Account patron+manager
        DB::table('library_user')->insert([
            'library_id' => $lib1->id,
            'user_id' => $user1->id,
            'status'=>1,
            'department_id'=>null,
            'title_id'=>null,
        ]);

        $user1->assign('patron'); //patron
        $user1->allow('manage', $lib1); //manager


        Model::reguard();
    }
}
