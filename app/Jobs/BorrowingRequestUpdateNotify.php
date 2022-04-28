<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Requests\DocdelRequest;
use App\Notifications\BorrowingDocdelRequestNotification;
use App\Models\Requests\BorrowingDocdelRequest;

class BorrowingRequestUpdateNotify implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $docdelreq;
    
    /*NOTA: passo una DocdelRequest perchè questa classe viene chiamata sia da Borr che da Lend*/
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
        //Notify to borrower        
        $borrow=$this->docdelreq->borrowinglibrary;
        
        if($borrow) 
        {
            $borrowing=BorrowingDocdelRequest::findOrFail($this->docdelreq->id);
            if($borrowing)
            {
                $n=new BorrowingDocdelRequestNotification($borrowing);

                //get all borrowing operators
                $oper= $borrowing->borrowingLibraryOperators();
                
                    
                foreach ($oper as $op)    
                    $op->notify($n);
            }
            
        }
        //else no need to notify
    }
}
