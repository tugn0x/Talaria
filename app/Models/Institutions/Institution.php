<?php

namespace App\Models\Institutions;

use App\Models\BaseModel;
use App\Models\Libraries\Library;

class Institution extends BaseModel
{

    public function libraries()
    {
        return $this->hasMany(Library::class);
    }

    public function consortia()
    {
        return $this->belongsToMany(Consortium::class);
    }
}
