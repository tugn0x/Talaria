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

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //automatic "accept cancel" for borrowing request in cancelRequested state
        $borrowings=BorrowingDocdelRequest::where('borrowing_status','=','cancelRequested')
        ->whereNotNull('cancel_request_date')
        ->whereRaw("DATEDIFF(now(),cancel_request_date) >= 5")->get();        
        foreach($borrowings as $borr)             
            $borr->changeStatus("canceled",["lending_status"=>"cancelAccepted"]);

        
    }
}
