<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Currency extends BaseModel
{
    protected $userstamping = false;
    public static function bootSoftDeletes() {}
    protected $fillable = [
        'code', //ISO 4217
        'symbol',
    ];
}
