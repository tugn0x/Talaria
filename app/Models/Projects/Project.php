<?php

namespace App\Models\Projects;

use App\Models\BaseModel;
use App\Models\Libraries\Library;

class Project extends BaseModel
{
    protected $fillable = [
        'name',
        'active'        
    ];

    public function libraries()
    {
        return $this->belongsToMany(Library::class);
    }
}
