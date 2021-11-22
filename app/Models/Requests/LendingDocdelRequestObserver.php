<?php namespace App\Models\Requests;

use App\Models\BaseObserver;
use \Auth;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class LendingDocdelRequestObserver extends BaseObserver
{

    protected $rules = [
        'lending_library_id' => 'nullable|integer|exists:libraries,id',
        'reference_id' => 'required|integer|exists:references,id',              
    ];
}
