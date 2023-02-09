<?php

namespace App\Models\Requests;
use App\Models\BaseModel;
use App\Models\Libraries\Library;
use App\Models\Libraries\Tag;
use App\Models\References\Reference;

class DocdelRequest extends BaseModel
{
    protected $table = 'docdel_requests';
    
    protected $simpleSearchField="pub_title"; //ricerca sul riferimento

    protected $fillable=[
        'reference_id',
        'borrowing_library_id',
        'lending_library_id',  
        'lending_archived', //inherited: this is defined also here in order to be changed by borrowingdocdelrequest too and not only by lendingdocdelrequest
        'lending_archived_date', //inherited: this is defined also here in order to be changed by borrowingdocdelrequest too and not only by lendingdocdelrequest                      
        'borrowing_status', //status req. borrow
        'lending_status', //status req. lending
        'request_type', //0=DD 1: ILL        
        'request_date', 
        'request_note', 
        'request_special_delivery', //special delivery for blind people
        'request_pdf_editorial', //want original PDF (not OA)
        'on_cost', //outside network ILL cost
        'fulfill_date', 
        'fulfill_location', 
        'fulfill_note', 
        'fulfill_type',    //tipo evasione 
	    'notfulfill_type', //tipo inevasione 
        'filename',
        'filehash',
        //'file_id', //TODO & CHECK
        'file_status', //File status: 0-not available; 1-available; 2-available and converted by HC server
        'cancel_request_date', //data richiesta annullamento alla lender
        'cancel_date', //data accettazione richiesta annullamento da lender
        'fulfill_inventorynr',        
        'all_lender', //0=no, 1=all lending library will see this request, 2=some lending libraries will see this request        
        'url',        

        
        

        //npg-> tolto
        //nopereva-> tolto
        //dd_tempo_medio_giacenza:  tempo medio giacenza in s (calcolato per i report)
        //dd_rifiutato->tolto
        //dd_lastmodify
    ];

    protected $visible=[               
        'id',
        'created_at',
        'updated_at',        
    ];

    public function __construct()
    {
        parent::__construct();
        
        //$this->attributes=$this->docdel_attributes;

        //$this->fillable=$this->docdel_attributes;        
        
        $this->visible=array_merge($this->visible,$this->fillable);
    }

    //NOTE: the reference is also setted by PatronDocdelRequest when created,
    //so reference will alwais EXISTS both for PatrondocdelRequest and BorrowingDocdelRequest
    public function reference()
    {
        return $this->belongsTo(Reference::class)->withTrashed();
    }

    public function borrowinglibrary()
    {
        return $this->belongsTo(Library::class,'borrowing_library_id');
    }

    public function borrowingLibraryOperators() {
        $blib=$this->borrowinglibrary;        
        if($blib)
            return $blib->operators("borrow");
    }

    public function lendingLibraryOperators() {
        $blib=$this->lendinglibrary;        
        if($blib)
            return $blib->operators("lend");
    }

    public function lendinglibrary() //can not get library borrowing name!!
    {
        //return $this->belongsTo(Library::class,'borrowing_library_id'); 
        return $this->belongsTo(Library::class,'lending_library_id'); 
    } 
    
    
    
    public function scopeInReference($query, $reference_id)
    {
        return $query->where('reference_id', $reference_id);
    }
 

     //override del ModelTrait::scopeSimpleSearch
    //in modo da cercare sul riferimento!
    public function scopeSimpleSearch($query, $q)
    {
        $text = trim($q);
        return $query->whereHas('reference', function ($query2) use ($text) {
                $query2->where($this->simpleSearchField, 'like', '%'. $text .'%');
        });
    }
}
