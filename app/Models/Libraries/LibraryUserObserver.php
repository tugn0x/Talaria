<?php namespace App\Models\Libraries;

use App\Models\BaseObserver;
use \Auth;

class LibraryUserObserver extends BaseObserver
{

    protected $rules = [
//        'library_id' => 'sometimes|required|integer|exists:libraries,id',
        'library_id' => 'required|integer|exists:libraries,id',
        'user_id' => 'required|integer|exists:users,id',
    ];


    protected function setConditionalRules($model)
    {
//        $this->validator->sometimes('library_id',
//            'required|unique:library_user,library_id,'.$model->library_id.'|unique:library_user,user_id,'.$model->user_id,
//            function ($input) use ($model) {
//            return !$model->id;
//        });
    }

    public function creating($model)
    {
         //ogni nuova rich va messa in attesa
         $model->status=config("constants.patron_status.pending");
         return parent::creating($model);
    }

    public function created($model)
    {
        /* send mail+notif to library */
    }

    public function saving($model)
    {
        if(!$model->user_id) {
            $model->user_id = auth()->user()->id;
        }

        if(parent::saving($model)) //sto salvando e la validazione non ha dato problemi
        {
            //Sto aggiornando lo stato dell'utente x la biblioteca
            if($model->isDirty() && $model->isDirty("status"))
            {
                //lo sto disabilitando
                if($model->status==config("constants.patron_status.disabled"))
                {
                    /*1. remove role "patron" if he has no other active libraries*/
                    $u=$model->user;
                    if($u->active_libraries->count()==1)
                        $u->retract('patron');
                    /* 2. send mail+notify to user to let him know it was disabled */
                }
                //lo sto abilitando
                else if($model->status==config("constants.patron_status.enabled"))
                {
                    /* 1. add role "patron" if he has not */
                    $u=$model->user;
                    if($u->active_libraries->count()==0)
                        $u->assign('patron');
                    /*2. send mail+notify to user to let him know it was enabled */    
                }

            }
        }
        return true;

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
