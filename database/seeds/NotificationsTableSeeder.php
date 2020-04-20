<?php

use App\Models\Institutions\Consortium;
use Illuminate\Database\Seeder;

class NotificationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Users\User::get()->each(function ($u) {
            factory(\App\Models\Users\DatabaseNotification::class, 30)->create([
                'notifiable_type' => \App\Models\Users\User::class,
                'notifiable_id' => $u->id,
            ]);
        });
    }
}
