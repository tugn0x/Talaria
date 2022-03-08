<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Requests\BorrowingDocdelRequest;
use Carbon\Carbon;

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

    private function archiveAsNotReceivedNewForwardedRequests() {        
        $reqborrowings=BorrowingDocdelRequest::where('borrowing_status','=','newrequest')
        ->where('docdel_request_parent_id','<>','null')
        ->where('patron_docdel_request_id','=','null')
        ->where('archived','<>','1')
        ->whereRaw("DATEDIFF(now(),created_at) >= 15")->get();        
        foreach($reqborrowings as $borr)
        {   
            //change to notReceived & archived with reason "NotAvailableForILL"         
            $borr->changeStatus("notReceived",['archived'=>1,'fulfill_date'=>Carbon::now(),'notfulfill_type'=>config("constants.borrowingdocdelrequest_notfulfill_type.NotAvailableForILL"),'lending_status'=>null,'all_lender'=>0,'lending_library_id'=>null]);                
        }
    }

    private function archiveAsReceivedRequests() {        
        $reqborrowings=BorrowingDocdelRequest::where('borrowing_status','=','documentReady')
        ->where('docdel_request_parent_id','<>','null')
        ->where('patron_docdel_request_id','=','null')
        ->where('archived','<>','1')
        ->whereRaw("DATEDIFF(now(),created_at) >= 15")->get();        
        foreach($reqborrowings as $borr)
        {   
            //change to notReceived & archived with reason "NotAvailableForILL"         
            $borr->changeStatus("documentReady",['archived'=>1,'fulfill_date'=>Carbon::now(),'notfulfill_type'=>config("constants.borrowingdocdelrequest_notfulfill_type.NotAvailableForILL"),'lending_status'=>null,'all_lender'=>0,'lending_library_id'=>null]);                
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
        $this->archiveAsNotReceivedNewForwardedRequests();
        $this->archiveAsReceivedRequests();
    }
}
