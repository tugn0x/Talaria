<?php

namespace App\Models\Users;

use App\Models\BaseModel;
use App\Models\References\Reference;
use Illuminate\Database\Eloquent\Model;
use Silber\Bouncer\Database\Ability;

class Permission extends Model
{
    protected $table = 'permissions';

    public function ability()
    {
        return $this->belongsTo(Ability::class);
    }
}
