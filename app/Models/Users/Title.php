<?php

namespace App\Models\Users;

use App\Models\BaseModel;
use App\Models\Institutions\InstitutionType;

class Title extends BaseModel
{
    protected $fillable=[      
        'name'
    ];
    
    public function institutiontypes()
    {
        return $this->belongsToMany(InstitutionType::class);
    }
}
