<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\Libraries\Library;
use Faker\Generator as Faker;

$factory->define(\App\Models\Libraries\Department::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
    ];
});
