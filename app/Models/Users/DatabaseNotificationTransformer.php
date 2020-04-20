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

class DatabaseNotificationTransformer extends BaseTransformer
{

    protected $availableIncludes = [
        'notifiable',
        'object',
    ];

    protected $defaultIncludes = [
//        'resources',
//        'roles',
    ];

    public function includeNotifiable(Model $model)
    {
//        if($model->notifiable)
//            return $this->item($model->notifiable, new BaseLightTransformer());
        if($model->notifiable)
            return $this->item($model->notifiable, new BaseLightTransformer());

    }

    public function includeObject(Model $model)
    {
        if($model->object)
            return $this->item($model, new $model->object_type.'Transformer');
    }



    public function transform(Model $model)
    {
        $to_merge = [
//            'test' => 'hello',
        ];
        return $this->applyTransform($model, $to_merge);
    }

}
