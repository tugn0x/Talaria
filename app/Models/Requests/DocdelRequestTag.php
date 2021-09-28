<?php

namespace App\Models\Requests;

use App\Models\BaseModel;
use App\Models\Libraries\Tag;
use App\Traits\Model\OwnerTrait;
use Illuminate\Database\Eloquent\Relations\Pivot;

class DocdelRequestTag extends BaseModel
{
    protected $forceDeleting=true; //overrides softdelete => force delete!  
    protected $userstamping = false;
    public static function bootSoftDeletes() {}
    protected static $observerClass = DocdelRequestTagObserver::class;

    protected $table = 'docdel_request_tag';

    protected $fillable = [
        'docdel_request_id',
        'tag_id',
    ];

    protected $attributes = [
    ];


    public function __construct()
    {
        parent::__construct();
    }

    public function docdelrequest()
    {
        return $this->belongsTo(DocdelRequest::class,'docdel_request_id');
    }

    public function tag()
    {
        return $this->belongsTo(Tag::class,'tag_id');
    }

    public function scopeInDocdelRequest($query, $request_id)
    {
        return $query->where('docdel_request_id', $request_id);
    }

    public function scopeInTag($query, $tag_id)
    {
        return $query->where('tag_id', $tag_id);
    }
}
