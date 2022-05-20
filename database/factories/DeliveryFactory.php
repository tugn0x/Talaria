<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Models\Libraries\Delivery;
use Faker\Generator as Faker;

$factory->define(Delivery::class, function (Faker $faker) {
    return [
        'name' => "Delivery service",
        'openinghours' => '8-12, 15-19 L-S',
        'library_id'=>1,        
    ];
});
