<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         $this->call(Oauth2ClientsSeeder::class);    
         $this->call(RolesAndPermissionsSeeder::class);   
         $this->call(CountriesTableSeeder::class);                      
         $this->call(CurrenciesSeeder::class);               
         $this->call(UsersTableSeeder::class);                                                                                   
         $this->call(IdentifierSeeder::class);    
         $this->call(SubjectsTableSeeder::class);
         $this->call(InstitutionTypesTableSeeder::class);       
         $this->call(TitlesTableSeeder::class);  
         $this->call(InstitutionsTableSeeder::class);                  
         $this->call(ProjectsTableSeeder::class);                  
         
         //Not fully implemented
         //$this->call(CatalogsTableSeeder::class);                              
         //$this->call(ConsortiumTableSeeder::class);
    }
}
