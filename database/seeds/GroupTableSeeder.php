<?php

use Illuminate\Database\Seeder;

class GroupTableSeeder extends Seeder
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
                factory(\App\Models\References\Group::class,3)->create([
                    'created_by'=>$u->id,
                    'updated_by'=>$u->id,
                ]);
            }
        });
    }
}
