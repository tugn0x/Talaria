<?php

namespace App\Models\Institutions;

use App\Models\BaseModel;

class InstitutionType extends BaseModel
{
    protected $fillable = [
        'name'
    ];

    public function institutions()
    {
        return $this->hasMany(Institution::class);
    }

    

}
