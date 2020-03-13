<?php

namespace App\Models\Users;

use App\Models\BaseModel;
use App\Models\References\Reference;

/* This class rapresents a group of User's References (i.e. bibliography)*/
class Group extends BaseModel
{
    protected $fillable=[
        'name',
    ];

    public function references()
    {
        return $this->hasMany(Reference::class);
    }
}
