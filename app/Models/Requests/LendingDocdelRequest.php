<?php

namespace App\Models\Requests;

class LendingDocdelRequest extends DocdelRequest
{

    private $lending_attributes=[
        'lending_status', //stato rich. borrow
        'lending_notes', //dd_note_interne     
        'lending_archived', //0|1 indica se la rich è archiviata 
    ];

    protected $statusField="lending_status";
    protected $table = 'docdel_requests';

    public function __construct()
    {
        parent::__construct();            

        $this->attributes=[];

        $this->fillable=array_merge($this->fillable,$this->lending_attributes);
        
        $this->visible=array_merge(parent::getVisible(),$this->lending_attributes);        
    }

    //TODO: filtrare solo quelli della lending req
    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }


    public function library()
    {
        return parent::lendinglibrary();
    }    


    public function scopeInLibrary($query, $library_id)
    {        
        return $query->where('lending_library_id', $library_id);
    } 

    public function scopeArchived($query, $archived)
    {
        return $query->where('lending_archived','=',$archived);
    }

}
