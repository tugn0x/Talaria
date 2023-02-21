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

        //ITALIANO
        /*
        InstitutionType::create(['name'=>'Università']);
        InstitutionType::create(['name'=>'Ente pubblico di ricerca']);
        InstitutionType::create(['name'=>'Ente pubblico della salute']);
        
        InstitutionType::create(['name'=>'Biblioteca di pubblica lettura']);
        InstitutionType::create(['name'=>'Scuola']);

        InstitutionType::create(['name'=>'Altro ente pubblico']);
        InstitutionType::create(['name'=>'Ente privato - Senza scopo di lucro']);   
        */
    }
}
