<?php
namespace App\Modules\ISO18626;

use DOMDocument;
use SimpleXMLElement;

class IsoMessage
{
    private $xmlObj; //simpleXMLElement

    private $xmlstring;

    private $valid;

    private $XSDSchema=__DIR__."/ISO-18626.xsd";

    private $xmlErrors;

    private $data; //array ottenuto dal parsing dell'xml

    public function __construct($xmlcont)
    {
        if($xmlcont && $xmlcont!="")
            $this->loadXML($xmlcont);
    }

    //load xml and validate it
    public function loadXML($xmlcont) {
        $this->xmlstring=$xmlcont;

        $this->xmlErrors=[];

        $this->valid=false;

        if($this->xmlstring)
        {
            $this->xmlObj=new SimpleXMLElement($this->xmlstring);
            
            $this->validate();
            if($this->valid)
            {
                $json = json_encode($this->xmlObj);
                $this->data=json_decode($json,TRUE);
            }
        }     
    }

    public function loadData($dataArray) {
        $this->data=$dataArray;
    }

    public function getData(){
        return $this->data;
    }

    public function getXMLObj() {
        return $this->xmlObj;
    }

    private function libxmlErrors()
    {
        $errors = libxml_get_errors();
        $result    = [];
        foreach ($errors as $error) {
            /*$errorString="";
            $errorString = "Error $error->code in $error->file (Line:{$error->line}):";
            $errorString .= trim($error->message);*/
            $myerr=array("code"=>$error->code, "file"=>$error->file,"line"=>$error->line,"message"=>$error->message);
            $result[] = $myerr;
        }
        libxml_clear_errors();
        return $result;
    }

    //Validate XML against XSD
    //Uso DOMDocument perchè la SimpleXMLElement non supporta l'XSD
    private function validate()
    {
        if($this->xmlstring!=null)
        {
            if (!file_exists($this->XSDSchema)) {
                throw new \Exception('Schema is Missing, Please add schema to feedSchema property');
                return false;
            }

            $xmlDOM=new DOMDocument('1.0','utf-8');
            $xmlDOM->loadXML($this->xmlstring, LIBXML_NOBLANKS);
            
            
            libxml_use_internal_errors(true);
            
            if (!$xmlDOM->schemaValidate($this->XSDSchema)) {
                $this->xmlErrors = $this->libxmlErrors();
                $this->valid=false;
            } 
            else {
            //The file is valid
               $this->valid=true;
            }
        }
        return $this->valid;
    }

    public function isValid() {return $this->valid;}

    public function hasError(){
        return sizeof($this->xmlErrors)>0;
    }

    public function errors() {
        return $this->xmlErrors;
    }

    public function okConfirmation() {
        return new IsoConfirmation($this->xmlObj,'OK',[]);
    }

    //NB: al momento non gestisco l'errore su singolo campo/valore
    public function errorConfirmation(){
        if(!$this->valid)
        {
            //dd($this->errors());
            $errorData=[
                "errorData" => [
                    "errorType"=>"BadlyFormedMessage"]
            ];
            /*
                <xs:enumeration value="UnrecognisedDataElement"/>
                <xs:enumeration value="UnrecognisedDataValue"/>
    
                <errorData>
                <errorType>UnrecognisedDataElement</errorType>
                <errorValue>AgencyIdTypezzzz</errorValue>
                </errorData>

                            <errorData>
                <errorType>UnrecognisedDataValue</errorType>
                <errorValue>AgencyIdType/ISILL</errorValue>
                </errorData>
            */ 

            //Specific errors
            if($this->xmlObj->requestingAgencyMessage)
            {
                $req_action=$this->xmlObj->requestingAgencyMessage->action;

                if($req_action!="StatusRequest" && 
                $req_action!="Received" && 
                $req_action!="Cancel" && 
                $req_action!="Renew" && 
                $req_action!="ShippedReturn" && 
                $req_action!="ShippedForward" &&
                $req_action!="Notification")
                
                $errorData=[
                    "errorData" => [
                        "errorType"=>"UnsupportedActionType",
                        "errorValue"=>$req_action
                        ]

                    ];
            }

            if($this->xmlObj->supplyingAgencyMessage)
            {
                $mess_reason=$this->xmlObj->supplyingAgencyMessage->messageInfo->reasonForMessage;
                if($mess_reason!="RequestResponse" && 
                        $mess_reason!="StatusRequestResponse" && 
                        $mess_reason!="RenewResponse" && 
                        $mess_reason!="CancelResponse" && 
                        $mess_reason!="StatusChange" && 
                        $mess_reason!="Notification")
                        
                    $errorData=[
                        "errorData" => [
                            "errorType"=>"UnsupportedReasonForMessageType",
                            "errorValue"=>$mess_reason
                            ]
        
                    ];
            }
            
        $errConf=new IsoConfirmation($this->xmlObj,'ERROR',$errorData);
        return $errConf;
        }
    }

    public function isRequest() {
        return isset($this->xmlObj->request);
    }

    public function isSupplyingAgencyMessage()
    {
        return isset($this->xmlObj->supplyingAgencyMessage);
    }

    public function isRequestingAgencyMessage()
    {
        return isset($this->xmlObj->requestingAgencyMessage);
    }

    /*public function toArray() { 
        return $this->domToArray($this->xmlDOM); 
    }

    public function domToArray($node)
    {
        $array = [];

    
        if ($node->hasAttributes())
        {
            foreach ($node->attributes as $attr)
            {
                $array[$attr->nodeName] = $attr->nodeValue;
            }
        }
    
        if ($node->hasChildNodes())
        {
            if ($node->childNodes->length == 1)
            {
                $array[$node->firstChild->nodeName] = $node->firstChild->nodeValue;
            }
            else
            {
                foreach ($node->childNodes as $childNode)
                {
                    if ($childNode->nodeType != XML_TEXT_NODE)
                    {
                        $array[$childNode->nodeName][] = $this->domToArray($childNode);
                    }
                }
            }
        }
    
        return $array;
    }*/

    public function toArray()
    {
        $xml = simplexml_load_string($this->xmlstring, "SimpleXMLElement", LIBXML_NOCDATA);
        $json = json_encode($xml);
        $array = json_decode($json,TRUE);
        return $array;
    }
}