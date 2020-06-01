<?php

namespace App\Models\Institutions;

use App\Models\Country;
use App\Traits\Model\ModelPermissionsTrait;
use Illuminate\Database\Eloquent\Model;

class Desk extends Model
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

    //TODO valutare se la relazione con Institutions è 1-N o N-N (nel caso creare il model della rel e modificare migration)
}
