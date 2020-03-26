<?php namespace App\Models\Users;

use App\Models\ArrayTransformer;
use App\Models\BaseLightTransformer;
use Carbon\Carbon;
use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\ParamBag;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;
use Silber\Bouncer\Database\Ability;

class UserTransformer extends BaseTransformer
{

    protected $availableIncludes = [
        'roles',
        'resources',
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



    public function transform(Model $model)
    {
        $to_merge = [
            'test' => 'hello user',
        ];
        return $this->applyTransform($model, $to_merge);
    }

}
