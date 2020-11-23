<?php namespace App\Models\Institutions;

use App\Models\BaseLightTransformer;
use App\Models\Users\UserTransformer;
use Carbon\Carbon;
use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\ParamBag;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class ConsortiumTransformer extends BaseTransformer
{
    protected $policy = [
        'manage' => ['granted_permissions']
    ];

    protected $availableIncludes = [
        'granted_permissions',
    ];

    protected $defaultIncludes = [
        'creator',
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

    public function includeCreator(Model $model)
    {
        return $this->item($model, new UserTransformer);
    }



    public function transform(Model $model)
    {
        $to_merge = [

        ];
        return $this->applyTransform($model, $to_merge);
    }

}
