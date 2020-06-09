<?php

namespace App\Models\References;

use App\Models\BaseModel;

class Label extends BaseModel
{
    protected $fillable=[
        'name',
    ];
   
    public function references()
    {
        return $this->belongsToMany(Reference::class);
    }
}
