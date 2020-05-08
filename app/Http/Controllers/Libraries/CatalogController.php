<?php

namespace App\Http\Controllers\Libraries;

use App\Http\Controllers\ApiController;
use App\Models\BaseLightTransformer;
use App\Models\Libraries\Catalog;
use Illuminate\Http\Request;

class CatalogController extends ApiController
{
    public function __construct(Catalog $model, BaseLightTransformer $transformer)
    {
        $this->model = $model;

        $this->transformer = $transformer;

        $this->broadcast = false;

        $this->nilde->disableAuthorize();
    }
}
