<?php

namespace App\Models\Institutions;

use App\Models\Libraries\Library;
use Illuminate\Database\Eloquent\Model;

class Institution extends Model
{

    public function libraries()
    {
        return $this->hasMany(Library::class);
    }

    public function institution_consortia()
    {
        return $this->belongsToMany(Consortium::class);
    }
}
