<?php namespace App\Models\Libraries;

use App\Models\BaseObserver;
use \Auth;

class LibraryObserver extends BaseObserver
{

    protected $rules = [
        'email' => 'required|email',
        'name' => 'required',
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
        //non posso eliminare una biblio attiva
        if(in_array($model->status,[config("constants.library_status.enabled"),config("constants.library_status.renewing"),config("constants.library_status.enabled_wait_fax")]))
            return false;
        
        return parent::deleting($model);
    }

    public function restoring($model)
    {
        return parent::restoring($model);
    }

}
