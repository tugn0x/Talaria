<?php

namespace App\Models\Institutions;

use App\Models\BaseModel;
use App\Traits\Model\ModelPermissionsTrait;

class Consortium extends BaseModel
{
    use ModelPermissionsTrait;
    /*
     * Fillable attributes
     */
    protected $fillable = [
        'name',
    ];

    public function institutions()
    {
        return $this->belongsToMany(Institution::class);
    }
}
