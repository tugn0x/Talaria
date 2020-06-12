<?php namespace App\Models\Libraries;

use App\Models\BaseLightTransformer;
use App\Models\BaseTransformer;
use App\Models\Users\UserLightTransformer;
use Illuminate\Database\Eloquent\Model;

class DeliveryTransformer extends BaseTransformer
{

    //TODO Come includo l'oggetto "morphed" (che puo' essere un Desk o una Library) ?
    //
    protected $availableIncludes = [
        'granted_permissions',
        'library',
        'users',
    ];

    protected $defaultIncludes = [
        'granted_permissions',
        'deliveryable',
    ];

    public function includeGrantedPermissions(Model $model)
    {
        $transf = new BaseLightTransformer();
        $transf->setCallback(function ($model) {
            return $model->user_with_permissions();
        });
        return $this->item($model, $transf);
    }

    public function includeDeliveryable(Model $model)
    {
        return $this->item($model->deliveryable, new BaseLightTransformer());
    }

    public function includeUsers(Model $model)
    {
        return $this->collection($model->users, new UserLightTransformer());
    }



    public function includeLibrary(Model $model)
    {
        return $this->item($model->library, new BaseLightTransformer());
    }



    public function transform(Model $model)
    {
        $to_merge = [
        ];
        return $this->applyTransform($model, $to_merge);
    }

}
