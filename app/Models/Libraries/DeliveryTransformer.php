<?php namespace App\Models\Libraries;

use App\Models\BaseLightTransformer;
use App\Models\BaseTransformer;
use App\Models\Institutions\DeskTransformer;
use App\Models\Users\UserLightTransformer;
use Illuminate\Database\Eloquent\Model;

class DeliveryTransformer extends BaseTransformer
{
    protected $policy = [
        'manage' => ['granted_permissions']
    ];


    protected $availableIncludes = [
        'granted_permissions',
        'library',
        'users',
        'deliveryable',
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

    //Ritorna il trasformer corretto in base al tipo dell'oggetto "morphed" (che puo' essere un Desk o una Library) 
    public function getPoliTransformer($deliveryable)
    {   
        $transformer=new BaseLightTransformer();
        
        switch (get_class($deliveryable)) {
            case 'App\Models\Libraries\Library':
                $transformer = new LibraryTransformer();
                break;
            case 'App\Models\Institutions\Desk':
                $transformer = new DeskTransformer();
                break;
        }        
        return $transformer;
    }

    public function includeDeliveryable(Model $model)
    {
        if($model->deliveryable)
            return $this->item($model->deliveryable, $this->getPoliTransformer($model->deliveryable));
    }

    public function includeUsers(Model $model)
    {
        if($model->users)
            return $this->collection($model->users, new UserLightTransformer());
    }



    public function includeLibrary(Model $model)
    {
        if($model->library)
            return $this->item($model->library, new BaseLightTransformer());
    }



    public function transform(Model $model)
    {
        $to_merge = [
        ];
        return $this->applyTransform($model, $to_merge);
    }

}
