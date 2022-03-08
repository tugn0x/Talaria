<?php namespace App\Models\Requests;

use App\Models\BaseObserver;
use \Auth;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class LendingDocdelRequestObserver extends BaseObserver
{

    protected $rules = [
        'lending_library_id' => 'nullable|integer|exists:libraries,id',
        'reference_id' => 'required|integer|exists:references,id',              
    ];

    public function creating($model)
    {
        return parent::creating($model);
    }

    
    public function saving($model)
    {        
        if( (!$model->wasRecentlyCreated) || $model->wasRecentlyCreated) //new or updating
            if(auth() && auth()->user()) {
                $userid = auth()->user()->id;
                $model->lending_operator_id=$userid;
            }
        
        if($model->isDirty('lending_archived'))
            $model->lending_archived_date=Carbon::now();        

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
