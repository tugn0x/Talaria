<?php

namespace App\Models\Institutions;

use App\Models\BaseModel;

class Consortium extends BaseModel
{
    /*
     * Fillable attributes
     */
    protected $fillable = [
        'name',
        'email',
    ];

    public function institutions()
    {
        return $this->belongsToMany(Institution::class);
    }
}
