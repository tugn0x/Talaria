<?php

namespace App\Models\Requests;

class LendingDocdelRequest extends DocdelRequest
{

    private $lending_attributes=[
        'lending_status', //stato rich. borrow
        'lending_notes', //dd_note_interne      
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

}
