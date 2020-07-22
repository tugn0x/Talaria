<?php namespace App\Models\Institutions;

use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\ParamBag;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class DeskTransformer extends BaseTransformer
{

    protected $availableIncludes = [

    ];

    protected $defaultIncludes = [

    ];



    public function transform(Model $model)
    {
        $to_merge = [

        ];
        return $this->applyTransform($model, $to_merge);
    }

}
