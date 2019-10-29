<?php

namespace App\Models\Libraries;

use App\Models\BaseModel;

class Department extends BaseModel
{
    protected $fillable=[
        'library_id',
        'name'
    ];

    public function library()
    {
        return $this->belongsTo(Library::class);
    }
}
