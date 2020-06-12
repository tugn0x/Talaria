<?php namespace App\Models\Users;

use App\Models\ArrayTransformer;
use App\Models\BaseLightTransformer;
use Carbon\Carbon;
use App\Models\BaseTransformer;
use App\Models\Libraries\DeliveryTransformer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\ParamBag;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;
use Silber\Bouncer\Database\Ability;

class UserTransformer extends BaseTransformer
{

    protected $policy = [
//        'view-name' => ['name'],
        'view-roles' => ['roles']
    ];

    protected $availableIncludes = [
        'roles',
        'resources',
        'deliveries',
        'groups',
        'labels'
    ];

    protected $defaultIncludes = [
//        'resources',
//        'roles',
    ];

    public function includeRoles(Model $model)
    {
//        return $this->collection($model->roles, new BaseLightTransformer());
        return $this->item($model, new RolesTransformer());

    }

    public function includeResources(Model $model)
    {
        return $this->item($model, new AbilitiesTransformer);
    }

    public function includeDeliveries(Model $model)
    {
        return $this->collection($model->deliveries, new DeliveryTransformer());
    }

    public function includeLabels(Model $model)
    {
        return $this->collection($model->labels, new BaseLightTransformer());
    }

    public function includeGroups(Model $model)
    {
        return $this->collection($model->groups, new BaseLightTransformer());
    }

    public function transform(Model $model)
    {
        $to_merge = [
           
        ];
        return $this->applyTransform($model, $to_merge);
    }

}
