<?php

namespace App\Models\Institutions;

use App\Models\BaseModel;
use App\Models\Users\Title;

class InstitutionType extends BaseModel
{
    protected static $observerClass=InstitutionTypeObserver::class;


    protected $fillable = [
        'name'
    ];


    public function institutions()
    {
        return $this->hasMany(Institution::class);
    }

    public function titles()
    {
        return $this->belongsToMany(Title::class);
    }

    

}
