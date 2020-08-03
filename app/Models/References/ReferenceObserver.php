<?php namespace App\Models\References;

use App\Models\BaseObserver;
use \Auth;

class ReferenceObserver extends BaseObserver
{

    protected $rules = [
//        'email' => 'required|email',
//        'name' => 'required',
//        'user_id' => 'required|integer|exists:users,id',
    ];


    protected function setConditionalRules($model)
    {
//        $this->validator->sometimes('member_id', "required", function ($input) use ($model) {
//            return $model->type === 'physical';
//        });
    }

    public function saving($model)
    {
         //non posso modificare un rif che è attualmente in richiesta o che è stato richiesto
         if($model->patronddrequests()->count()>0)
            return false; 
    
        return parent::saving($model);

    }

    public function saved($model)
    {
        return parent::saved($model);

    }

    public function deleting($model)
    {
        //non posso eliminare un rif che è attualmente in richiesta
        if($model->activepatronddrequests()->count()>0)
            return false; 

        return parent::deleting($model);
    }

    public function restoring($model)
    {
        return parent::restoring($model);
    }

}
