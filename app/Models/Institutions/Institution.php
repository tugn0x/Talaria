<?php

namespace App\Models\Institutions;

use App\Models\BaseModel;
use App\Models\Libraries\Library;
use App\Models\Country;
use App\Resolvers\StatusResolver;
use App\Traits\Model\ModelPermissionsTrait;
use App\Models\Users\User;
use Silber\Bouncer\Database\Ability;
use App\Models\Users\Permission;


class Institution extends BaseModel
{
    use ModelPermissionsTrait;
    
    protected static $observerClass = InstitutionObserver::class;

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

     //filter only active (not suspended) libraries
     public function scopeActive($query) {
        return $query->where('status','=',config("constants.institution_status.enabled")); 
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

    public function isActive() {
        return $this->status==config("constants.institution_status.enabled"); 
    }

    //can disabled only if has no libraries
    public function canBeDisabled() {
        return count($this->libraries)==0;
    }




}
