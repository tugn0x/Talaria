<?php

namespace App\Models\Libraries;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    public function libraries()
    {
        return $this->belongsToMany(Library::class);
    }
}
