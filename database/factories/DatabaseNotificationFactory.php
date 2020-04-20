<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use Faker\Generator as Faker;
use Illuminate\Support\Str;



$factory->define(\App\Models\Users\DatabaseNotification::class, function (Faker $faker) {
    $readed = $faker->boolean(75);
    $randModel = $faker->randomElement([
        \App\Models\Libraries\Library::class,
        \App\Models\Institutions\Institution::class,
        \App\Models\Libraries\LibraryUser::class,
        \App\Models\Projects\Project::class,
        \App\Models\Institutions\Consortium::class,
    ]);
    return [
        'id' => $faker->uuid,
        'type' => \App\Notifications\BaseNotification::class,
        'data' => [
            'title'     => $faker->sentence(4),
            'message'   => $faker->sentence,
            'priority'  => $faker->numberBetween(0, 5),
        ],
        'object_type'   => $randModel,
        'object_id'     => $randModel::select('id')->get(10)->random(1)->first()->id,
        'read_at'       => $readed ? $faker->dateTime : null,
        'email_at'      => $readed ? $faker->dateTime : null,
    ];
});
