<?php

namespace App\Models\Libraries;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;

class IdentifierLibrary extends BaseModel
{
    protected $forceDeleting=true; //overrides softdelete => force delete!  
    protected $userstamping = false;
    public static function bootSoftDeletes() {}
    protected static $observerClass = IdentifierLibraryObserver::class;

    protected $fillable=[
        'library_id',            
        'identifier_id',
        'cod',        
    ];

    protected $table = 'identifier_library';

    public function library()
    {
        return $this->belongsTo(Library::class);
    }

    public function identifier()
    {
        return $this->belongsTo(Identifier::class);
    }
    
    public function scopeInLibrary($query, $library_id)
    {
        return $query->where('library_id', $library_id);
    }
}
