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
         $this->call(UsersTableSeeder::class);
         $this->call(RolesAndPermissionsSeeder::class);
         $this->call(LibrariesTableSeeder::class);
    }
}
