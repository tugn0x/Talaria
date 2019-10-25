<?php

namespace App\Models\Users;

use App\Models\BaseModel;
use App\Models\Libraries\Library;

class Department extends BaseModel
{
    public function library()
    {
        return $this->belongsTo(Library::class);
    }
}
