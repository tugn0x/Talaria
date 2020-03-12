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
            factory(Department::class, 4)->create([
                'library_id' => $library->id
            ]);
        });
        Title::create(['name'=>'Mr']);
        Title::create(['name'=>'Mrs']);
        Title::create(['name'=>'Doct']);
        Title::create(['name'=>'Prof']);
        Title::create(['name'=>'CEO']);
        Title::create(['name'=>'CTO']);
        Title::create(['name'=>'Pope']);
        Title::create(['name'=>'Bishop']);
    }
}
