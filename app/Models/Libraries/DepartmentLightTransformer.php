<?php namespace App\Models\Libraries;

use App\Models\BaseLightTransformer;
use Carbon\Carbon;
use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\ParamBag;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class DepartmentLightTransformer extends BaseLightTransformer
{

    protected $only = [
        'id',
        'name',
    ];

}
