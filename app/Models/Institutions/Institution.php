<?php

namespace App\Models\Institutions;

use App\Models\BaseModel;
use App\Models\Libraries\Library;

class Institution extends BaseModel
{
    protected $fillable = [
        'name',
        'institution_type_id',
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
}
