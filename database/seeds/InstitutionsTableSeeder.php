<?php

use Illuminate\Database\Seeder;
use App\Models\Institutions\Institution;

class InstitutionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {   

        //Some sample institutions        
        //Institution::create(['name'=>'Consiglio Nazionale delle Ricerche','institution_type_id'=>2,'country_id'=>105]);
        //Institution::create(['name'=>'Scuola Normale Superiore','institution_type_id'=>1,'country_id'=>105]);


        // sample script (not tested) to import from CSV file        
        /*
        import by CSV ... 

        
        $table = 'institutions';
        $file = public_path("/seeders/$table".".csv");
        $records = Helper::import_CSV($file);
        
        foreach ($records as $key => $record) {
            Post::create([
                'name' => $record['name'],
                'institution_type_id' => $record['institution_type_id'],
                'country_id' => $record['country_id'],
            ]);
        }
        */
    }
}
