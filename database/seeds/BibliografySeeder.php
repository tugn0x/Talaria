<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BibliografySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // creo un utente con ruolo di patron (quindi abilitato x una biblioteca)
        // con 5 riferimenti di cui 2 in richiesta
        factory(\App\Models\Users\User::class, 1)->create()
        ->each(function ($user) {
            $library1=App\Models\Libraries\Library::find(1);
            
            DB::table('library_user')->insert([
                'library_id' => $library1->id,
                'user_id' => $user->id,
                'status'=>1,
                'department_id'=>null,
                'title_id'=>null,
            ]);
            $user->assign('patron'); //lo abilito come utente patron della biblio

            factory(\App\Models\References\Reference::class,5)->create([
                'created_by'=>$user->id,
                'updated_by'=>$user->id,
            ])->each(function ($ref) use ($user,$library1) {
                factory(\App\Models\Requests\PatronDocdelRequest::class,1)->create([
                    'created_by'=>$user->id,
                    'updated_by'=>$user->id,
                    'reference_id'=>$ref->id,
                    'borrowing_library_id'=>$library1->id,
                ]);
            });

        });
        
        
        
        
    }
}
