<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class Oauth2ClientsSeeder extends Seeder
{
    public function run()
    {
        $oauth_clients = [
            [
                'name' => config('api.api_client.name'),
                'secret' => config('api.api_client.secret'),
                'redirect' => 'http://localhost',
                'personal_access_client' => '0',
                'password_client' => '1',
                'revoked' => '0',
            ]
        ];

        DB::table('oauth_clients')->truncate();
        foreach ($oauth_clients as $client) {
            DB::table('oauth_clients')->insert($client);
        }
    }
}
