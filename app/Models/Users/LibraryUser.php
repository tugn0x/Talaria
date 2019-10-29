<?php

namespace App\Models\Users;

use App\Models\BaseModel;
use App\Models\Libraries\Department;
use App\Models\Users\Title;
use Illuminate\Database\Eloquent\Relations\Pivot;

class LibraryUser extends Pivot
{
    public function department()
    {
        return $this->belongsTo(Department::class);
    }
    public function title()
    {
        return $this->belongsTo(Title::class);
    }
}
