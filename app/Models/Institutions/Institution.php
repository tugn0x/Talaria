<?php

namespace App\Models\Libraries;

use Illuminate\Database\Eloquent\Model;

class Institution extends Model
{

    public function libraries()
    {
        return $this->hasMany(Library::class);
    }
}
