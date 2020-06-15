<?php namespace App\Models\Libraries;

use App\Models\BaseLightTransformer;
use App\Models\Users\UserLightTransformer;
use App\Models\BaseTransformer;
use Illuminate\Database\Eloquent\Model;

class DeliveryUserTransformer extends BaseTransformer
{

    protected $availableIncludes = [
        'delivery',
        'user',
    ];

    protected $defaultIncludes = [
        'delivery',
        'user',
    ];

    public function includeDelivery(Model $model)
    {
        return $this->item($model->delivery, new BaseLightTransformer());
    }

    public function includeUser(Model $model)
    {
        return $this->item($model->user, new UserLightTransformer());
    }

    public function toArray(Model $model)
    {
        $to_merge = [
        
        ];
        return $this->applyTransform($model, $to_merge);
    }

}
