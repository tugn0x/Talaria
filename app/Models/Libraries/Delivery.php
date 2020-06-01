<?php

namespace App\Models\Libraries;

use App\Models\BaseModel;
use App\Traits\Model\ModelPermissionsTrait;

class Delivery extends BaseModel
{
    use ModelPermissionsTrait;
    //protected static $observerClass = DeliveryObserver::class;
    //
    protected $fillable = [
        'name',
        'email',
        'phone',
        'openinghours',
        'library_id',
        'deliveryable_id',
        'deliveryable_type',
    ];
    protected $attributes = [];

    //NOTA gestisco il campo "deliveryable come rel polimorfo verso un DESK oppure verso una biblio"

    public function deliveryable()
    {
        return $this->morphTo();
    }

    //library that owns this delivery service
    public function library()
    {
        return $this->belongsTo(Library::class);
    }

    public function scopeInLibrary($query, $library_id)
    {
        return $query->where('library_id',$library_id);
    }
}
