<?php

namespace App\Models\References;

use App\Models\BaseModel;
use App\Models\References\ReferenceObserver;
use App\Models\Requests\DocdelRequest;
use App\Models\Requests\PatronDocdelRequest;

class Reference extends BaseModel
{
    protected static $observerClass = ReferenceObserver::class;

    protected $simpleSearchField="pub_title";

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
        'status',
        'note'
    ];

    public function patronddrequests()
    {
        return $this->hasMany(PatronDocdelRequest::class,'reference_id');
    }

    public function libraryddrequests()
    {
        return $this->hasMany(DocdelRequest::class,'reference_id');
    }

    public function labels()
    {
        return $this->belongsToMany(Label::class);
    }

    public function groups()
    {
        return $this->belongsToMany(Group::class);
    }

    public function user()
    {
        return $this->owner();
    }

    public function scopeByLabel($query, $labelId){
        return $query->whereHas('labels', function($q) use ($labelId){
            $q->where('labels.id', $labelId);
        });
    }

    public function scopeByGroup($query, $groupId){
        return $query->whereHas('groups', function($q) use ($groupId){
            $q->where('groups.id', $groupId);
        });
    }
}
