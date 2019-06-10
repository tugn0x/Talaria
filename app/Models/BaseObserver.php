<?php namespace App\Models;

use \App;
use \Illuminate\Validation\Factory;

class BaseObserver
{
    protected $validator;

    protected $rules = [
        'title'=>'required|max:255',
        'open_at'=>'required|date|before:close_at',
        'close_at'=>'required|date|after:open_at',
        'status'=>'required|max:255|in:draft,publish,open,closed',
        'start_at'=>'required|date|before:end_at',
        'end_at'=>'required|date|after:start_at',
        'remote_access'=>'boolean',
        'physical_access'=>'boolean',
        'evaluation_days'=>'required|integer',
        'evaluation_manager_days'=>'required|integer',
        'acceptance_days'=>'required|integer',
        'description' => 'required|max:21844',
        'user_id' => 'required|integer|exists:users,id',
//        'sm_reminder_date'=>'required|date|after:end_at',
        'sm_reminder_date'=>'required|date|after:close_at',
    ];

    public function __construct()
    {
        if(count($this->rules) > 0)
        {
            $this->validator = App::make('Illuminate\Validation\Factory')->make([], $this->rules);
        }
    }

    public function saving($model)
    {
        // Perform Validation based on a $rule attributes
        if(count($this->rules) > 0)
        {
            $this->validator->setData($model->getAttributes());

            $this->setConditionalRules($model);

            if ($this->validator->fails())
            {
                if (!$model->exists)
                {
//                    print_r(get_class($model));
//                    print_r($model->toArray());
//                    exit(print_r($this->validator->errors()));
                    throw new \Dingo\Api\Exception\StoreResourceFailedException(trans('apiclu::response.create_failed'), $this->validator->errors());
                }
                else
                {
//                    print_r(get_class($model));
//                    print_r($model->toArray());
//                    exit(print_r($this->validator->errors()));
                    throw new \Dingo\Api\Exception\UpdateResourceFailedException(trans('apiclu::response.update_failed'), $this->validator->errors());
                }
            }
        }

        return true;
    }

    public function saved($model){}

    public function updating($model){}

    public function updated($model){}

    public function creating($model){}

    public function created($model){}

    public function deleting($model){}

    public function deleted($model){}

    public function restoring($model){}

    public function restored($model){}

    protected function setConditionalRules($model){}
}
