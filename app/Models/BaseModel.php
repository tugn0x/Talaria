<?php namespace App\Models;

use App\Traits\Model\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model {
    use ModelTrait;

    protected $fillable = [];
    protected $guarded = [];
    protected $attributes = [];
    protected $casts = [];
    protected $dates = [];
    protected $appends = [];
    protected $hidden = [];
//    protected static $observerClass = null;
}
