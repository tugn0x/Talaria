<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Requests\BorrowingDocdelRequest;
use App\Notifications\LendingDocdelRequestNotification;
use App\Models\Requests\LendingDocdelRequest;

class LendingRequestUpdateNotify implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $borrowingreq;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(BorrowingDocdelRequest $breq)
    {
        $this->borrowingreq=$breq;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //Notify to lender        
        $lender=$this->borrowingreq->lendinglibrary;
        
        if($lender) 
        {
            $lending=LendingDocdelRequest::findOrFail($this->borrowingreq->id);

            $n=new LendingDocdelRequestNotification($lending);

            //get all lending operators
            $oper= $lender->operators("lend");
                
            foreach ($oper as $op)    
                $op->notify($n);
        }
        //else no need to notify
    }
}
