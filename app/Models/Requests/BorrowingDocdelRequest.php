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
use App\Models\Libraries\Library;



class BorrowingDocdelRequest extends DocdelRequest
{

    private $borrowing_attributes=[        
        'docdel_request_parent_id', //id della docdelrequest "padre" (se una rich. viene reinoltrata N volte, tutte le N avranno come parent la rich. originale, in modo da ricostruire lo storico!)
        'patron_docdel_request_id',
        'accept_cost_status', //Stato accettazione utente dopo richiesta: 1=Biblio richiede accettazione, 2=Ute accetta, 3=Ute non accetta
        'accept_cost_date', //quando ha accettato/rifiutato il costo                
        'ready_date', //the document is available for download or is just arrived from mail
        'download', //file/url downloaded
        'download_date', //file/url downloaded date
        'forward_date', //date in which i decided to forward the req
        'trash_date', //data cestinamento
        'trash_type', //tipo cestinamento (trash=1,trashHC=2)
        'borrowing_notes', //dd_note_interne              
        'borrowing_protnr', //dd_nprotrichie
        'archived', //0|1 indica se la rich è archiviata
        'archived_date',
        'forward', //0|1 indica se la rich è stata reinoltrata (la rich reinoltrata avrà parent_id=id di questa richiesta)
        'desk_delivery_format', //formato di invio del della biblio al desk  (1=file/2=carta)              
        'desk_received_date', //data ricezione posta al desk
        'desk_delivery_date', //data spedizione posta al desk
        'operator_id',
        'user_license', //(NULL=non impostato, 0=can't send pdf to user, 1=ok can send pdf to user,2=not specified in the lic.)
        'user_cancel_date', //data rich canc da utente (uguale a pdr.cancel_date)         
        'user_delivery_date', //data consegna/nonconsegna a utente
    ];
      
    protected static $observerClass=BorrowingDocdelRequestObserver::class;

    protected $statusField="borrowing_status";
    protected $table = 'docdel_requests';    

    protected $constantFields=['fulfill_type','notfulfill_type'];
       
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

    public function parentRequest()
    {
        return $this->belongsTo(BorrowingDocdelRequest::class,'docdel_request_parent_id');                    
    }

    public function requestHistory()
    {                
        $coll=new \Illuminate\Support\Collection;                                
        if($this->parentRequest!=null)      
        {
            $coll->push($this->parentRequest);
            return $coll->merge($this->parentRequest->requestHistory());                                
        }
        return $coll;
    }

    public function childrenRequests()
    {                
        $coll=new \Illuminate\Support\Collection;                        
        if($this->forward==1)    
        {
            $nextChildren=BorrowingDocdelRequest::where('docdel_request_parent_id',$this->id)->get();  
            if($nextChildren->count()>0)
            {
                foreach ($nextChildren as $child)
                {
                    $coll->push($child);
                    $coll=$coll->merge($child->childrenRequests());                                
                }
            }
        }
        
        return $coll;
    }

    public function tracking() {
        $coll=new \Illuminate\Support\Collection;                        
        $coll=$coll->push($this);
        $coll=$coll->merge($this->requestHistory()); //history in reverse order (from older to current)        
        $coll=$coll->merge($this->childrenRequests()); //all children/subsequent requests 
        return $coll->sortBy('id',SORT_NUMERIC)->values();
    }




    public function tags()
    {
            //filter only borrowing tag
            if($this->borrowinglibrary())
              return $this->belongsToMany(Tag::class,"docdel_request_tag","docdel_request_id","tag_id")->inLibrary($this->borrowinglibrary()->first()->id);
            //return $this->belongsToMany(Tag::class,"docdel_request_tag","docdel_request_id","tag_id");
    }
    
    public function library()
    {
        return parent::borrowinglibrary();
    }        

    public function deskLibraryOperators() {
        $blib=$this->borrowinglibrary;        
        if($blib)
            return $blib->operators("deliver");
    }

    public function operator()
    {        
        return $this->belongsTo('App\Models\Users\User', 'operator_id');
    }

    public function patron() {
        if($this->patrondocdelrequest)
            return $this->patrondocdelrequest->user;
    }

