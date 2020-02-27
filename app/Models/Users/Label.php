<?php

namespace App\Models\Users;

use App\Models\BaseModel;
use App\Models\References\Reference;

class Label extends BaseModel
{
    protected $fillable=[
        'name',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function references()
    {
        return $this->belongsToMany(Reference::class);
    }
}
