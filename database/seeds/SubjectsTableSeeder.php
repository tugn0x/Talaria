<?php

use App\Models\Libraries\Subject;
use Illuminate\Database\Seeder;

class SubjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {        
        //ENGLISH
        Subject::create(['name'=>'Science and technology']);
        Subject::create(['name'=>'Biomedical sciences']);
        Subject::create(['name'=>'Social and legal sciences']);
        Subject::create(['name'=>'Humanities']);
        Subject::create(['name'=>'Art and architecture']);        
        Subject::create(['name'=>'Multidisciplinary']);

        //ITALIANO
        /*         
        Subject::create(['name'=>'Scienza e tecnologia']);
        Subject::create(['name'=>'Scienze biomediche ']);
        Subject::create(['name'=>'Scienze giuridiche e sociali']);
        Subject::create(['name'=>'Scienze umane']);
        Subject::create(['name'=>'Arte e architettura']);        
        Subject::create(['name'=>'Multidisciplinare']);
        */
    }
}
