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
        InstitutionType::create(['name'=>'Università']);
        InstitutionType::create(['name'=>'Ente pubblico di ricerca']);
        InstitutionType::create(['name'=>'Ente del Servizio Sanitario Nazionale']);
        InstitutionType::create(['name'=>'Altro Ente Pubblico']);
        InstitutionType::create(['name'=>'Ente Privato - Senza scopo di lucro']);        
        //InstitutionType::create(['name'=>'Ente pubblico cantonale']);
    }
}
