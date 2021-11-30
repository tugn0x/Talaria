<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Requests\BorrowingDocdelRequest;

class AutomaticCleanDDRequests implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    private function updateCanceledRequests() {
        //automatic "accept cancel" for borrowing request in cancelRequested state
        $borrowings=BorrowingDocdelRequest::where(
         [
            ['borrowing_status','=','cancelRequested'],
            ['lending_status','=','cancelRequested']
         ]
        )
        ->whereNotNull('cancel_request_date')
        ->whereRaw("DATEDIFF(now(),cancel_request_date) >= 2")->get();        
        foreach($borrowings as $borr)             
            $borr->changeStatus("canceled",["lending_status"=>"canceledAccepted","lending_archived"=>1]);

    }

    private function resetNotAcceptedRequests() {
        //automatic "restart as new" for borrowing request in requested state
        $reqborrowings=BorrowingDocdelRequest::where('borrowing_status','=','requested')
        ->where('lending_status','=','requestReceived')
        ->whereNotNull('request_date')
        ->whereRaw("DATEDIFF(now(),request_date) >= 5")->get();        
        foreach($reqborrowings as $borr)
        {            
            $borr->changeStatus("newrequest",['request_data'=>null,'lending_status'=>null,'all_lender'=>0,'lending_library_id'=>null]);                
        }
    }
    

    /**
     * Execute the job.
     *
     * @return void
     * 
     * NOTE: this job is called from app\Console\Kernel.php, through the artisan queue command runned by crontab
     */
    public function handle()
    {
        $this->updateCanceledRequests();
        $this->resetNotAcceptedRequests();
    }
}
