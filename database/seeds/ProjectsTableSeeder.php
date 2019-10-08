<?php

use Illuminate\Database\Seeder;
use App\Models\Projects\Project;

class ProjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Project::create(['name'=>'Ministero della Salute - Progetto Bibliosan','active'=>1]);        
        Project::create(['name'=>'ESSPER','active'=>0]);        
        Project::create(['name'=>'BESS - Biblioteca Elettronica Scienze Sociali ed Economiche del Piemonte','active'=>1]);                        
    }
}
