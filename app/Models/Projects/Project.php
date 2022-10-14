<?php

namespace App\Models\Projects;

use App\Models\BaseModel;
use App\Models\Libraries\Library;
use App\Traits\Model\ModelPermissionsTrait;
use App\Models\Users\User;
use Silber\Bouncer\Database\Ability;
use App\Models\Users\Permission;

class Project extends BaseModel
{
    use ModelPermissionsTrait;

    protected static $observerClass=ProjectObserver::class;


    protected $fillable = [
        'name',
        'active',
         /*info amministrative */
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
        return $this->belongsToMany(Library::class);
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
}
