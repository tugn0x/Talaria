<?php namespace App\Models\Requests;

use App\Models\BaseObserver;
use \Auth;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class LendingDocdelRequestObserver extends BaseObserver
{

    protected $rules = [
        'lending_library_id' => 'required|integer|exists:libraries,id',
        'reference_id' => 'required|integer|exists:references,id',       
    ];


    protected function setConditionalRules($model)
    {

    }

    public function creating($model)
    {

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
