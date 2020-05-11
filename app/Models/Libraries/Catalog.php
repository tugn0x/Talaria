<?php

namespace App\Models\Libraries;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;

/* National Catalog */
class Catalog extends BaseModel
{
    protected $userstamping = false; //didable created_by, updated_by
    public static function bootSoftDeletes() {} //disable deleted_at check
    
    protected $fillable=[
        'name',
        'url', /*opac url*/
        'active'
    ];

    public function libraries()
    {
        return $this->belongsToMany(Library::class);
    }

}
