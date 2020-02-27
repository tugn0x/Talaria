<?php

namespace App\Models\Requests;
use App\Models\BaseModel;
use App\Models\Libraries\Library;
use App\Models\References\Reference;

class DocdelRequest extends BaseModel
{
    protected $fillable=[
        'docdel_request_parent_id', //id della docdelrequest "padre" (se una rich. viene reinoltrata N volte, tutte le N avranno come parent la rich. originale, in modo da ricostruire lo storico!)
        'reference_id',
        'patron_docdel_request_id',
        'borrowing_library_id',
        'lending_library_id',
        'request_type', //0=DD 1: ILL
        'request_date', //dd_datarichie
        'request_protnr', //dd_nprotrichie
        'request_note', //dd_note_richforni
        'on_cost', //dd_costofn
        'accept_user_status', //Stato accettazione utente dopo richiesta: 1=Biblio richiede accettazione, 2=Ute accetta, 3=Ute non accetta
        'fullfill_date', //dd_dataeva
        'fullfill_protnr', //dd_nproteva
        'fullfill_location', //dd_collocazione (ricavata da ACNP)
        'fullfill_note', //dd_note_richforni
        'process_status', //dd_stato_borr
        'request_status', //dd_stato_dd_ill
        'filename',
        'file_status', //Stato del file se inviato in NILDE: 0-non disponibile; 1-disponibile; 2-disponibile con HC
        'file_download', // 	Indicatore di avvenuta stampa del file se inviato in NILDE: 0-Non Stampato; 1-Stampato
        'cancelrequest_date', //dd_richiesta_annullamento
        'fullfill_inventorynr', //dd_ninventario_forni
        'note', //dd_note_interne

        //npg-> tolto
        //nopereva-> tolto
        //dd_tempo_medio_giacenza:  tempo medio giacenza in s (calcolato per i report)
        //dd_rifiutato->tolto
        //dd_lastmodify

    ];


    public function reference()
    {
        return $this->belongsTo(Reference::class);
    }

    public function patrondocdelrequest()
    {
        return $this->belongsTo(PatronDocdelRequest::class);
    }

    public function borrowinglibrary()
    {
        return $this->belongsTo(Library::class);
    }

    public function lendinglibrary()
    {
        return $this->belongsTo(Library::class);
    }
}
