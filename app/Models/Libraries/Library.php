<?php

namespace App\Models\Libraries;


use App\Models\BaseModel;
use App\Models\Institutions\Institution;
use App\Models\Projects\Project;
use App\Models\Country;
use App\Models\Requests\DocdelRequest;
use App\Models\Users\User;
use App\Models\Requests\PatronDocdelRequest;
use App\Traits\Model\ModelPermissionsTrait;

class Library extends BaseModel
{
    use ModelPermissionsTrait;
    protected static $observerClass = LibraryObserver::class;


    /*
     * Fillable attributes
     */
    protected $fillable = [
        'name',    
        'alt_name',    
        'institution_id',
        'subject_id',
        'country_id', //nazione/Paese (IT,US...)

        'address', //indirizzo completo
        'town', //citta
        'district', //provincia
        'postcode', //cap
        'state', //Regione o Stato (EmiliaRomagna, Illinois
        'latitude',
        'longitude',
        'url',
        'opac',
        
        'ill_referent_name',
        'ill_email',        
        'ill_phone',
        'ill_supply_conditions',
        'ill_imbalance',
        'ill_cost',
        'ill_user_cost',
        'ill_susp_date_start',
        'ill_susp_date_end',  
        'ill_susp_notification_days',
             
        'status',
        'profile_type', //1-borr, 2-borr+lend
        'external', //true/false        
        'registration_date',

        /*info administrative */
         'vatnumber',   //MOVE ELSEWHERE ?
         'fiscalcode',   //MOVE ELSEWHERE ?
         'invoice_header',   //MOVE ELSEWHERE ?
         'email_pec',    //MOVE ELSEWHERE ?
         'ccu',           //MOVE ELSEWHERE ?
         'administrative',
         'administrative_email',
         'administrative_phone',
         'terzo_code', /*codice in SIGLA, SOLO gli amminiistrativi lo possono vedere/modificare*/
    ];

    protected $public_fields = [
        'name',        
        'alt_name',
        'institution_id',
        'subject_id',
        'country_id', //nazione/Paese (IT,US...)

        'address', //indirizzo completo
        'town', //citta
        'district', //provincia
        'postcode', //cap
        'state', //Regione o Stato (EmiliaRomagna, Illinois
        'url',
        'opac',

        /*info amministrative */
        'vatnumber',
        'fiscalcode',
        'invoice_header',
        'email_pec',
        'ccu',
        'administrative',
        'administrative_email',
        'administrative_phone',
    ];

    protected $constantFields=['status'];

    /*
     * Accessor & relation to automatically append on model instance
     */
    protected $appends = [
//        'departments'
    ];

    /*
     * Default attributes
     */
    protected $attributes = [
      'name' => '',
      'status' => 0
    ];

    protected $casts = [
      //'name' => 'json'
    ];

    public function institution()
    {
        return $this->belongsTo(Institution::class);
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class);
    }

    public function subject()
    {
      return $this->belongsTo(Subject::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function departments()
    {
        return $this->hasMany(Department::class);
    }

    //return Institution's InstitutionType's titles
    public function titles() 
    {
        return $this->institution->institution_type->titles();
    }

    public function patronddrequests()
    {
        return $this->hasMany(PatronDocdelRequest::class,'borrowing_library_id');
    }

    public function tags()
    {
        return $this->hasMany(Tag::class);
    }

    public function catalogs()
    {
        return $this->belongsToMany(Catalog::class);
    }


    public function borrowingrequests()
    {
        return $this->hasMany(DocdelRequest::class,'borrowing_library_id');
    }

    public function lendingrequests()
    {
        return $this->hasMany(DocdelRequest::class,'lending_library_id');
    }

    public function getPublicFields()
    {
        return $this->public_fields;
    }

    //Rel con il delivery service
    public function delivery()
    {
        return $this->morphOne('App\Models\Libraries\Delivery', 'deliveryable');
    }

    //Tutti i PdC della biblioteca
    public function deliveries() {
        return $this->hasMany(Delivery::class);
    }

    public function scopeNearTo($query, $latitude,$longitude,$max_range=null)
    {
        if($max_range && $max_range!="" && $max_range!=null)
        $max_range="<= ".$max_range;

        //TO TEST THIS function
        return $query->where('id','>',0);
        
        //TODO when we implement lat/lon fields in DB, use one of these methods below:
            
        //mariaDB 10.5.10 (OK support for ST_DISTANCE_SPHERE)
        /*$max_range=is_null($max_range)?15000:$max_range;
        return $query->whereRaw("
        ST_DISTANCE_SPHERE (
            ST_GeomFromText('point(longitude latitude)'),
            ST_GeomFromText('point(? ?)') 
            ) < ".$max_range, [
        $longitude,
        $latitude,
        ]);*/

        
        //MySQL 5.7 o mariaDB <> 10.5.10 (NO support for ST_DISTANCE_SPHERE)
        /*return $query->whereRaw("
        ST_Distance (
            point(longitude,latitude),
            point(?,?) 
            ) ".$max_range, [
        $longitude,
        $latitude,
        ]);*/
        
        //Any Mysql/Maria => Manual "distance" calculation in km (and return also distance from pos)
        return $query->addSelect(new Expression("*,6371 * acos(
            cos(radians($latitude)) * cos(radians(latitude)) * cos(radians(longitude) - radians($longitude))
            +
            sin(radians($latitude)) * sin(radians(latitude))
          ) as distance"))->whereRaw("
        6371 * acos(
            cos(radians($latitude)) * cos(radians(latitude)) * cos(radians(longitude) - radians($longitude))
            +
            sin(radians($latitude)) * sin(radians(latitude))
          ) ".$max_range, [
        $longitude,
        $latitude,
        ])->orderBy("distance","asc");    
                
    }
}
