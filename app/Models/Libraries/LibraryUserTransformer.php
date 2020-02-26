<?php namespace App\Models\Libraries;

use App\Models\Libraries\LibraryTransformer;
use Carbon\Carbon;
use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\ParamBag;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class LibraryUserTransformer extends BaseTransformer
{

    protected $availableIncludes = [
        'library'
    ];

    protected $defaultIncludes = [
        'library'
    ];

    public function includeLibrary(Model $model)
    {
        return $this->item($model->library, new LibraryTransformer);
    }



    public function toArray(Model $model)
    {
        $to_merge = [
            'test' => 'hello user',
        ];
        return $this->applyTransform($model, $to_merge);
    }

}
