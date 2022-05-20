<?php

namespace App\Models\Libraries;

use App\Models\BaseModel;
use App\Models\Users\User;
use App\Traits\Model\ModelPermissionsTrait;
use App\Models\Country;

//Rappresenta il PuntoDiConsegna (PdC)
class Delivery extends BaseModel
{
    use ModelPermissionsTrait;
    protected $fillable = [
        'name',
        'email',
        'phone',
        'openinghours',
        'library_id',        
        'description',        
        'country_id', //nazione/Paese (IT,US...)
        'address',
        'town', 
        'district',
        'postcode',
        'state', 
    ];
    protected $attributes = [
        'status' => 0  //per il momento non è gestito
    ];

   

    //library that owns this delivery service
    public function library()
    {
        return $this->belongsTo(Library::class);
    }

     //country
     public function country()
     {
         return $this->belongsTo(Country::class);
     }
 

    public function scopeInLibrary($query, $library_id)
    {
        return $query->where('library_id',$library_id);
    }    

}
