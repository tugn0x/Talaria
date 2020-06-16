<?php namespace App\Models\References;

use App\Models\BaseObserver;

class LabelReferenceObserver extends BaseObserver
{

    protected $rules = [
        'reference_id' => 'required|integer|exists:references,id',
        'label_id' => 'required|integer|exists:labels,id',
    ];

}
