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
        Subject::create(['name'=>'Science and technology']);
        Subject::create(['name'=>'Biomedical sciences']);
        Subject::create(['name'=>'Social and legal sciences']);
        Subject::create(['name'=>'Humanities']);
        Subject::create(['name'=>'Art and architecture']);        
        Subject::create(['name'=>'Multidisciplinary']);
    }
}
