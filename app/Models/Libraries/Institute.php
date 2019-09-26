<?php

namespace App\Models\Libraries;

use Illuminate\Database\Eloquent\Model;

class Institute extends Model
{

    public function libraries()
    {
        return $this->hasMany(Library::class);
    }
}
