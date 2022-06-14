<?php

//This will enable some user account for CNR Library and some of Messina and Como libraries
//for testing environment

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class CreateDemoLibrariesAndAccountITA extends Seeder
{    
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard(); //altrimenti non setta la passw perchè è unfillable        

        /*$lib1 = factory(\App\Models\Libraries\Library::class)->create([            
            'name' => 'Library jj',
            'status'=>1,            
            'subject_id'=>1,            
            'country_id'=>1,
            'profile_type'=>2,
            'external'=>0,
        ]);

        //DESK
        DB::table('deliveries')->insert([
            'library_id' => $lib1->id,
            'name'=>'Desk jj'
        ]);

        //User
        $user1 = factory(\App\Models\Users\User::class)->create([
            'email' => 'jjj@jjj.com',
            'name' => 'JJJ',
            'surname' => 'JJJ',
            'status'=>1,            
            'privacy_policy_accepted'=>now(),            
        ]);
        */

        //Account patron
        /*DB::table('library_user')->insert([
            'library_id' => $lib1->id,
            'user_id' => $user1->id,
            'status'=>1,
            'department_id'=>null,
            'title_id'=>null,
        ]);
        $user1->assign('patron'); //patron

        $user1->allow('manage', $lib1); //manager
        */

        $biblionostra = \App\Models\Libraries\Library::find(1);

        $sergio = factory(\App\Models\Users\User::class)->create([
            'email' => 'sergio.settembrini@area.bo.cnr.it',
            'name' => 'Sergio',
            'surname' => 'Settembrini',
            'status'=>1,            
            'privacy_policy_accepted'=>now(),            
        ]);

        $debby = factory(\App\Models\Users\User::class)->create([
            'email' => 'debora.mazza@area.bo.cnr.it',
            'name' => 'Debora',
            'surname' => 'Mazza',
            'status'=>1,            
            'privacy_policy_accepted'=>now(),            
        ]);

        $silvana = factory(\App\Models\Users\User::class)->create([
            'email' => 'mangiaracina@area.bo.cnr.it',
            'name' => 'Silvana',
            'surname' => 'Mangiaracina',
            'status'=>1,            
            'privacy_policy_accepted'=>now(),            
        ]);

        //Account patron
        DB::table('library_user')->insert([
            'library_id' => $biblionostra->id,
            'user_id' => $debby->id,
            'status'=>1,
            'department_id'=>null,
            'title_id'=>null,
        ]);
        $debby->assign('patron'); //patron

        DB::table('library_user')->insert([
            'library_id' => $biblionostra->id,
            'user_id' => $sergio->id,
            'status'=>1,
            'department_id'=>null,
            'title_id'=>null,
        ]);
        $sergio->assign('patron'); //patron

        DB::table('library_user')->insert([
            'library_id' => $biblionostra->id,
            'user_id' => $silvana->id,
            'status'=>1,
            'department_id'=>null,
            'title_id'=>null,
        ]);
        $silvana->assign('patron'); //patron
        

        $sergio->allow('manage', $biblionostra); //manager
        $debby->allow('manage', $biblionostra); //manager
        $silvana->allow('manage', $biblionostra); //manager



        //ALTRI

        $libME = factory(\App\Models\Libraries\Library::class)->create([            
            'name' => 'Sistema bibliotecario di Ateneo Università di Messina',
            'status'=>1,            
            'subject_id'=>1,            
            'country_id'=>1,
            'profile_type'=>2,
            'external'=>0,
        ]);
        

        //User
        $maimone = factory(\App\Models\Users\User::class)->create([
            'email' => 'lmaimone@unime.it',
            'name' => 'Loriana',
            'surname' => 'Maimone Ansaldo Patti',
            'status'=>1,            
            'privacy_policy_accepted'=>now(),            
        ]);
        
        $maimone->allow('manage', $libME); //manager
        
        $libCO = factory(\App\Models\Libraries\Library::class)->create([            
            'name' => 'Biblioteca di Scienze - Como Università dell\'Insubria',
            'status'=>1,            
            'subject_id'=>1,            
            'country_id'=>1,
            'profile_type'=>2,
            'external'=>0,
        ]);
        

        //User
        $colombo = factory(\App\Models\Users\User::class)->create([
            'email' => 'giovanna.colombo@uninsubria.it',
            'name' => 'Giovanna',
            'surname' => 'Colombo',
            'status'=>1,            
            'privacy_policy_accepted'=>now(),            
        ]);
        
        $colombo->allow('manage', $libCO); //manager
        
        Model::reguard();
    }
}
