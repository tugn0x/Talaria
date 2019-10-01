<?php

namespace App\Models\Institutions;

use App\Models\BaseModel;

class Consortium extends BaseModel
{
    public function institutions()
    {
        return $this->belongsToMany(Institution::class);
    }
}
