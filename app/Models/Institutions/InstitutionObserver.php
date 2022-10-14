<?php namespace App\Models\Institutions;

use App\Models\BaseObserver;
use \Auth;
use Carbon\Carbon;

class InstitutionObserver extends BaseObserver
{

    protected $rules = [        
        'name' => 'required|string',
        'institution_type_id'=>'required|integer|exists:institution_types,id',
//        'user_id' => 'required|integer|exists:users,id',
    ];


    protected function setConditionalRules($model)
    {
//        $this->validator->sometimes('member_id', "required", function ($input) use ($model) {
//            return $model->type === 'physical';
//        });
    }

    public function creating($model)
    {         
         $model->status=config("constants.institution_status.pending");
         $model->registration_date=Carbon::now();
         return parent::creating($model);
    }


    public function saving($model)
    {
        //sto aggiornando lo stato e lo voglio disattivare
        if($model->id && $model->isDirty('status')&&$model->status==config("constants.institution_status.disabled"))
        {
            if(!$model->canBeDisabled()) return false;
        } 

        return parent::saving($model);

    }

    public function saved($model)
    {
        return parent::saved($model);

    }

    public function deleting($model)
    {        
        if($model->status==config("constants.institution_status.pending")||$model->status==config("constants.institution_status.disabled"))            
            return parent::deleting($model);
        return false;    
    }

    public function restoring($model)
    {
        return parent::restoring($model);
    }

}
