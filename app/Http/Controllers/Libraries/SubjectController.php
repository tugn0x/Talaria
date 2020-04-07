<?php

namespace App\Http\Controllers\Libraries;

use App\Models\BaseLightTransformer;
use App\Models\Libraries\DepartmentTransformer;
use App\Models\Libraries\Library;
use App\Models\Libraries\LibraryTransformer;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;

class SubjectController extends ApiController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Library $model, BaseLightTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;
    }
}
