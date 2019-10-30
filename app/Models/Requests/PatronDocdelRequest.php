<?php

namespace App\Models\Requests;
use App\Models\BaseModel;
use App\Models\Libraries\Library;
use App\Models\Reference;
use App\Models\Users\User;

class PatronDocdelRequest extends BaseModel
{

    protected $fillable = [
        'borrowing_library_id',
        'reference_id',
        'user_id',
        'insert_date', //o usiamo created_at?
        'librarycounter', //rm_countbib: ogni biblio si vede le rich utente partire da 1 usando questo campo
        'status',
        'request_date',
        'fullfill_date',
        'cost_policy', //Politica di Accettazione Costi: 0=Non accetta nessun costo; 1=Accetta qualunque costo; 2=Vuole essere informato 
        'forlibrary_note', //note ute->bib
        'fromlibrary_note', //note bib->ute
        'deleted' //rm_cancella:  Richiesta di cancellazione per ordine DD: 0=NonRichiesta, 1=Richiesta 
        /*'filename', */ //lo mettiamo anche qui x file dato all'utente (se licenza lo consente)?

        //	rm_tempo_consegna_ut  	Tempo totale di consegna: rm_dataeva-rm_datarichie 
        // 	rm_tempo_iniziolav 	 	Tempo per la presa in gestionde da parte della bib: dd_datarichie-rm_datarichie 
        // 	rm_tempo_finelav        Tempo per la consegna del doc ricevuto da parte della bib: rm_dataeva-dd_dataeva     
    ];


    public function reference()
    {
        return $this->belongsTo(Reference::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function docdelrequests()
    {
        return $this->hasMany(DocdelRequest::class);
    }

    public function library()
    {
        return $this->belongsTo(Library::class);
    }

}
