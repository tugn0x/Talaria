<?php

namespace App\Models\Users;

use App\Models\BaseModel;
use App\Models\Libraries\Library;

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
