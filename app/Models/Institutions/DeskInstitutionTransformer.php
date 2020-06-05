<?php namespace App\Models\Institutions;

use App\Models\BaseLightTransformer;
use App\Models\Libraries\LibraryTransformer;
use Carbon\Carbon;
use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\ParamBag;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class DeskInstitutionTransformer extends BaseTransformer
{

    protected $availableIncludes = [
        'institution',
        'desk'
    ];

    protected $defaultIncludes = [
        'institution',
        'desk'
    ];

    public function includeInstitution(Model $model)
    {
        return $this->item($model->institution, new BaseLightTransformer());
    }

    public function includeDesk(Model $model)
    {
        return $this->item($model->desk, new BaseLightTransformer());
    }


    public function toArray(Model $model)
    {
        $to_merge = [
        
        ];
        return $this->applyTransform($model, $to_merge);
    }

}
