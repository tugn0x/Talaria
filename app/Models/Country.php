<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends BaseModel
{
    protected $userstamping = false;
    public static function bootSoftDeletes() {}
    protected $fillable = [
        'code', //ISO 3166-1
        'name',
    ];
}
