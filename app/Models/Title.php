<?php

namespace App\Models;

use App\Models\BaseModel;

class Title extends BaseModel
{
    protected $fillable=[      
        'name'
    ];
    
    /*public function institutiontypes()
    {
        return $this->belongsToMany(InstitutionType::class);
    }*/
}
