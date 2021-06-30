<?php
//NOTA: solo i campi fillable vengono Salvati/inseriti dalle API
//quindi non c'e' problm, al max posso lavorare con i $visible per restituire via JSON
//solo i campi del Borrowi/Lending e non di tutta la tabella DocdelRequest

//NOTA: sembra che getAttributes() restituisca comunque tutti i campi della tabella!!
//=>occorre toglierli a mano???


namespace App\Models\Requests;

class BorrowingDocdelRequest extends DocdelRequest
{

    private $borrowing_attributes=[
        'docdel_request_parent_id', //id della docdelrequest "padre" (se una rich. viene reinoltrata N volte, tutte le N avranno come parent la rich. originale, in modo da ricostruire lo storico!)
        'patron_docdel_request_id',
        'borrowing_status', //stato rich. borrow
        'trash_date', //data cestinamento
        'trash_type', //tipo cestinamento (trash o trashHC)
        'borrowing_notes', //dd_note_interne      
        'parent_id', //parent dd request id 
        'forward', //0|1 indica se la rich è stata reinoltrata (la rich reinoltrata avrà parent_id=id di questa richiesta)
        //'desk_delivery_format', //formato di invio del della biblio al desk                
    ];
      
    protected $statusField="borrowing_status";
    protected $table = 'docdel_requests';
       
    public function __construct()
    {
        parent::__construct();
        
        $this->attributes=[];

        $this->fillable=array_merge($this->fillable,$this->borrowing_attributes);        
        
        $this->visible=array_merge(parent::getVisible(),$this->borrowing_attributes);
    }

    public function patrondocdelrequest()
    {
        return $this->belongsTo(PatronDocdelRequest::class);
    }

    
}
