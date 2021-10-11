<?php namespace App\Models\Users;

use App\Models\BaseObserver;
use \Auth;
use Illuminate\Support\Arr;
use Str;

class DatabaseNotificationObserver extends BaseObserver
{

    protected $rules = [

    ];

    public function saving($model)
    {        
        if(is_array($model->data) && (key_exists("object_id",$model->data) && key_exists("object_type",$model->data)) || $model->object)
        {
            //$model->object_type = Arr::get($model->data,"object_type", get_class($model->object));
            //$model->object_id = Arr::get($model->data,"object_id",$model->object->id);
            $model->object_type = $model->data["object_type"];
            $model->object_id = $model->data["object_id"];

        }
        return parent::saving($model);
    }
}
