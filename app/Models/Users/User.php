<?php

namespace App\Models\Users;

use App\Traits\Auth\RolesAbilitiesPermissionsTrait;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;
use App\Models\Country;
use App\Models\Libraries\Library;
use App\Models\Requests\PatronDocdelRequest;

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
        'surname',
        'email',
        'password',

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

    public function patronddrequests()
    {
        return $this->hasMany(PatronDocdelRequest::class);
    }

    public function oauth_social_providers()
    {
        return $this->hasMany(OauthSocialProvider::class);
    }

    //nota: chiamando questo metodo sull'utente, mi trovo i dati della sua bibliolteca + dipartimento + title
    public function libraries()
    {
        //return $this->belongsToMany(Library::class)->withPivot('department_id','title_id')->withTimestamps(); //assieme alla biblioteca prendo anche dipartimento e title (solo gli id) e timestamps

        //in questo modo ottengo anche i model di depatment/title!
        //ci accedo come $myuser2->libraries->first()->pivot->department
        return $this->belongsToMany(Library::class)
            ->using(LibraryUser::class)
            ->withPivot('department_id','title_id')
            ->withTimestamps(); //assieme alla biblioteca prendo anche dipartimento e title e timestamps
    }
}
