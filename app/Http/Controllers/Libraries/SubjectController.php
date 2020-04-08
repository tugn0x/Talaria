<?php

namespace App\Http\Controllers\Libraries;

use App\Models\BaseLightTransformer;
use App\Models\Libraries\Subject;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Models\Libraries\SubjectTransformer;

class SubjectController extends ApiController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Subject $model, SubjectTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;
    }
}
