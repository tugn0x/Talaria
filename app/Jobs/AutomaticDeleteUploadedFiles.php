<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Requests\BorrowingDocdelRequest;

class AutomaticDeleteUploadedFiles implements ShouldQueue
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

    private function deleteFileFromArchivedRequests() {        
        //<1 days ago archived request
        $requests=BorrowingDocdelRequest::where('archived','=','1')
        ->whereRaw("DATEDIFF(now(),archived_date) <= 1")->get();        
        foreach($requests as $req)
            $req->deleteFile();
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->deleteFileFromArchivedRequests();
    }
}
