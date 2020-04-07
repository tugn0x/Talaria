<?php

namespace App\Models\Requests;
use App\Models\BaseModel;
use App\Models\Libraries\Library;
use App\Models\References\Reference;
use App\Models\Users\User;

/*NOTA: la patronReq è necessaria
altrimenti non posso reinoltrare le richDD
in questo modo l'utente ne vede 1 ma la bib ne vede N
di cui, quelle che vengono reinoltrate hanno fw=1 e le altre hanno il parent
impostato in modo da poter risalire
alla principale (utile x history)
ovviam quella conclusiva e che evaderà/inevaderà a ute
sarà l'ultima che 
andrà anche ad aggiornare lo stato della patron dell'utente
Ovviamente quelle che hanno fw=1 vengono nascoste dall'interfaccia (xke' di fatto si sono concluse) ma sono visibili attraverso la history delle altre rich e ovviamente vengono contate come normali richieste
*/

/* NB: in questa classe non c'e' il user_id in quanto usiamo il campo created_by*/
class PatronDocdelRequest extends BaseModel
{
    protected $fillable = [
        'borrowing_library_id', //id biblioteca alla quale ho inviato la rich.
        'reference_id',
        //'user_id', //usiamo create_by
        'librarycounter', //rm_countbib: ogni biblio si vede le rich utente partire da 1 usando questo campo
        'status',
        'request_date',
        'cancel_request_date', //data rich. cancellazione
        'cancel_date', //data accettaz. cancellazione
        'fullfill_date',
        'cost_policy', //Politica di Accettazione Costi: 0=Non accetta nessun costo; 1=Accetta qualunque costo; 2=Vuole essere informato
        'forlibrary_note', //note ute->bib
        'fromlibrary_note', //note bib->ute
        'archived', //rich archiviata o no
        
        // TODO definire prima il model Desk + DeliveryService + InstitutionDesk relation 
        //delivery_service_id', //servizio di consegna della biblioteca

        // DA VALUTARE
        // filename  //lo mettiamo anche qui x file dato all'utente (se licenza lo consente)?
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
        return $this->hasMany(DocdelRequest::class,'patron_docdel_request_id','id');
    }

    public function library()
    {
        return $this->belongsTo(Library::class,'borrowing_library_id');
    }

}
