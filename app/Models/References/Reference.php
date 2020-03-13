<?php

namespace App\Models\References;

use App\Models\BaseModel;
use App\Models\References\ReferenceObserver;
use App\Models\Requests\DocdelRequest;
use App\Models\Requests\PatronDocdelRequest;
use App\Models\Users\Label;
use App\Models\Users\Group;

class Reference extends BaseModel
{
    protected static $observerClass = ReferenceObserver::class;

    protected $fillable = [
        'material_type',
        'pub_title',
        'part_title',
        'first_author',
        'last_author',
        'pubyear',
        'volume',
        'issue',
        'page_start',
        'page_end',
        'abstract',
        'doi',
        'issn',
        'publisher',
        'publishing_place',
        'isbn',
        'sid',
        'pmid',
        'group_id'
    ];

    public function patronddrequest()
    {
        return $this->hasOne(PatronDocdelRequest::class);
    }

    public function libraryddrequest()
    {
        return $this->hasMany(DocdelRequest::class);
    }

    public function labels()
    {
        return $this->belongsToMany(Label::class);
    }

    public function group()
    {
        return $this->belongsTo(Group::class);
    }
}
