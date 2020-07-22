<?php

namespace App\Models\Institutions;

use App\Models\BaseModel;
use App\Models\Country;
use App\Traits\Model\ModelPermissionsTrait;
use Illuminate\Database\Eloquent\Model;

class Desk extends BaseModel
{
    use ModelPermissionsTrait;
    
    protected $fillable = [
        'name',
        'country_id', //nazione/Paese (IT,US...)
        'address', //indirizzo completo
        'town', //citta
        'district', //provincia
        'postcode', //cap
        'state', //Regione o Stato (EmiliaRomagna, Illinois
    ];
    protected $attributes = [];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    //Rel con il delivery service
    public function delivery()
    {
        return $this->morphOne('App\Models\Libraries\Delivery', 'deliveryable');
    }

    public function institutions()
    {
        return $this->belongsToMany(Institution::class);
    }
}
