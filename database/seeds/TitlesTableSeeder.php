<?php

use App\Models\Users\Title;
use Illuminate\Database\Seeder;

class TitlesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Title::create(['name'=>'Research fellow']);
        Title::create(['name'=>'Researcher']);
        Title::create(['name'=>'PhD Student']);

        DB::table('institution_type_title')->insert([
            'institution_type_id' => 2,
            'title_id' => 1
        ]);
        DB::table('institution_type_title')->insert([
            'institution_type_id' => 2,
            'title_id' => 2
        ]);
        DB::table('institution_type_title')->insert([
            'institution_type_id' => 2,
            'title_id' => 3
        ]);        
    }
}
