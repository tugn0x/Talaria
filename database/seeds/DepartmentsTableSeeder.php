<?php

use App\Models\Libraries\Department;
use Illuminate\Database\Seeder;
use App\Models\Users\Title;

class DepartmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Libraries\Library::get()->each(function ($library) {
            factory(Department::class, 2)->create([
                'library_id' => $library->id
            ]);
        });
    }
}
