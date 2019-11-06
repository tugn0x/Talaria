<?php namespace App\Models\Libraries;

use App\Models\BaseObserver;
use \Auth;

class UserObserver extends BaseObserver
{
    protected $rules = [
        'name' => 'required|max:255',
        'surname' => 'required|max:255',
        'email' => 'sometimes|required|email|max:255|unique:users,email',
        'password' => 'required|confirmed|min:8|max:60',

        'country_id' => 'nullable|exists:countries',
        'address' => 'nullable|max:255',
        'town' => 'nullable|max:255',
        'district' => 'nullable|max:255',
        'postcode' => 'nullable|max:255',
        'state' => 'nullable|max:255',
        'phone' => 'nullable|max:255',
        'mobile' => 'nullable|max:255',

        'nationality' => 'nullable|integer|exists:countries,id',
        'phone' => 'nullable|max:255',
        'preflang' => 'nullable|max:255', // TODO: language config or DB

        'privacy_policy_accepted' => 'required|date',
    ];


    protected function setConditionalRules($model){
        $id = $model->getKey();

        if($model->exists)
        {
            // remove password from rules in case of update
            $rules = array_except($this->validator->getRules(), ['password']);
            $this->validator->setRules($rules);
        }

        foreach(['email'] as $field)
        {
            $this->validator->sometimes($field, $this->rules[$field].",$id", function($input) use($model, $field)
            {
                if($model->exists)
                {
                    $rules = array_except($this->validator->getRules(), [$field]);
                    $this->validator->setRules($rules);
                    return true;
                }
                return false;
            });
        }
    }
}
