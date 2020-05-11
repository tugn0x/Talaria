<?php namespace App\Models\Libraries;

use App\Models\BaseLightTransformer;
use App\Models\Libraries\LibraryTransformer;
use Carbon\Carbon;
use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\ParamBag;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class CatalogLibraryTransformer extends BaseTransformer
{

    protected $availableIncludes = [
        'library',
        'catalog'
    ];

    protected $defaultIncludes = [
        'library',
        'catalog'
    ];

    public function includeLibrary(Model $model)
    {
        return $this->item($model->library, new BaseLightTransformer());
    }

    public function includeCatalog(Model $model)
    {
        return $this->item($model->catalog, new BaseLightTransformer());
    }

    
    public function toArray(Model $model)
    {
        $to_merge = [
        
        ];
        return $this->applyTransform($model, $to_merge);
    }

}
