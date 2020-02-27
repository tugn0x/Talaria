<?php namespace App\Models\References;

use Carbon\Carbon;
use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\ParamBag;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class ReferenceTransformer extends BaseTransformer
{

    protected $availableIncludes = [

    ];



    public function transform(Model $model)
    {
//        dd('trasformo');
        $to_merge = [
            'test' => 'hello',
        ];
        return $this->applyTransform($model, $to_merge);
    }

}
