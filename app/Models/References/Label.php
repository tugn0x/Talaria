<?php

namespace App\Models\References;

use App\Models\BaseModel;

class Label extends BaseModel
{
    protected $forceDeleting=true; //overrides softdelete => force delete!  
    protected $userstamping = true;
    public static function bootSoftDeletes() {}
    
    protected $fillable=[
        'name',
    ];
   
    public function references()
    {
        return $this->belongsToMany(Reference::class);
    }
}
