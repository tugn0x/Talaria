<?php

namespace App\Http\Controllers\Institutions;

use App\Http\Controllers\ApiController;
use App\Models\BaseLightTransformer;
use App\Models\BaseTransformer;
use App\Models\Institutions\Desk;
use Illuminate\Http\Request;

class DeskController extends ApiController
{
    public function __construct(Desk $model, BaseLightTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;

    }

   
}
