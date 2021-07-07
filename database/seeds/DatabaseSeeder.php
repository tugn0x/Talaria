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
         $this->call(ProjectsTableSeeder::class);
         $this->call(SubjectsTableSeeder::class);
         $this->call(CountriesTableSeeder::class);
         $this->call(CatalogsTableSeeder::class);
         $this->call(InstitutionTypesTableSeeder::class);
         $this->call(InstitutionsTableSeeder::class);         
         $this->call(LibrariesTableSeeder::class);                
         $this->call(ConsortiumTableSeeder::class);
         $this->call(UsersTableSeeder::class);  
         $this->call(DepartmentsTableSeeder::class);
         $this->call(TitlesTableSeeder::class);
         $this->call(LabelTableSeeder::class);
         $this->call(GroupTableSeeder::class);
         $this->call(ReferenceTableSeeder::class);
         $this->call(LibraryDeliverySeeder::class); 
         //  $this->call(BibliografySeeder::class);  
         //$this->call(NotificationsTableSeeder::class);      
         $this->call(CurrenciesSeeder::class); 
    }
}
