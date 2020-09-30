<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Models\References\Reference;
use Faker\Generator as Faker;

$factory->define(Reference::class, function (Faker $faker) {
    return [
        'material_type' => 1, //creo sempre articoli
        'pub_title' => $faker->sentence(4),
        'part_title' => $faker->sentence(10),
        'pubyear' => $faker->year(),
        'status'=>0
    ];
});
