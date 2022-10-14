<?php namespace App\Models\Libraries;

use App\Models\BaseObserver;
use \Auth;
use Carbon\Carbon;

class LibraryObserver extends BaseObserver
{

    protected $rules = [        
        'name' => 'required|string',
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
         //ogni nuova biblio va messa in stato=new
         $model->status=config("constants.library_status.new");
         $model->registration_date=Carbon::now();
         return parent::creating($model);
    }


    public function saving($model)
    {
        //sto aggiornando lo stato e voglio abilitare la biblio
        if($model->id && $model->isDirty('status')&&$model->status==config("constants.library_status.enabled"))
        {
            if(!$model->canBeEnabled()) return false;
        } 

        return parent::saving($model);
    }

    public function saved($model)
    {        
        return parent::saved($model);

    }

    public function deleting($model)
    {
        //posso eliminare SOLO una biblio nuova
        if($model->status==config("constants.library_status.new"))            
            return parent::deleting($model);
        return false;    
    }

    public function restoring($model)
    {
        return parent::restoring($model);
    }
    
    
}
