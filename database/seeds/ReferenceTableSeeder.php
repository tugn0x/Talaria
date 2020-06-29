<?php

use App\Models\Users\User;
use Illuminate\Database\Seeder;

class ReferenceTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Users\User::get()->each(function ($u) {
            if($u->status==1)
            {
                factory(\App\Models\References\Reference::class,5)->create([
                    'created_by'=>$u->id,
                    'updated_by'=>$u->id,
                ]);
            }
        });
    }
}