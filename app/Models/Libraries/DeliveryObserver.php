<?php namespace App\Models\Libraries;

use App\Models\BaseObserver;
use \Auth;

class DeliveryObserver extends BaseObserver
{

    protected $rules = [        
        'name' => 'required|string',
        'library_id' => 'required|integer|exists:libraries,id',
        /*'country_id' => 'required|integer|exists:countries,id',*/

    ];


    protected function setConditionalRules($model)
    {
//        $this->validator->sometimes('member_id', "required", function ($input) use ($model) {
//            return $model->type === 'physical';
//        });
    }

    public function creating($model)
    {         
         $model->status=config("constants.status.enabled");
         return parent::creating($model);
    }


    public function saving($model)
    {
        return parent::saving($model);
    }

    public function saved($model)
    {
        return parent::saved($model);
    }

    public function deleting($model)
    {      
        return parent::deleting($model);
    }

    public function restoring($model)
    {
        return parent::restoring($model);
    }

}
