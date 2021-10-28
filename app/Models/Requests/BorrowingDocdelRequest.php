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
use App\Resolvers\StatusResolver;



class BorrowingDocdelRequest extends DocdelRequest
{

    private $borrowing_attributes=[
        'docdel_request_parent_id', //id della docdelrequest "padre" (se una rich. viene reinoltrata N volte, tutte le N avranno come parent la rich. originale, in modo da ricostruire lo storico!)
        'patron_docdel_request_id',
        'accept_cost_status', //Stato accettazione utente dopo richiesta: 1=Biblio richiede accettazione, 2=Ute accetta, 3=Ute non accetta
        'accept_cost_date', //quando ha accettato/rifiutato il costo                
        'trash_date', //data cestinamento
        'trash_type', //tipo cestinamento (trash o trashHC)
        'borrowing_notes', //dd_note_interne      
        'parent_id', //parent dd request id 
        'archived', //0|1 indica se la rich è archiviata
        'forward', //0|1 indica se la rich è stata reinoltrata (la rich reinoltrata avrà parent_id=id di questa richiesta)
        //'desk_delivery_format', //formato di invio del della biblio al desk                
        'operator_id',
        'user_license', //(NULL=non impostato, 0=can't send pdf to user, 1=ok can send pdf to user,2=not specified in the lic.)
        'user_cancel_date', //data rich canc da utente          

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
        $other=["user_cancel_date"=>Carbon::now()]; 

        if($this->borrowing_status=="newrequest"  //new request
        ||($this->borrowing_status=="requested" && $this->lending_status=="requestReceived") ) //requested but no lender accept the request issuing "i will supply" 
            $this->changeStatus("canceledDirect",$other);
        
        else if($this->borrowing_status=="requested") //may have already accepted/not the request
            $this->changeStatus("cancelRequested",$other);                               
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

    public function changeStatus($newstatus,$others=[]) {
            $sr=new StatusResolver($this);                        

            switch ($newstatus)
            {                
                case 'requested': 
                    
                    //all libraries selected
                    if($others["lending_library_id"]==0)
                    {
                        $others["lending_library_id"]=null;
                        $others["all_lender"]=1;
                    }

                    $others=array_merge($others,[
                        'request_date'=>Carbon::now(),
                        'lending_status'=>'requestReceived'
                    ]);
                    break;

                case 'canceled':                    
                    if($this->borrowing_status=="newrequest" && !$this->patrondocdelrequest) //new request without patron
                    {                        
                        $this->forceDelete();
                        return; //return $this->response->item($this, new $this->transformer())->morph();
                    }
                    else if($this->borrowing_status=="newrequest") //new request with patron
                    {
                        $newstatus="canceledDirect";                        
                        return $this->changeStatus($newstatus,$others);                     
                    } 
                    else if($this->lendingLibrary && $this->borrowing_status!="cancelRequested") //cancel with lender
                    {                          
                        $newstatus="cancelRequested";                                                                            
                        return $this->changeStatus($newstatus,$others);                     
                    }
                    else {                        
                        $others=array_merge($others,['cancel_date'=>Carbon::now()]); 
                        $newstatus="canceled";                    
                    }
                    
                    break;
                    
                case 'canceledDirect': 
                    $others=array_merge($others,['cancel_date'=>Carbon::now()]);
                    break;
                /*case 'canceledAccepted': 
                        $others=array_merge($others,['cancel_date'=>Carbon::now()]);
                        break;    
                */
                case 'cancelRequested': 
                    $others=array_merge($others,[
                        'cancel_request_date'=>Carbon::now(),
                        'lending_status'=>'cancelRequested'
                    ]);
                    break;

            }

            $sr->changeStatus($newstatus,$others);
            return $this;
    }
     
}
