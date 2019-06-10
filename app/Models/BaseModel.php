<?php namespace App\Models;

use App\Traits\Model\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model {
    use ModelTrait;

    protected $fillable = [];
    protected $attributes = [];
    protected $casts = [];
    protected $dates = [];
    protected $appends = [];
//    protected static $observerClass = null;
}
