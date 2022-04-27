<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Requests\DocdelRequest;
use App\Notifications\LendingDocdelRequestNotification;
use App\Models\Requests\LendingDocdelRequest;

class LendingRequestUpdateNotify implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $docdelreq;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(DocdelRequest $ddreq)
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
        //Notify to lender        
        $lender=$this->docdelreq->lendinglibrary;
        
        if($lender) 
        {
            $lending=LendingDocdelRequest::findOrFail($this->docdelreq->id);

            $n=new LendingDocdelRequestNotification($lending);

            //get all lending operators
            $oper= $lending->lendingLibraryOperators();
            
                
            foreach ($oper as $op)    
                $op->notify($n);
        }
        //else no need to notify
    }
}
