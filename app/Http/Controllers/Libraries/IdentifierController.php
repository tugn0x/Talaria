<?php

namespace App\Http\Controllers\Libraries;

use App\Http\Controllers\ApiController;
use App\Models\BaseLightTransformer;
use App\Models\Libraries\Identifier;
use Illuminate\Http\Request;

class IdentifierController extends ApiController
{
    public function __construct(Identifier $model, BaseLightTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;

    }
}
