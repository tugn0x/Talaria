<?php namespace App\Models\Libraries;

use App\Models\BaseLightTransformer;
use Carbon\Carbon;
use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\ParamBag;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class LibraryTransformer extends BaseTransformer
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

    public function includeAbilities(Model $model)
    {
        $transf = new BaseLightTransformer();
        $transf->setOnly([
            'id',
            'name',
            'entity_id',
            'entity_type',
        ]);
        return $this->collection(collect($model->abilities), $transf);
    }

    public function includePermissions(Model $model)
    {
        $transf = new BaseLightTransformer();
        $transf->setOnly([
            'id',
            'name',
            'entity_id',
            'entity_type',
            'ability_id',
        ]);
        return $this->collection(collect($model->permissions), $transf);
    }



    public function transform(Model $model)
    {
        $to_merge = [
//            patronRoutes
        ];
        return $this->applyTransform($model, $to_merge);
    }

}
