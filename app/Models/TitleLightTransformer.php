<?php namespace App\Models;

use App\Models\BaseLightTransformer;

class TitleLightTransformer extends BaseLightTransformer
{

    protected $only = [
        'id',
        'name',
    ];

}
