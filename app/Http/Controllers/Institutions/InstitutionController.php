<?php

namespace App\Http\Controllers\Institutions;

use App\Http\Controllers\ApiController;
use App\Models\Institutions\Institution;
use App\Models\Institutions\InstitutionTransformer;
use Illuminate\Http\Request;

class InstitutionController extends ApiController
{
    public function __construct(Institution $model, InstitutionTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;

        $this->nilde->disableAuthorize();
    }

}
