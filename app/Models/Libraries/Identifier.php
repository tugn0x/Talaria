<?php

namespace App\Models\Libraries;

use App\Models\BaseModel;

class Identifier  extends BaseModel
{
    protected $forceDeleting=true; //overrides softdelete => force delete!  
    protected $userstamping = false; //didable created_by, updated_by    
    public static function bootSoftDeletes() {}
    protected static $observerClass = IdentifierObserver::class;

    protected $fillable=[
        'name',                
    ];

    public function libraries()
    {
        return $this->belongsToMany(Library::class);        
    }
}
