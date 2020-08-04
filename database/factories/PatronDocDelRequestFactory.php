<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Models\Requests\PatronDocdelRequest;
use Faker\Generator as Faker;

$factory->define(PatronDocdelRequest::class, function (Faker $faker) {
    return [
        'borrowing_library_id'=>null,
        'reference_id'=>null,
        'status'=>'requested',
        'request_date'=>$faker->dateTime(),
        'archived'=>0,
        'delivery_id'=>null,   
    ];
});
