<?php

use App\Models\Users\Department;
use Illuminate\Database\Seeder;

class DepartmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Department::create(['library_id'=>1,'name'=>'ISMN-BO']);
        Department::create(['library_id'=>1,'name'=>'ISOF-BO']);
        Department::create(['library_id'=>1,'name'=>'IMM-BO']);
    }
}
