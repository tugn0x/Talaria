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
        Subject::create(['name'=>'multidisciplinare']);
        Subject::create(['name'=>'tecnico-scientifico']);
        Subject::create(['name'=>'biomedico']);
        Subject::create(['name'=>'economico-giuridico']);
        Subject::create(['name'=>'umanistico']);
        Subject::create(['name'=>'architettura']);        
    }
}
