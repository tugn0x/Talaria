<?php

namespace App\Models\Users;

use App\Traits\Auth\RolesAbilitiesPermissionsTrait;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;
use App\Models\Country;
use App\Models\Libraries\Library;

class User extends Authenticatable
{
    use Notifiable,
        HasApiTokens,
        RolesAbilitiesPermissionsTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'name',
        'surname',
        'address',
        'country_id',
        'town', //citta
        'district', //provincia
        'postcode', //cap       
        'state', //Regione o Stato (EmiliaRomagna, Illinois
        'phone',
        'mobile',
        'preflang',            
        'registration_date',
        'privacy_policy_accepted',        
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function labels()
    {
        return $this->hasMany(Label::class);
    }


    public function libraries()
    {
        return $this->belongsToMany(Library::class); /*->withPivot('department_id','title_id'); //ha senso fatta cosi?  */
        
    }      

    /*
    // e queste come le faccio? vorrei ottenere il dipartimento dell'utente associato a quella biblioteca
    public function departments($bibid)
    {
    
    } 
    // e queste come le faccio? vorrei ottenere la qualifica che l'utente si è scelto tra quelle definite dal tipoEnte dell'ente della biblioteca che ha scelto
    public function titles($bibid)
    {
    
    } 
    */


}
