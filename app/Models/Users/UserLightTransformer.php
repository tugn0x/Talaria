<?php namespace App\Models\Users;

use App\Models\BaseLightTransformer;
use Carbon\Carbon;
use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\ParamBag;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class UserLightTransformer extends BaseLightTransformer
{

    protected $only = [
        'id',
        'name',
        'surname',
        'full_name',
    ];

}
