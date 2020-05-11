<?php

namespace App\Models\Libraries;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;

class CatalogLibrary extends BaseModel
{
    protected $forceDeleting=true; //overrides softdelete => force delete!  
    protected $userstamping = false;
    public static function bootSoftDeletes() {}
    protected static $observerClass = CatalogLibraryObserver::class;

    protected $table = 'catalog_library';

    protected $fillable=[
        'library_id',            
        'catalog_id',
        'cod',
        'status',
    ];

    /*public function getOwnerFiled()
    {
        return 'library_id';
    }*/

    public function library()
    {
        return $this->belongsTo(Library::class);
    }

    public function catalog()
    {
        return $this->belongsTo(Catalog::class);
    }
    
    public function scopeInLibrary($query, $library_id)
    {
        return $query->where('library_id', $library_id);
    }
}
