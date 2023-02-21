<?php

namespace App\Http\Controllers\Commons;

use App\Models\BaseLightTransformer;
use App\Models\Title;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
//use App\Models\Users\TitleTransformer;

class TitleController extends ApiController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Title $model, BaseLightTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;

        $this->talaria->disableAuthorize();
    }
}