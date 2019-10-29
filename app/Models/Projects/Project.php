<?php

namespace App\Models\Projects;

use App\Models\BaseModel;
use App\Models\Libraries\Library;

class Project extends BaseModel
{
    protected $fillable = [
        'name',
        'active',
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
        return $this->belongsToMany(Library::class);
    }
}
