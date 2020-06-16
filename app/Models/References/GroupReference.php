<?php

namespace App\Models\References;

use App\Models\BaseModel;
use App\Traits\Model\OwnerTrait;
use Illuminate\Database\Eloquent\Relations\Pivot;

class GroupReference extends BaseModel
{
    protected $forceDeleting=true; //overrides softdelete => force delete!  
    protected $userstamping = false;
    public static function bootSoftDeletes() {}
    protected static $observerClass = GroupReferenceObserver::class;

    protected $table = 'group_reference';

    protected $fillable = [
        'reference_id',
        'group_id',
    ];

    protected $attributes = [
    ];

    public function reference()
    {
        return $this->belongsTo(Reference::class,"reference_id");
    }

    public function group()
    {
        return $this->belongsTo(Group::class,"group_id");
    }

    public function scopeInReference($query, $reference_id)
    {
        return $query->where('reference_id', $reference_id);
    }
}
