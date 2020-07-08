<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Models\References\Label;
use Faker\Generator as Faker;

$factory->define(Label::class, function (Faker $faker) {
    return [
        'name' => $faker->word(),
    ];
});