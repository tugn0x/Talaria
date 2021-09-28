<?php

namespace App\Models\Libraries;

use App\Models\BaseModel;
use App\Models\Requests\DocdelRequest;

/* This class represents a library's DDRequest tag*/
class Tag extends BaseModel
{

    protected $forceDeleting=true; //overrides softdelete => force delete!  
    protected $userstamping = true;
    public static function bootSoftDeletes() {}
    
    protected $fillable=[
        'library_id',
        'name'
    ];

    public function library()
    {
        return $this->belongsTo(Library::class);
    }

    public function docdelrequests()
    {
        return $this->belongsToMany(DocdelRequest::class,"docdel_request_tag","tag_id","docdel_request_id");
    }

    public function scopeInLibrary($query, $library_id)
    {
        return $query->where('library_id',$library_id);
    }
}
