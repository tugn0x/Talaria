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
        'request_type', //0=DD 1: ILL        
        'request_date', //dd_datarichie Data richiesta alla bib lender
        'request_protnr', //dd_nprotrichie
        'request_note', //dd_note_richforni
        'on_cost', //dd_costofn
        'fulfill_date', //dd_dataeva
        'fulfill_protnr', //dd_nproteva
        'fulfill_location', //dd_collocazione (ricavata da ACNP)
        'fulfill_note', //dd_note_fornirich       
        'fullfill_type',    //tipo evasione (=SentiVia/DeliveryMethod ISO18626?)
        'notfullfill_type', //tipo inevasione (prendere da NILDE global_const $DDILL_INEVASO_xxx + "fornitore non disp" + "altro" (con descrizione in borr_notes) )        
        'filename',
        'file_status', //Stato del file se inviato in NILDE: 0-non disponibile; 1-disponibile; 2-disponibile con HC
        'file_download', // 	Indicatore di avvenuta stampa del file se inviato in NILDE: 0-Non Stampato; 1-Stampato
        'cancel_request_date', //data richiesta annullamento
        'cancel_date', //data accettazione richiesta annullamento
        'fulfill_inventorynr', //dd_ninventario_forni        
        
        //TODO
        //'delivery_format', //diverso da fullfill_type? formato di invio del della biblioF alla biblioR
        //'request_multiple', //0- no, 1-inviata a N fornitori, 2-inviata a tutti  (x rich orfane)         
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

    public function lendinglibrary()
    {
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
