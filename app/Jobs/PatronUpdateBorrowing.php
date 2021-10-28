<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Requests\PatronDocdelRequest;
use App\Notifications\BorrowingDocdelRequestNotification;

class PatronUpdateBorrowing implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $patronddrequest;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(PatronDocdelRequest $pdr)
    {
        $this->patronddrequest=$pdr;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {        
        /*
        if($model->getOriginal("status")=="requested" && $model->isDirty("status") && $model->status=="canceled" && $model->docdelrequests)
        {
            //Change status in his (latest/current opened) borrowingRequest
            $borrddr=$model->docdelrequests->sortByDesc('created_at')->first();                

            if($borrddr) 
                $borrddr->userAskCancel();

            //TODO: notify to librarian
        }*/
        switch ($this->patronddrequest->status) {
            case 'canceled': 
                            //Change status in his (latest/current opened) borrowingRequest
                            if($this->patronddrequest->docdelrequests)
                            {
                                $borrddr=$this->patronddrequest->docdelrequests->sortByDesc('created_at')->first();                
                                if($borrddr) 
                                {
                                    $borrddr->userAskCancel();
                                    
                                    /*$n=new BorrowingDocdelRequestNotification($borrddr);

                                    $lib=$this->patronddrequest->library;
                                    //get all borrowing/lending/.. operators
                                    $oper= $lib->operators("borrow");
            
                                    foreach ($oper as $op)    
                                      $op->notify($n);    */
                                }
                            }
                            break;

            default: break;
        }


    }
}
