<?php

namespace App\Models\Libraries;

use App\Models\BaseModel;
use App\Models\BaseObserver;
use App\Models\Users\User;

class DeliveryUser extends BaseModel
{
    protected $forceDeleting=true; //overrides softdelete => force delete!  
    protected $userstamping = false;
    public static function bootSoftDeletes() {}
    protected static $observerClass = BaseObserver::class;

    protected $table = 'delivery_user';

    protected $fillable = [
        'user_id',
        'delivery_id',
    ];

    protected $attributes = [
    ];

    public function getOwnerField()
    {
        return 'user_id';
    }

    public function delivery()
    {
        return $this->belongsTo(Delivery::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeInDelivery($query, $delivery_id)
    {
        return $query->where('delivery_id', $delivery_id);
    }
}
