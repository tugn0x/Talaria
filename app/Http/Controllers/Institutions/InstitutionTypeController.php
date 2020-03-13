<?php

namespace App\Http\Controllers\Institutions;

use App\Http\Controllers\ApiController;
use App\Models\Institutions\Institution;
use App\Models\Institutions\InstitutionType;
use App\Models\Libraries\InstitutionTypeTransformer;
use Illuminate\Http\Request;

class InstitutionTypeController extends ApiController
{
    public function __construct(InstitutionType $model, InstitutionTypeTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;
    }

}
