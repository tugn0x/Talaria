<?php namespace App\Models;

use Carbon\Carbon;
use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\ParamBag;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;
use League\Fractal\TransformerAbstract;

class BaseLightTransformer extends TransformerAbstract
{


    protected $only = [
        'id',
        'name',
    ];

    public function transform(Model $model) {
        return $model->only($this->only);
    }

}
