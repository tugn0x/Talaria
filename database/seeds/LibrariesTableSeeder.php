<?php

use App\Models\Libraries\Library;
use Illuminate\Database\Seeder;

class LibrariesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //\Auth::loginUsingId(1);
        $libCNR = factory(\App\Models\Libraries\Library::class)->create([
            'email' => 'biblio@area.bo.cnr.it',
            'name' => 'Biblioteca CNR AdR Bologna',
            'status'=>1,
            'institution_id'=>3,
            'subject_id'=>6,
            'address'=>'Via Gobetti 101',
            'town'=>'Bologna',
            'dd_email' => 'docdel@area.bo.cnr.it',
            'dd_phone' => '051-6398026',
            'dd_cost'=>1.00,
            'dd_user_cost'=>2.00,
            'country_id'=>1,
        ]);

        factory(\App\Models\Libraries\Library::class, 5)->create();
    }

}
