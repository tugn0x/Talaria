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
        'email',
        'institution_id',
        'subject_id',
        'country_id', //nazione/Paese (IT,US...)

        'address', //indirizzo completo
        'town', //citta
        'district', //provincia
        'postcode', //cap
        'state', //Regione o Stato (EmiliaRomagna, Illinois
        'phone',
        'fax',
        'url',
        'opac',
        'isil_code',
        'dd_email',
        'ill_email',
        'dd_phone',
        'ill_phone',
        'dd_supply_conditions',
        'dd_imbalance',
        'dd_cost',
        'dd_user_cost',
        'susp_date_start',
        'susp_date_end',
        'susp_notice_days',
        'ill_cost',
        'ill_user_cost',
        'status',
        'nilde',
        'rank',
        'registration_date',


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

    protected $public_fields = [
        'name',
        'email',
        'institution_id',
        'subject_id',
        'country_id', //nazione/Paese (IT,US...)

        'address', //indirizzo completo
        'town', //citta
        'district', //provincia
        'postcode', //cap
        'state', //Regione o Stato (EmiliaRomagna, Illinois
        'phone',
        'fax',
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
      'name' => 'json'
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
}
