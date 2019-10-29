<?php

namespace App\Models\Institutions;

use App\Models\BaseModel;
use App\Models\Libraries\Library;
use App\Models\Country;

class Institution extends BaseModel
{
    protected $fillable = [
        'name',
        'institution_type_id',
        'country_id',
        
        /*info amministrative */
        'vatnumber',
        'fiscalcode',
        'invoice_note',
        'email_pec',
        'ccu',
        'administrative',
        'administrative_email',
        'administrative_phone',
        'terzo_code', /*codice in SIGLA, SOLO gli amminiistrativi lo possono vedere/modificare*/
    ];

    public function libraries()
    {
        return $this->hasMany(Library::class);
    }

    public function consortia()
    {
        return $this->belongsToMany(Consortium::class);
    }

    public function institution_type()
    {
        return $this->belongsTo(InstitutionType::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }
}
