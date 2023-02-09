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

        Title::create(['name'=>'Other']);
        Title::create(['name'=>'Employee']);
        Title::create(['name'=>'Fellow']);
        Title::create(['name'=>'Freelance']);
        Title::create(['name'=>'Librarian']);
        Title::create(['name'=>'Officer']);
        Title::create(['name'=>'Post-doc']);
        Title::create(['name'=>'Professor - associate']);
        Title::create(['name'=>'Professor - contract']);
        Title::create(['name'=>'Professor - full']);
        Title::create(['name'=>'Research fellow']);
        Title::create(['name'=>'Researcher']);
        Title::create(['name'=>'Researcher - associate']);
        Title::create(['name'=>'Researcher - director']);
        Title::create(['name'=>'Researcher - senior']);
        Title::create(['name'=>'Staff - affiliated']);
        Title::create(['name'=>'Staff - contract']);
        Title::create(['name'=>'Staff - permanent']); 
        Title::create(['name'=>'Staff']);
        Title::create(['name'=>'Student']);
        Title::create(['name'=>'Student - graduate']);
        Title::create(['name'=>'Student - master']);
        Title::create(['name'=>'Student - PhD']);
        Title::create(['name'=>'Student - undergraduate']); 
        Title::create(['name'=>'Subject expert']);
        Title::create(['name'=>'Teacher']);
        Title::create(['name'=>'Teaching assistent']);
        Title::create(['name'=>'Technologist']);
        Title::create(['name'=>'Trainee']);
        Title::create(['name'=>'Volunteer']);
   

        /* Code below can be used to init InstitutionType-Title relationship manually
           Titles are used by patron to associate to a library
        
        
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
        
        DB::table('institution_type_title')->insert([
            'institution_type_id' => 1,
            'title_id' => 4
        ]);
        DB::table('institution_type_title')->insert([
            'institution_type_id' => 1,
            'title_id' => 5
        ]);*/




    }
}
