<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Requests\BorrowingDocdelRequest;
use App\Notifications\BorrowingDocdelRequestNotification;

class BorrowingUpdatePatronRequest implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $docdelreq;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(BorrowingDocdelRequest $ddr)
    {
        $this->docdelreq=$ddr;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle() 
    {               
        switch ($this->docdelreq->borrowing_status) {
            case 'notDeliveredToUserDirect': 
            case 'notDeliveredToUser': 
                //Change status in his patronddrequest
                if($this->docdelreq->patrondocdelrequest)
                   $this->docdelreq->patrondocdelrequest->unfillToPatron();                              
                break;
            case 'deliveredToUserDirect': 
            case 'deliveredToUser': 
                //Change status in his patronddrequest
                if($this->docdelreq->patrondocdelrequest)
                    $this->docdelreq->patrondocdelrequest->fulfillToPatron();                              
                break;    

            default: break;
        }


    }
}
