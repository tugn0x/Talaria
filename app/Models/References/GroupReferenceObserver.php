<?php namespace App\Models\References;

use App\Models\BaseObserver;

class GroupReferenceObserver extends BaseObserver
{

    protected $rules = [
        'reference_id' => 'required|integer|exists:references,id',
        'group_id' => 'required|integer|exists:groups,id',
    ];

}
