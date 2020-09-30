<?php namespace App\Models\References;

use App\Models\BaseLightTransformer;
use Carbon\Carbon;
use App\Models\BaseTransformer;
use App\Models\Requests\PatronDocdelRequestTransformer;
use Illuminate\Database\Eloquent\Model;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\ParamBag;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;

class ReferenceTransformer extends BaseTransformer
{

    protected $availableIncludes = [
        'labels',
        'groups',
        'patronddrequests'
    ];

    protected $defaultIncludes = [
        'labels',
        'groups'
    ];



    public function transform(Model $model)
    {
//        dd('trasformo');
        $to_merge = [
              'active_patronrequests'=>$model->activepatronddrequests()->count(),
              'patronrequests'=>$model->patronddrequests()->count()
        ];
        return $this->applyTransform($model, $to_merge);
    }

    public function includeLabels(Model $model)
    {
        return $this->collection($model->labels, new BaseLightTransformer());
    }

    public function includePatronddrequests(Model $model)
    {
        return $this->collection($model->patronddrequests, new PatronDocdelRequestTransformer());
    }

    public function includeGroups(Model $model)
    {
        return $this->collection($model->groups, new BaseLightTransformer());
    }

}
