<?php

namespace App\Http\Controllers\Libraries;

use App\Http\Controllers\ApiController;
use App\Models\BaseTransformer;
use App\Models\Libraries\Catalog;
use Illuminate\Http\Request;

class CatalogController extends ApiController
{
    public function __construct(Catalog $model, BaseTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;

    }
}