    //called only from patron!
    public function userAskCancel() {
        if($this->patrondocdelrequest) 
        { 
            $other=["user_cancel_date"=>$this->patrondocdelrequest->cancel_date]; 

            if($this->borrowing_status=="newrequest")  //new request
                $this->changeStatus("canceledDirect",$other);
            else if($this->borrowing_status=="requested" && $this->lending_status=="requestReceived")  //requested but no lender accept the request issuing "i will supply" 
                //$this->changeStatus("newrequest",$other); //restart as new request
                $this->changeStatus("canceledDirect",$other);
            
            else if($this->borrowing_status=="requested" /*&& any lending status*/ ) //may have already accepted/not the request
                $this->changeStatus("cancelRequested",$other);                               
        }
    }
    //used only by changeStatus
    public function canBorrow(User $user=null){
        $u = $user ? $user:Auth::user();        
        return 
            $u->can('manage', $this->borrowinglibrary()->first())||
            $u->can('borrow', $this->borrowinglibrary()->first());
    }

    //used only by changeStatus
    //a borrow operator can also deliver
    public function canDeliver(User $user=null){
        $u = $user ? $user:Auth::user();        
        return 
            ($u->can('deliver', $this->borrowinglibrary()->first())
            ||$this->canBorrow($user));             
    }


    public function scopeArchived($query, $archived)
    {
        return $query->where('archived','=',$archived);
    }


    public function scopeInLibrary($query, $library_id)
    {        
        return $query->where('borrowing_library_id', $library_id);
    }

