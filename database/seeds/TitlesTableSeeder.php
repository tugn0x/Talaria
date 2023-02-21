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

        //ENGLISH
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
   

        //ITALIANO
        /*
        Title::create(['name'=>'Altra qualifica']);
        Title::create(['name'=>'Impiegato']);
        Title::create(['name'=>'Borsista']);
        Title::create(['name'=>'Professionista]);
        Title::create(['name'=>'Bibliotecario']);
        Title::create(['name'=>'Funzionario']);
        Title::create(['name'=>'Post-doc']);
        Title::create(['name'=>'Professore associato']);
        Title::create(['name'=>'Professore a contratto']);
        Title::create(['name'=>'Professore ordinario']);
        Title::create(['name'=>'Ricercatore - assegnista']);
        Title::create(['name'=>'Ricercatore']);
        Title::create(['name'=>'Ricercatore - associato']);
        Title::create(['name'=>'Ricercatore - dirigente']);
        Title::create(['name'=>'Ricercatore - primo']);        
        Title::create(['name'=>'Personale - convenzionato']);
        Title::create(['name'=>'Personale - contrattista']);
        Title::create(['name'=>'Personale - strutturato']); 
        Title::create(['name'=>'Personale tecnico-amministrativo']);
        Title::create(['name'=>'Studente']);
        Title::create(['name'=>'Studente laurea magistrale']);
        Title::create(['name'=>'Studente master']);
        Title::create(['name'=>'Dottorando']);
        Title::create(['name'=>'Studente laurea triennale']); 
        Title::create(['name'=>'Cultore della materia']);
        Title::create(['name'=>'Insegnante']);
        Title::create(['name'=>'Specializzando']);
        Title::create(['name'=>'Technologo']);
        Title::create(['name'=>'Tirocinante']);
        Title::create(['name'=>'Volontario']);
        */


    }
}
