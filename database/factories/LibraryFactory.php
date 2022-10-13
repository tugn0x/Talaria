<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\Libraries\Library;
use Faker\Generator as Faker;

$factory->define(Library::class, function (Faker $faker) {
    return [
        'name' => $faker->streetName,     
        'institution_id' => 1,
        'subject_id'=>1,
        'country_id'=>1,
        'status'=>1,
    ];
});
