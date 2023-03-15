<?php

namespace App\Models\Libraries;


use App\Models\BaseModel;
use App\Models\Institutions\Institution;
use App\Models\Projects\Project;
use App\Models\Country;
use App\Models\Currency;
use App\Models\Requests\DocdelRequest;
use App\Models\Users\User;
use App\Models\Requests\PatronDocdelRequest;
use App\Traits\Model\ModelPermissionsTrait;
use Silber\Bouncer\Database\Ability;
use App\Models\Users\Permission;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Query\Expression;
use App\Resolvers\StatusResolver;

class Library extends BaseModel
{
    use ModelPermissionsTrait;
    
    protected $forceDeleting=true; //overrides softdelete => force delete!  
    public static function bootSoftDeletes() {}  

    protected static $observerClass = LibraryObserver::class;


    /*
     * MASS Fillable attributes
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
        'lat',
        'lon',
        'url',
        'opac',
        
        'ill_email',        
        'ill_phone',
        'ill_supply_conditions',
        'ill_imbalance',
        'ill_cost',
        'ill_user_cost',
        'ill_susp_date_start',
        'ill_susp_date_end',  
        'ill_susp_notification_days',

        'currency_id',
        'ill_IFLA_voucher',
        'ill_cost_in_voucher',
                     
        'profile_type', //1-borr, 2-borr+lend                
                          
        
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
        'lat',
        'lon',
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
        'profile_type', //1-borr, 2-borr+lend

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

    //NOT MASS FILLABLE
    protected $guarded=[
        'status',
        'external',
        'registration_date',
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
      'status' => 0 //disabled 
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

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function departments()
    {
        return $this->hasMany(Department::class);
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

    public function identifiers()
    {
        return $this->belongsToMany(Identifier::class)->withPivot('cod');
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

    
    //Tutti i PdC della biblioteca
    public function deliveries() {
        return $this->hasMany(Delivery::class);
    }

    //filter only active (not suspended) libraries
    public function scopeActive($query) {
        return $query->where('status',config("constants.library_status.enabled")); 
    }

    public function scopeLender($query) {
        return $query->where('profile_type',2); //1=borrow, 2=borrow+lender
    }

    public function scopeBorrower($query) {
        return $query->where('profile_type',1); //1=borrow, 2=borrow+lender
    }

    public function scopeBySubject($query,$subjectId) {
        return $query->where('subject_id',$subjectId);        
    }

    public function scopeByCountry($query,$countryId) {
        return $query->where('country_id',$countryId);        
    }

    public function scopeByInstitutionType($query,$institutionTypeId) {
        return $query->whereHas('institution', function ($q) use ($institutionTypeId) {
            $q->where('institution_type_id', '=', $institutionTypeId);            
        });
    }

    public function scopeByIdentifier($query,$identifierTyp,$identifierVal) {
        return $query->whereHas('identifiers', function ($q) use ($identifierTyp,$identifierVal) {
            $q->where('identifier_id', '=', $identifierTyp)->where('cod','=',$identifierVal);           
        });      
    }



 
    public function scopeNearTo($query, $latitude,$longitude,$max_range=null)
    {
        if($max_range && $max_range!="" && $max_range!=null)
        $max_range="<= ".$max_range;

        //TO TEST THIS function
        //return $query->where('id','>',0);
        
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
            cos(radians($latitude)) * cos(radians(lat)) * cos(radians(lon) - radians($longitude))
            +
            sin(radians($latitude)) * sin(radians(lat))
          ) as distance"))->whereRaw("
        6371 * acos(
            cos(radians($latitude)) * cos(radians(lat)) * cos(radians(lon) - radians($longitude))
            +
            sin(radians($latitude)) * sin(radians(lat))
          ) ".$max_range, [
        $longitude,
        $latitude,
        ])->orderBy("distance","asc");    
                
    }

    public function operators($ability=null){               

        /*$users = User::all();      //WARNING: may be slow!!   
        $lib=self::find($this->id);
        $filtered=new Collection();

        if($ability)
        {
            $filtered = $users->filter(function ($user) use ($ability,$lib) 
            {                
                return ($user->can($ability, $lib)||$user->can("manage", $lib))&& ($user->isNotA('super-admin') );
            });        
        }
        return $filtered;*/
        
        $perms=$this->hasManyThrough(Permission::class, Ability::class, 'entity_id')
            ->where('abilities.entity_type', self::class);    
        $perm_ability=$ability?$perms->where('abilities.name',$ability):$perms;
        $operators=User::whereIn('id',$perm_ability->get()->unique('entity_id')->pluck('entity_id'));
        return $operators;
    }

    public function manageOperators() {
        return $this->operators("manage");
    }

    public function changeStatus($newstatus,$others=[]) {
        $sr=new StatusResolver($this);                                

        $sr->changeStatus($newstatus,$others);
        return $this;
    }

     //can disabled only if has no libraries
     public function canBeEnabled() {
        return $this->institution->isActive();
    }

}
