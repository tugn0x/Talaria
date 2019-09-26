<?php

namespace App\Models\Projects;

use App\Models\Libraries\Library;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    public function libraries()
    {
        return $this->belongsToMany(Library::class);
    }
}
