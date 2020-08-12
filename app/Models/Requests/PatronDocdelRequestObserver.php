<?php namespace App\Models\Requests;

use App\Models\BaseObserver;
use \Auth;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class PatronDocdelRequestObserver extends BaseObserver
{

    protected $rules = [
        'borrowing_library_id' => 'required|integer|exists:libraries,id',
        'reference_id' => 'required|integer|exists:references,id',
        'delivery_id' => 'required|integer|exists:deliveries,id',
    ];


    protected function setConditionalRules($model)
    {
//        $this->validator->sometimes('member_id', "required", function ($input) use ($model) {
//            return $model->type === 'physical';
//        });
    }

    public function creating($model)
    {
         //quando salvo viene messa in richiesta in quanto di default è status=requested
         $model->request_date=Carbon::now();
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
