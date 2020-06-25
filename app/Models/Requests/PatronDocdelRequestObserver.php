<?php namespace App\Models\Requests;

use App\Models\BaseObserver;
use \Auth;

class PatronDocdelRequestObserver extends BaseObserver
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

    public function creating($model)
    {
         //quando salvo va messa in richiesta
         $model->status=config("constants.patronddrequest_status.requested");
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
