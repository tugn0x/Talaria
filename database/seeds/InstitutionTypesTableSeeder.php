<?php

use App\Models\Institutions\InstitutionType;
use Illuminate\Database\Seeder;

class InstitutionTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        InstitutionType::create(['name'=>'University']);
        InstitutionType::create(['name'=>'Public research institution']);
        InstitutionType::create(['name'=>'Public health institution']);
        
        InstitutionType::create(['name'=>'Public library']);
        InstitutionType::create(['name'=>'School']);

        InstitutionType::create(['name'=>'Other public institution']);
        InstitutionType::create(['name'=>'Private non profit organization']);        
        //InstitutionType::create(['name'=>'Ente pubblico cantonale']);
    }
}
