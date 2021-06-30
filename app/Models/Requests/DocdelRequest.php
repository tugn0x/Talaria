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

    private $docdel_attributes=[
        'reference_id',
        'borrowing_library_id',
        'lending_library_id',
        'request_type', //0=DD 1: ILL        
        'request_date', //dd_datarichie Data richiesta alla bib lender
        'request_protnr', //dd_nprotrichie
        'request_note', //dd_note_richforni
        'on_cost', //dd_costofn
        'accept_cost_status', //Stato accettazione utente dopo richiesta: 1=Biblio richiede accettazione, 2=Ute accetta, 3=Ute non accetta
        'accept_cost_date', //quando ha accettato/rifiutato il costo
        'fulfill_date', //dd_dataeva
        'fulfill_protnr', //dd_nproteva
        'fulfill_location', //dd_collocazione (ricavata da ACNP)
        'fulfill_note', //dd_note_fornirich       
        'fullfill_type',    //tipo evasione (=SentiVia/DeliveryMethod ISO18626?)
        'notfullfill_type', //tipo inevasione (prendere da NILDE global_const $DDILL_INEVASO_xxx + "fornitore non disp" + "altro" (con descrizione in borr_notes) )
        'archived', //archived si/no
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
        'updated_by', 
        'deleted_at',
        'deleted_by',        
    ];

    public function __construct()
    {
        parent::__construct();
        
        $this->attributes=$this->docdel_attributes;

        $this->fillable=$this->docdel_attributes;        
        
        $this->visible=array_merge($this->visible,$this->docdel_attributes);
    }

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

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
}
