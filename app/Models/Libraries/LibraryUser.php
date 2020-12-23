<?php

namespace App\Models\Libraries;

use App\Models\BaseModel;
use App\Models\Libraries\Department;
use App\Models\Libraries\Library;
use App\Models\Users\Title;
use App\Models\Users\User;
use App\Models\Libraries\LibraryUserObserver;
use App\Traits\Model\OwnerTrait;
use Illuminate\Database\Eloquent\Relations\Pivot;

//class LibraryUser extends Pivot
class LibraryUser extends BaseModel
{
    protected $forceDeleting=true; //overrides softdelete => force delete!  
    protected $userstamping = false;
    public static function bootSoftDeletes() {}    
    protected static $observerClass = LibraryUserObserver::class;

    protected $table = 'library_user';

    protected $fillable = [
        'user_id',
        'library_id',
        'department_id',
        'title_id',
        'status',
        'user_referent',
        'user_mat',
        'user_service_phone',
        'user_service_email',
        'preferred',
        'label'
    ];

    protected $attributes = [
        'status' => 0
    ];

    protected $constantFields=['status'];

    public function getOwnerField()
    {
        return 'user_id';
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function library()
    {
        return $this->belongsTo(Library::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function title()
    {
        return $this->belongsTo(Title::class);
    }

    public function scopeInStatus($query, $status)
    {
        return $query->where('library_user.status', $status);
    }

    public function scopeInLibrary($query, $library_id)
    {
        return $query->where('library_id', $library_id);
    }
}
