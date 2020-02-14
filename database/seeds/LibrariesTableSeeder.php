<?php

use App\Models\Libraries\Library;
use Illuminate\Database\Seeder;

class LibrariesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //\Auth::loginUsingId(1);
        factory(\App\Models\Libraries\Library::class, 5)->create();
    }

}
