<?php

namespace App\Models\Projects;

use App\Models\BaseModel;
use App\Models\Libraries\Library;
use App\Traits\Model\ModelPermissionsTrait;

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
}
