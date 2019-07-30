<?php namespace App\Models\Libraries;

use Carbon\Carbon;
use App\Models\BaseTransformer;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\ParamBag;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class LibraryTransformer extends BaseTransformer
{

    protected $availableIncludes = [

    ];

    public function transform(Library $model)
    {
        $to_merge = [

        ];
        return $this->applyTransform($model, $to_merge);
    }

}
