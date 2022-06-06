<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Models\Users\User;
use Illuminate\Support\Str;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Hash;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    $mail=$faker->unique()->safeEmail;
    $pw='$2y$10$hFoqYxGVboT8XXQcOhmVW.jYoYgVJ2Dp58N7/sKN//UN4t.g/zxom'; //Hash::make('d3mo$Demo');
    return [
        'name' => $faker->name,
        'surname' => $faker->name,
        'email' => $mail,
        'email_verified_at' => now(),
        'password' =>  $pw,
        'password_confirmation' => $pw,
        'remember_token' => Str::random(10),
        'privacy_policy_accepted' => now(),
        'status'=>1,
        'country_id'=>1,
    ];
});
