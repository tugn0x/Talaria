<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Requests\DocdelRequest;
use App\Notifications\PatronDocdelRequestNotification;
use App\Models\Requests\BorrowingDocdelRequest;

class PatronRequestUpdateNotify implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $docdelreq;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(BorrowingDocdelRequest $ddreq)
    {
        $this->docdelreq=$ddreq;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //Notify to patron        

        $patronreq=$this->docdelreq->patrondocdelrequest;
        
        
        if($patronreq) 
        {
            $n=new PatronDocdelRequestNotification($patronreq);

            //get patron
            $patron= $patronreq->user;
                              
            $patron->notify($n);
        }
        //else no need to notify
    }
}
