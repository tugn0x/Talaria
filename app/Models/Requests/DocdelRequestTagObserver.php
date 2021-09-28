<?php namespace App\Models\Requests;

use App\Models\BaseObserver;

class DocdelRequestTagObserver extends BaseObserver
{

    protected $rules = [
        'docdel_request_id' => 'required|integer|exists:docdel_requests,id',
        'tag_id' => 'required|integer|exists:tags,id',
    ];

}
