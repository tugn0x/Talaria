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
        'note',
        //'oa', Gestione copia OA
    ];

    protected $constantFields=['material_type'];

    public function patronddrequests()
    {
        return $this->hasMany(PatronDocdelRequest::class,'reference_id');
    }

    public function activepatronddrequests()
    {
        return $this->patronddrequests()
        ->where("status",'<>',config("constants.patrondocdelrequest_status.received"))
        ->where("status",'<>',config("constants.patrondocdelrequest_status.fileReceived"))
        ->where("status",'<>',config("constants.patrondocdelrequest_status.notReceived"))
        ->where("status",'<>',config("constants.patrondocdelrequest_status.canceled"))
        ->count();
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
