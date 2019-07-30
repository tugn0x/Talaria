<?php

namespace App\Http\Controllers;

use App\Traits\Auth\ApiControllerTrait;
//use App\Traits\Http\ApiTrait;
use Dingo\Api\Routing\Helpers;
use Illuminate\Foundation\Bus\DispatchesJobs;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
//use App\Models\BaseModel as Model;
//use App\Models\BaseTransformer as Transformer;

class ApiController extends Controller
{
    use ApiControllerTrait;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
//    public function __construct(Model $model, Transformer $transformer)
//    {
//        $this->model = $model;
//
//        $this->transformer = $transformer;
//
//        $this->broadcast = false;
//    }
}
