<?php

namespace App\Models\Users;

use App\Models\BaseModel;
use App\Models\Institutions\InstitutionType;

class Title extends BaseModel
{
    public function institutiontypes()
    {
        return $this->belongsToMany(InstitutionType::class);
    }
}
