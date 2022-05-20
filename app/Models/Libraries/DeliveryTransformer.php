<?php namespace App\Models\Libraries;

use App\Models\BaseLightTransformer;
use App\Models\BaseTransformer;
use App\Models\Users\UserLightTransformer;
use Illuminate\Database\Eloquent\Model;

class DeliveryTransformer extends BaseTransformer
{   
    protected $availableIncludes = [      
        'library',        
    ];

    protected $defaultIncludes = [             
        'country'        
    ];



    public function includeLibrary(Model $model)
    {
        if($model->library)
            return $this->item($model->library, new BaseLightTransformer());
    }

    public function includeCountry(Model $model)
    {
        if($model->country)
            return $this->item($model->country, new BaseLightTransformer());
    }



    public function transform(Model $model)
    {
        $to_merge = [
        ];
        return $this->applyTransform($model, $to_merge);
    }

}
