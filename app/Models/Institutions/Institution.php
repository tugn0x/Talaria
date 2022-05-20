<?php

namespace App\Models\Institutions;

use App\Models\BaseModel;
use App\Models\Libraries\Library;
use App\Models\Country;
use App\Traits\Model\ModelPermissionsTrait;

class Institution extends BaseModel
{
    use ModelPermissionsTrait;

    protected $attributes= [
        'status'=>1, //0=waiting approval, 1=valid
    ];

    protected $fillable = [
        'name',
        'institution_type_id',
        'country_id',

        /*info amministrative: TODO REMOVE FROM HERE? */
        'vatnumber',
        'fiscalcode',
        'invoice_header',
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
    
    public function scopebyCountryAndType($query, $country_id=null,$institution_type_id=null) {
        $params=[];
        if($country_id>0)
        {
            $c=['country_id','=',$country_id];
            $params[]=$c;
        }
        if($institution_type_id>0)
        {
            $ins=['institution_type_id','=',$institution_type_id];            
            $params[]=$ins;
        }        
        return $query->where($params);
    }


}
