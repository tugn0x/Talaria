<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\Libraries\Library;
use Faker\Generator as Faker;

$factory->define(Library::class, function (Faker $faker) {
    return [
        'name' => $faker->streetName,
        'email' => $faker->unique()->safeEmail,
    ];
});
