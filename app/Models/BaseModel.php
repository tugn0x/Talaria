<?php namespace App\Models;

use App\Traits\Model\ModelTrait;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Model\StatusResolverTrait;

class BaseModel extends Model {
    use ModelTrait;
    use StatusResolverTrait; 

    protected $fillable = [];
    protected $guarded = [];
    protected $attributes = [];
    protected $casts = [];
    protected $dates = [];
    protected $appends = [];
    protected $hidden = [];
//    protected static $observerClass = null;
}
