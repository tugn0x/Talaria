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
        Institution::create(['name'=>'Università di Ancona','institution_type_id'=>1,'country_id'=>1]);
        Institution::create(['name'=>'Università di Aosta','institution_type_id'=>1,'country_id'=>1]);
        Institution::create(['name'=>'CNR - Consiglio Nazionale delle Ricerche','institution_type_id'=>2,'country_id'=>1]);
        //Institution::create(['id'=>8,'name'=>'Università di Bologna','institution_type_id'=>1]);

        /* TODO: 
        import by CSV ... 

        
             $table = 'posts';
        $file = public_path("/seeders/$table".".csv");
        $records = Helper::import_CSV($file);
        
        foreach ($records as $key => $record) {
            Post::create([
                'title' => $record['title'],
                'subtitle' => $record['subtitle'],
                'description' => $record['description'],
            ]);
        }
        */
    }
}
