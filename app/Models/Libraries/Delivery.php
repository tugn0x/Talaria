<?php

namespace App\Models\Libraries;

use App\Models\BaseModel;
use App\Models\Users\User;
use App\Traits\Model\ModelPermissionsTrait;

//Rappresenta il PuntoDiConsegna (PdC)
//Ho usato una rel 1-n polimorfa perchè il PdC puo' essere associato a una Biblio o a un Desk (dell'ente della Biblio o di altri enti)
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
        'status',  //per il momento non è gestito
    ];
    protected $attributes = [
        'status' => 0
    ];

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

    //gli utenti che gestiscono i PdC
    public function users()
    {
        return $this->belongsToMany('App\Models\Users\User','delivery_user')->withTimestamps(); 
    }
}
