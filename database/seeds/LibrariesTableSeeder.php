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
        //factory(\App\Models\Libraries\Library::class, 5)->create();
        Library::create(['name'=>'Biblioteca Area della Ricerca di Bologna','email'=>'docdel@area.bo.cnr.it','institution_id'=>3,'subject_id'=>1,'country_id'=>1]);
    }

}
