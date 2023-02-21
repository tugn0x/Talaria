<?php

namespace App\Models\Institutions;

use App\Models\BaseModel;

class InstitutionType extends BaseModel
{
    protected static $observerClass=InstitutionTypeObserver::class;
    protected $forceDeleting=true; //overrides softdelete => force delete!  
    public static function bootSoftDeletes() {}  


    protected $fillable = [
        'name'
    ];


    public function institutions()
    {
        return $this->hasMany(Institution::class);
    }
    

}
