<?php
//NOTA: solo i campi fillable vengono Salvati/inseriti dalle API
//quindi non c'e' problm, al max posso lavorare con i $visible per restituire via JSON
//solo i campi del Borrowi/Lending e non di tutta la tabella DocdelRequest

//NOTA: sembra che getAttributes() restituisca comunque tutti i campi della tabella!!
//=>occorre toglierli a mano???


namespace App\Models\Requests;
use App\Models\Libraries\Tag;
use Carbon\Carbon;
use Auth;


class BorrowingDocdelRequest extends DocdelRequest
{

    private $borrowing_attributes=[
        'docdel_request_parent_id', //id della docdelrequest "padre" (se una rich. viene reinoltrata N volte, tutte le N avranno come parent la rich. originale, in modo da ricostruire lo storico!)
        'patron_docdel_request_id',
        'accept_cost_status', //Stato accettazione utente dopo richiesta: 1=Biblio richiede accettazione, 2=Ute accetta, 3=Ute non accetta
        'accept_cost_date', //quando ha accettato/rifiutato il costo        
        'borrowing_status', //stato rich. borrow
        'trash_date', //data cestinamento
        'trash_type', //tipo cestinamento (trash o trashHC)
        'borrowing_notes', //dd_note_interne      
        'parent_id', //parent dd request id 
        'archived', //0|1 indica se la rich è conclusa e quindi messa in archivio (impostarlo in modo automatico in base allo stato terminale)
        'forward', //0|1 indica se la rich è stata reinoltrata (la rich reinoltrata avrà parent_id=id di questa richiesta)
        //'desk_delivery_format', //formato di invio del della biblio al desk                
        'operator_id',
        'user_license', //(NULL=non impostato, 0=can't send pdf to user, 1=ok can send pdf to user,2=not specified in the lic.)
        'user_cancel_date', //data rich canc da utente  
        'all_lender', //0=no, 1=all library will see this              

    ];
      
    protected static $observerClass=BorrowingDocdelRequestObserver::class;

    protected $statusField="borrowing_status";
    protected $table = 'docdel_requests';    
       
    public function __construct()
    {
        parent::__construct();
        
        $this->fillable=array_merge($this->fillable,$this->borrowing_attributes);        
        $this->visible=array_merge($this->visible,$this->borrowing_attributes);
    }

    public function patrondocdelrequest()
    {
        return $this->belongsTo(PatronDocdelRequest::class,'patron_docdel_request_id')->withTrashed();
    }

    public function tags()
    {
        if($this->borrowinglibrary())
            return $this->belongsToMany(Tag::class,"docdel_request_tag","docdel_request_id","tag_id")->inLibrary($this->borrowinglibrary()->first()->id);
    }
    
    public function library()
    {
        return parent::borrowinglibrary();
    }        

    public function operator()
    {        
        return $this->belongsTo('App\Models\Users\User', 'operator_id');
    }

    public function userAskCancel() {
        $this->user_cancel_date=Carbon::now(); 
        if($this->borrowing_status=="newrequest" /*|| status==requested && (no other possible suppliers has accepted (willsupply) )*/ ){            
            $this->borrowing_status="canceleddirect"; //change status without statusResolver (otherwise i need to call controller!!)
        }
        return $this->save();        
    }

    public function canManage(User $user=null){
        $u = $user ? $user:Auth::user();        
        return 
            $u->can('manage', $this->borrowinglibrary()->first())||
            $u->can('borrow', $this->borrowinglibrary()->first());
    }


    public function scopeArchived($query, $archived)
    {
        return $query->where('archived','=',$archived);
    }


    public function scopeInLibrary($query, $library_id)
    {        
        return $query->where('borrowing_library_id', $library_id);
    }  
    
    
    public function scopeByTags($query, $tagIds){
        return $query->whereHas('tags', function($q) use ($tagIds){
            $arr=explode(',',$tagIds);
            if(sizeof($arr)>0)
                return $q->whereIn('tags.id', $arr);
            return;    
        });        
    }
     
}
