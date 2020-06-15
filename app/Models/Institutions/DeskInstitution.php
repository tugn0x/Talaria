<?php

namespace App\Models\Institutions;

use App\Models\BaseModel;
use App\Models\BaseObserver;

class DeskInstitution extends BaseModel
{
    protected $forceDeleting=true; //overrides softdelete => force delete!  
    protected $userstamping = false;
    public static function bootSoftDeletes() {}
    protected static $observerClass = BaseObserver::class;

    protected $table = 'desk_institution';

    protected $fillable = [
        'institution_id',
        'desk_id'
    ];

    protected $attributes = [
    ];

    public function getOwnerField()
    {
        return 'institution_id';
    }

   
    public function institution()
    {
        return $this->belongsTo(Institution::class);
    }

    public function desk()
    {
        return $this->belongsTo(Desk::class);
    }

    public function scopeInInstitution($query, $institution_id)
    {
        return $query->where('institution_id', $institution_id);
    }
}
