<?php

namespace App\Models\Institutions;

use Illuminate\Database\Eloquent\Model;

class Consortium extends Model
{
    public function institutions()
    {
        return $this->belongsToMany(Consortium::class);
    }
}
