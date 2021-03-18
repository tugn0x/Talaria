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
        'authors', //pub author
        'part_authors', //part authors
        'relator',
        'thesis_type',
        'degree_course',
        'series_title',
        'geographic_area',
        'pubyear',
        'volume',
        'issue',
        //'page_start',
        //'page_end',
        'pages',
        'abstract',
        'doi',
        'issn',
        'acnp_cod',
        'sbn_docid',
        'publisher',
        'publishing_place',
        'isbn',
        'sid',
        'pmid',
        'status',
        'note',
        'oa_link',
    ];

    protected $constantFields=['material_type'];

    public function patronddrequests()
    {
        return $this->hasMany(PatronDocdelRequest::class,'reference_id');
    }

    public function activepatronddrequests()
    {
        return $this->patronddrequests()
        ->where("status",'<>','received')        
        ->where("status",'<>','notReceived')
        ->where("status",'<>','canceled');
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

    public function scopeByLabel($query, $labelIds){
        return $query->whereHas('labels', function($q) use ($labelIds){
            $arr=explode(',',$labelIds);
            if(sizeof($arr)>0)
                $q->whereIn('labels.id', $arr);
        });
    }

    public function scopeByGroup($query, $groupIds){
        return $query->whereHas('groups', function($q) use ($groupIds){
            $arr=explode(',',$groupIds);
            if(sizeof($arr)>0)
                $q->whereIn('groups.id', $arr);
        });
    }
}
