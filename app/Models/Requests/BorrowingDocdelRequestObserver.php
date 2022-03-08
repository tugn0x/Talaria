<?php namespace App\Models\Requests;

use App\Models\BaseObserver;
use \Auth;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class BorrowingDocdelRequestObserver extends BaseObserver
{

    protected $rules = [
        'borrowing_library_id' => 'required|integer|exists:libraries,id',
        'reference_id' => 'required|integer|exists:references,id',       
        'patron_docdel_request_id' => 'nullable|integer|exists:patron_docdel_requests,id', 
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
         $model->request_type=0; //DD
         $model->forward=0;         
         $model->borrowing_status="newrequest";
            
         return parent::creating($model);
    }

    
    public function saving($model)
    {        
        if( (!$model->patrondocdelrequest && !$model->wasRecentlyCreated) || //è nuova ma non patronreq
        $model->wasRecentlyCreated) //lo sto aggiornando (anche se è patronddreq non mi interessa)
            if(auth() && auth()->user()) {
                $userid = auth()->user()->id;
                $model->operator_id=$userid;
            }
            
        if($model->isDirty('download'))
            $model->download_date=Carbon::now();

        if($model->isDirty('forward'))
            $model->forward_date=Carbon::now();        
        
        if($model->isDirty('archived'))
            $model->archived_date=Carbon::now();    

        if($model->isDirty('trash_type'))
            $model->trash_date=Carbon::now();        

        //when borrowing cancel request     
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