    public function scopeInDelivery($query, $library_id,$deliveryIds=null)
    {        
        if($deliveryIds!=null)
            return $query->where('borrowing_library_id', $library_id)
                   ->where(function ($query) {
                       return $query->where('borrowing_status','deliveringToDesk')->orWhere('borrowing_status','deskReceived');
                    })
                   ->whereHas('patrondocdelrequest', function($q) use ($deliveryIds){
                    //return $q->where('delivery_id', $delivery_id);
                    $arr=explode(',',$deliveryIds);
                    if(sizeof($arr)>0)
                        return $q->whereIn('delivery_id', $arr);                        
                    });  
        else if($deliveryIds==null)    
        {
            $l=Library::findOrFail($library_id);
            $deliveries=$l->deliveries(); //all desks

            return $query->where('borrowing_library_id', $library_id)
            ->where(function ($query) {
                return $query->where('borrowing_status','deliveringToDesk')->orWhere('borrowing_status','deskReceived');
             })
            ->whereHas('patrondocdelrequest', function($q) use ($deliveries){
                return $q->whereIn('delivery_id',$deliveries->pluck('id')->toArray());
            });
        
        }
        
        return;    
    
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
                    else if($this->lendingLibrary && $this->lending_status!="requestReceived" && $this->borrowing_status!="cancelRequested") //cancel with lender
                    {                          
                        $newstatus="cancelRequested";                                                                            
                        return $this->changeStatus($newstatus,$others);                     
                    }
                    //i lender (anche orfani) l'hanno ricevuto ma nessuno ha risposto
                    //=>cancelDirect
                    else if($this->lending_status=="requestReceived" && $this->borrowing_status!="cancelRequested") //cancel with lender/all_lender=1 (wich not will supply)
                    {    
                        //l'utente ha chiesto di cancellare          
                        if($this->patrondocdelrequest && $this->user_cancel_date)
                        {
                            $newstatus="canceledDirect";  
                            $others=array_merge($others,['lending_archived'=>1,'lending_status'=>'canceledAccepted']);
                            return $this->changeStatus($newstatus,$others);                                             
                        }
                        else //borrow vuole cancellare=>reset richiesta come nuova (caso 6a)
                        {
                            $newstatus="newrequest";  
                            $others=array_merge($others,[                                
                                'lending_library_id'=>null,
                                'all_lender'=>0,
                                'lending_status'=>null, 
                                'request_date'=>null,                                
                                'request_note'=>'', 
                            ]);                
                            return $this->changeStatus($newstatus,$others);  
                        }
                    }
                    /*else if($this->borrowing_status=="cancelRequested"||$this->lending_status=="canceledAccepted") //cancel accepted by lender (automatic after 2 days or manually)
                    {
                        $others=array_merge($others,['cancel_date'=>Carbon::now()]); 
                        $newstatus="canceled";                    
                    }*/
                    else {                        
                        $others=array_merge($others,['cancel_date'=>Carbon::now()]); 
                        $newstatus="canceled";                    
                    }
                    
                    break;
                    
                case 'canceledDirect': 
                    $others=array_merge($others,['cancel_date'=>Carbon::now(),'archived'=>1,'lending_status'=>'canceledAccepted','lending_archived'=>1]);
                    break;
                /*case 'canceledAccepted': 
                        $others=array_merge($others,['cancel_date'=>Carbon::now()]);
                        break; */                   
                case 'cancelRequested': 
                    $others=array_merge($others,[
                        'cancel_request_date'=>Carbon::now(),
                        'lending_status'=>'cancelRequested'
                    ]);
                    break;
                case 'newrequest': 
                        if($this->borrowing_status=="requested") {
                            //if requested => reset as new request
                            $others=array_merge($others,[
                                'lending_library_id'=>null,
                                'all_lender'=>0,
                                'lending_status'=>null, 
                                'request_date'=>null,                                
                                'request_note'=>'',                                
                            ]);                            
                        }
                        break;    
                case 'documentReady': 
                case 'documentNotReady': 
                    if($this->borrowing_status=="fulfilled") {                        
                        $others=array_merge($others,[
                            'ready_date'=>Carbon::now()
                        ]);                            
                    }
                    break; 
 
                case 'notReceived':  
                      //new and forwarded previously
                      if($this->borrowing_status=='newrequest' && $this->docdel_request_parent_id<>null)
                      {
                        $others=array_merge($others,[
                            'archived'=>1,                            
                            'fulfill_date'=>Carbon::now(),
                            'notfulfill_type'=>config("constants.borrowingdocdelrequest_notfulfill_type.NotAvailableForILL"),
                            'lending_status'=>null,
                            'all_lender'=>0,
                            'lending_library_id'=>null]);                
                      }
                    break;
                                           
                case 'notDeliveredToUserDirect':                         
                case 'notDeliveredToUser':  
                    //from borrow
                    if($this->borrowing_status=="documentNotReady"||$this->borrowing_status=="notReceived")            
                    { 
                        //update patronrequest                        
                        if($this->patrondocdelrequest)
                        {
                            $this->patrondocdelrequest->fromlibrary_note=$others["fromlibrary_note"];
                            $this->patrondocdelrequest->notfulfill_type=$others["notfulfill_type"]; 
                            $this->patrondocdelrequest->save();
                        }
                    }else if($this->borrowing_status=="deskReceived") {
                         //update patronrequest                        
                         if($this->patrondocdelrequest)
                         {                             
                             $this->patrondocdelrequest->notfulfill_type=config("constants.patrondocdelrequest_notfulfill_type.usernottaken"); //patron non ritira
                             $this->patrondocdelrequest->save();
                         }
                    } else if($this->borrowing_status=="deliveringToDesk") {
                        if($this->patrondocdelrequest)
                         {                             
                             $this->patrondocdelrequest->notfulfill_type=config("constants.patrondocdelrequest_notfulfill_type.lostdocument"); //document lost
                             $this->patrondocdelrequest->save();
                         }
                    }
                    

                    //note: update only borrowing fields (es: fromlibrary_note is for PDR only so i have to remove from $others)                        
                    $others=[
                        'archived'=>1,   
                        'user_delivery_date'=>Carbon::now()                                               
                    ];                                                   
                    
                    break;  
                
                case 'deliveredToUserDirect': 
                    if($this->patrondocdelrequest)
                    {                        
                        //no borrowing, no desk, just direct fullfill with file/url
                        if($this->borrowing_status=="newrequest") 
                        {                       

                            $this->patrondocdelrequest->fromlibrary_note=$others["fromlibrary_note"];                                            
                            
                            if(isset($others["url"])){
                                $this->patrondocdelrequest->url=$others["url"];                                            
                                $this->patrondocdelrequest->delivery_format=config("constants.patrondocdelrequest_delivery_format.URL"); 
                            }
                            else if(isset($others["filehash"])&&isset($others["filename"]))
                            { 
                                $this->patrondocdelrequest->filename=$others["filename"];
                                $this->patrondocdelrequest->filehash=$others["filehash"];
                                $this->patrondocdelrequest->delivery_format=config("constants.patrondocdelrequest_delivery_format.File"); 
                            }
                            
                        }
                        else if($this->borrowing_status=="deskReceived") { //ho stampato la paper e l'ho data all'utente
                            $this->patrondocdelrequest->delivery_format=config("constants.patrondocdelrequest_delivery_format.PaperCopy");    
                        }
                    
                        $this->patrondocdelrequest->save();                    


                    //note: update only borrowing fields (es: fromlibrary_note is for PDR only so i have to remove from $others)                        
                    $others=[
                        'archived'=>1,   
                        'user_delivery_date'=>Carbon::now()                                               
                    ];  
                    
                    } 
                    break;

                case 'deliveredToUser':     
                if($this->patrondocdelrequest) 
                {
                    $this->patrondocdelrequest->fulfill_date=Carbon::now();

                    //from borrow
                    if($this->borrowing_status=="documentReady")            
                    {            
                        if(!$this->patrondocdelrequest->delivery_format || $this->patrondocdelrequest->delivery_format!=config("constants.patrondocdelrequest_delivery_format.PaperCopy")) // NOT (was sent to desk to be printed)                   
                        {
                            //sharing URL/file from borrowing

                            $this->patrondocdelrequest->fromlibrary_note=$others["fromlibrary_note"];                    
                 
                            if($this->fulfill_type==config("constants.borrowingdocdelrequest_fulfill_type.URL"))
                            {
                                $this->patrondocdelrequest->url=$this->url;
                                $this->patrondocdelrequest->delivery_format=config("constants.patrondocdelrequest_delivery_format.URL"); 
                            }
                            else if($this->fulfill_type==config("constants.borrowingdocdelrequest_fulfill_type.SED"))
                            {
                                $this->patrondocdelrequest->filename=$this->filename;                                  
                                $this->patrondocdelrequest->filehash=$this->filehash;                                  
                                $this->patrondocdelrequest->delivery_format=config("constants.patrondocdelrequest_delivery_format.File"); 
                            }
                        }                        
                    }
                    else if($this->borrowing_status=="deskReceived") //from desk 
                    {
                        //nothing to do and no notes
                    }
                }

                $this->patrondocdelrequest->save();

                //note: update only borrowing fields (es: fromlibrary_note is for PDR only so i have to remove from $others)                        
                $others=[
                    'archived'=>1,   
                    'user_delivery_date'=>Carbon::now()                                               
                ];   
                break;   
                
                case 'deskReceived': 
                    if($this->patrondocdelrequest) {
                        
                        $others=array_merge($others,[                                
                            'desk_received_date'=>Carbon::now()                                               
                        ]); 

                        $this->patrondocdelrequest->delivery_format=config("constants.patrondocdelrequest_delivery_format.PaperCopy");                        
                        $this->patrondocdelrequest->status="readyToDelivery";
                        $this->patrondocdelrequest->delivery_ready_date=Carbon::now();
                        $this->patrondocdelrequest->save();                        
                    }
                    
                break;
                
                
                /*Stato transitorio => non cambio in questo stato (quindi resta deliveringToDesk) ma lo uso 
                dal frontend per poter poi andare in notDeliveredtoUser/direct */
                case 'deskNotReceived': 
                      if($this->patrondocdelrequest) 
                      {
                            $this->patrondocdelrequest->notfulfill_type=config("constants.patrondocdelrequest_notfulfill_type.lostdocument"); //document lost by desk!
                            $this->patrondocdelrequest->save();
                            if($this->lendinglibrary)
                                $newstatus="notDeliveredToUser";
                            else
                                $newstatus="notDeliveredToUserDirect";    
                            
                            return $this->changeStatus($newstatus,$others);
                      }                      
                      break;  
                
                case 'deliveringToDesk': 
                    if($this->patrondocdelrequest) {
                        $this->patrondocdelrequest->delivery_format=config("constants.patrondocdelrequest_delivery_format.PaperCopy");
                        $this->patrondocdelrequest->save();

                        $others=array_merge($others,[                                
                            'desk_delivery_date'=>Carbon::now()                                               
                        ]);   
                    }
                    break;
                
                /*case 'forward': 
                    $others=array_merge($others,[
                        'forward'=>1,
                        'archived'=>1,  
                        'borrowing_status'=>$this->borrowing_status  //override status! I don't want to apply "forward" status but keep the old status in the field
                    ]);                       
                    break; */         

            }

            $sr->changeStatus($newstatus,$others);
            return $this;
    }
     
}
