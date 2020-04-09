<?php namespace App\Models\Projects;

use App\Models\BaseLightTransformer;
use Carbon\Carbon;
use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\ParamBag;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class ProjectTransformer extends BaseTransformer
{
    protected $availableIncludes = [
        'granted_permissions',
    ];

    protected $defaultIncludes = [
        'granted_permissions',
    ];

    public function includeGrantedPermissions(Model $model)
    {
        $transf = new BaseLightTransformer();
        $transf->setCallback(function ($model) {
            return $model->user_with_permissions();
        });
        return $this->item($model, $transf);
    }


    public function transform(Model $model)
    {
        $to_merge = [

        ];
        return $this->applyTransform($model, $to_merge);
    }

}
