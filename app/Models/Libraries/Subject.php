<?php

namespace App\Models\Libraries;

use App\Models\BaseModel;
use App\Traits\Model\ModelPermissionsTrait;

class Subject extends BaseModel
{
    protected $fillable = [
        'name'
    ];

    public function libraries()
    {
        return $this->hasMany(Library::class);
    }

}
