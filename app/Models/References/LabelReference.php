<?php

namespace App\Models\References;

use App\Models\BaseModel;
use App\Traits\Model\OwnerTrait;
use Illuminate\Database\Eloquent\Relations\Pivot;

class LabelReference extends BaseModel
{
    protected $forceDeleting=true; //overrides softdelete => force delete!  
    protected $userstamping = false;
    public static function bootSoftDeletes() {}
    protected static $observerClass = LabelReferenceObserver::class;

    protected $table = 'label_reference';

    protected $fillable = [
        'reference_id',
        'label_id',
    ];

    protected $attributes = [
    ];

    public function reference()
    {
        return $this->belongsTo(Reference::class,"reference_id");
    }

    public function label()
    {
        return $this->belongsTo(Label::class,"label_id");
    }

    public function scopeInReference($query, $reference_id)
    {
        return $query->where('reference_id', $reference_id);
    }
}
