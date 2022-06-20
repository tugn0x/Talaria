<?php

//TODO: BEFORE RUNNING THIS, please edit accordingly to RSCVD Partner's data
//in order to fill DB with their accounts!

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class CreateDemoLibrariesAndAccountSeeder extends Seeder
{    
    public function run()
    {
        Model::unguard(); //altrimenti non setta la passw perchè è unfillable        

        $lib1 = factory(\App\Models\Libraries\Library::class)->create([            
            'name' => 'MEF University Library',
            'status'=>1,            
            'subject_id'=>1,            
            'country_id'=>218,
            'profile_type'=>2,
            'external'=>0,
        ]);
       
        //User
        $user1 = factory(\App\Models\Users\User::class)->create([
            'email' => 'celikr@mef.edu.tr',
            'name' => 'Ramazan',
            'surname' => 'Celik',
            'status'=>1,            
            'privacy_policy_accepted'=>now(),            
        ]);

        $user1->allow('manage', $lib1); //manager
        
        //DESK
        /*DB::table('deliveries')->insert([
            'library_id' => $lib1->id,
            'name'=>'Desk jj'
        ]);*/

        //Account patron
        /*DB::table('library_user')->insert([
            'library_id' => $lib1->id,
            'user_id' => $user1->id,
            'status'=>1,
            'department_id'=>null,
            'title_id'=>null,
        ]);
        $user1->assign('patron'); //patron
        
        */

        $lib2 = factory(\App\Models\Libraries\Library::class)->create([            
            'name' => 'Biblioteca Universitaria Universidad de Cantabria',
            'status'=>1,            
            'subject_id'=>1,            
            'country_id'=>199,
            'profile_type'=>2,
            'external'=>0,
        ]);
       
        //User
        $user2 = factory(\App\Models\Users\User::class)->create([
            'email' => 'estibaliz.arabaolaza@unican.es',
            'name' => 'Arabaolaza',
            'surname' => 'Estibaliz',
            'status'=>1,            
            'privacy_policy_accepted'=>now(),            
        ]);

        //User
        $user2b = factory(\App\Models\Users\User::class)->create([
            'email' => 'carmen.lomba@unican.es',
            'name' => 'Carmen',
            'surname' => 'Lomba',
            'status'=>1,            
            'privacy_policy_accepted'=>now(),            
        ]);

        $user2->allow('manage', $lib2); //manager
        $user2b->allow('manage', $lib2); //manager

        $lib3 = factory(\App\Models\Libraries\Library::class)->create([            
            'name' => 'Princeton University Library',
            'status'=>1,            
            'subject_id'=>1,            
            'country_id'=>226,
            'profile_type'=>2,
            'external'=>0,
        ]);
       
        //User
        $user3 = factory(\App\Models\Users\User::class)->create([
            'email' => 'sbae@princeton.edu',
            'name' => 'Peter',
            'surname' => 'Bae',
            'status'=>1,            
            'privacy_policy_accepted'=>now(),            
        ]);

        $user3->allow('manage', $lib3); //manager

        $lib4 = factory(\App\Models\Libraries\Library::class)->create([            
            'name' => 'IUPUI University Library',
            'status'=>1,            
            'subject_id'=>1,            
            'country_id'=>226,
            'profile_type'=>2,
            'external'=>0,
        ]);
       
        //User
        $user4 = factory(\App\Models\Users\User::class)->create([
            'email' => 'cbaich@iupui.edu',
            'name' => 'Tina',
            'surname' => 'Baich',
            'status'=>1,            
            'privacy_policy_accepted'=>now(),            
        ]);

        $user4->allow('manage', $lib4); //manager
        
        $lib5 = factory(\App\Models\Libraries\Library::class)->create([            
            'name' => 'University of Balamand Libraries',
            'status'=>1,            
            'subject_id'=>1,            
            'country_id'=>118,
            'profile_type'=>2,
            'external'=>0,
        ]);
       
        //User
        $user5 = factory(\App\Models\Users\User::class)->create([
            'email' => 'Ibrahim.Farah@balamand.edu.lb',
            'name' => 'Ibrahim',
            'surname' => 'Farah',
            'status'=>1,            
            'privacy_policy_accepted'=>now(),            
        ]);

        $user5b = factory(\App\Models\Users\User::class)->create([
            'email' => 'Dalia.Koulaima@balamand.edu.lb ',
            'name' => 'Dalia',
            'surname' => 'Koulaima',
            'status'=>1,            
            'privacy_policy_accepted'=>now(),            
        ]);

        $user5c = factory(\App\Models\Users\User::class)->create([
            'email' => 'Mariam.alam@balamand.edu.lb',
            'name' => 'Mariam',
            'surname' => 'Alam',
            'status'=>1,            
            'privacy_policy_accepted'=>now(),            
        ]);

        $user5->allow('manage', $lib5); //manager
        $user5b->allow('manage', $lib5); //manager
        $user5c->allow('manage', $lib5); //manager

        
        Model::reguard();
    }
}
