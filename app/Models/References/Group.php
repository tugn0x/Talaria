<?php

namespace App\Models\References;

use App\Models\BaseModel;

/* This class rapresents a group of User's References (i.e. bibliography)*/
class Group extends BaseModel
{
    protected $fillable=[
        'name',
    ];

    public function references()
    {
        return $this->belongsToMany(Reference::class);
    }
}
