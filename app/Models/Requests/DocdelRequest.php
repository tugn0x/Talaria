<?php

namespace App\Models\Requests;
use App\Models\BaseModel;
use App\Models\Libraries\Library;
use App\Models\Libraries\Tag;
use App\Models\References\Reference;

//TODO: CHECK against LibraryCloud Excel file
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
        'request_date', //dd_datarichie Data richiesta alla bib lender
        'request_protnr', //dd_nprotrichie
        'request_note', //dd_note_richforni
        'on_cost', //dd_costofn
        'fulfill_date', //dd_dataeva (for both fulfil/notfulfill)
        'fulfill_protnr', //dd_nproteva borrow
        'fulfill_location', //dd_collocazione (ricavata da ACNP)
        'fulfill_note', //dd_note_fornirich       
        'fulfill_type',    //tipo evasione (=SentiVia/DeliveryMethod ISO18626: ArticleExchange,Ariel,Email,Mail,Odyssey,URL,FTP) + file + url?
	    'notfulfill_type', //tipo inevasione (prendere da NILDE global_const $DDILL_INEVASO_xxx + "fornitore non disp" + "altro" (con descrizione in borr_notes) )        
        'filename',
        'filehash',
        //'file_id', //TODO & CHECK
        'file_status', //File status: 0-not available; 1-available; 2-available and converted by HC server
        'cancel_request_date', //data richiesta annullamento alla lender
        'cancel_date', //data accettazione richiesta annullamento da lender
        'fulfill_inventorynr', //dd_ninventario_forni        
        'all_lender', //0=no, 1=all lending library will see this request, 2=some lending libraries will see this request        
        'url',        

        
        //TODO
        //'request_protocol', //0: NILDE, 1: ISO18626 .. (se impostato a 1 avro' dati rich ISO in altra tabella)
        

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
