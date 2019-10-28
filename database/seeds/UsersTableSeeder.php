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

        $admin = factory(\App\Models\Users\User::class)->create([
            'email' => 'nilde@nilde.it',
            'name' => 'Nilde',            
            'surname' => 'Nilde',
            'password' => Hash::make('nilde'),            
        ]);
        $admin->assign('super-admin');
//        $admin = App\Models\Users\User::create(new App\Models\Users\User([
//            'email' => 'nilde@nilde.it',
//            'name' => 'Nilde',
//            'surname' => 'Nilde',
//            'password' => Hash::make('nilde'),
//        ]));
//        $admin->verified = true;
//        $admin->save();

        // Crea qualche altro utente variegato
        //factory(\App\Models\Users\User::class, 5)->create();

        //creo il mio utente (e non gli assegno alcun ruolo)
        $myuser = factory(\App\Models\Users\User::class)->create([
            'email' => 'alessandro.tugnoli@gmail.com',
            'name' => 'Alessandro',
            'surname' => 'Tugnoli',
            'password' => Hash::make('nilde'),
            'status'=>1,
            'country_id'=>1
        ]);        

        DB::table('library_user')->insert([
            'library_id' => 1,
            'user_id' => 1,
            'status'=>1,
            'department_id'=>1,
            'title_id'=>2,
        ]);
    }

}
