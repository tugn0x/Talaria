<?php namespace App\Models\Libraries;

use App\Models\BaseObserver;
use \Auth;

class LibraryUserObserver extends BaseObserver
{

    protected $rules = [
        'library_id' => 'sometimes|required|integer|exists:libraries,id',
        'user_id' => 'required|integer|exists:users,id',
    ];


    protected function setConditionalRules($model)
    {
        $this->validator->sometimes('library_id',
            'required|unique:library_user,library_id,'.$model->library_id.'|unique:library_user,user_id,'.$model->user_id,
            function ($input) use ($model) {
            return !$model->id;
        });
    }

    public function saving($model)
    {
        if(!$model->user_id) {
            $model->user_id = auth()->user()->id;
        }
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
