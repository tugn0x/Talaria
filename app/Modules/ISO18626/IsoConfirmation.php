<?php
namespace App\Modules\ISO18626;

use Carbon\Carbon;
use SimpleXMLElement;

class IsoConfirmation
{
    private $data; 
    private $header;
    private $status;
    private $receivedTimestamp;
    private $type;
    
    public function __construct($xmlObj,$status,$data)
    {
        $this->status=$status;
        
        if($xmlObj->request)
        {
            $this->type="request";
            $this->receivedTimestamp=$xmlObj->request->header->timestamp;
            $this->header=$xmlObj->request->header;
        }
        if($xmlObj->supplyingAgencyMessage)
        {
            $this->type="supplyingAgencyMessage";
            $this->receivedTimestamp=$xmlObj->supplyingAgencyMessage->header->timestamp;
            $this->header=$xmlObj->supplyingAgencyMessage->header;
        }
        if($xmlObj->requestingAgencyMessage)
        {
            $this->type="requestingAgencyMessage";
            $this->receivedTimestamp=$xmlObj->requestingAgencyMessage->header->timestamp;
            $this->header=$xmlObj->requestingAgencyMessage->header;
        }        

    
        $this->data["confirmationHeader"]=[
            "supplyingAgencyId"=>[
                "agencyIdType"=>$this->header->supplyingAgencyId->agencyIdType,
                "agencyIdValue"=>$this->header->supplyingAgencyId->agencyIdValue],
            "requestingAgencyId"=>[
                "agencyIdType"=>$this->header->requestingAgencyId->agencyIdType,
                "agencyIdValue"=>$this->header->requestingAgencyId->agencyIdValue],
            "multipleItemRequestId"=>$this->header->multipleItemRequestId,
            "requestingAgencyRequestId"=>$this->header->requestingAgencyRequestId,
            "supplyingAgencyRequestId"=>$this->header->supplyingAgencyRequestId,
            "requestingAgencyAuthentication"=>$this->header->requestingAgencyAuthentication,
            "timestamp"=>Carbon::now()->toJSON(),
            "timestampReceived"=>$this->receivedTimestamp,
            "messageStatus"=>$this->status,
        ];

        if ($xmlObj->supplyingAgencyMessage && $xmlObj->supplyingAgencyMessage->messageInfo)
            $this->data["confirmationHeader"]["reasonForMessage"]=$xmlObj->supplyingAgencyMessage->messageInfo->reasonForMessage;
        if ($xmlObj->requestingAgencyMessage && $xmlObj->requestingAgencyMessage->messageInfo)
            $this->data["confirmationHeader"]["reasonForMessage"]=$xmlObj->requestingAgencyMessage->messageInfo->reasonForMessage;    
        
        $this->data=array_merge($this->data,$data);
    }

    private function array2xml($xmlObj,$data) {
        foreach ($data as $key => $value) {
            if (is_array($value)) {
                $new_object = $xmlObj->addChild($key);
                $this->array2xml($new_object, $value);
            } else {
                // if the key is an integer, it needs text with it to actually work.
                if ($key == (int) $key) {
                    $key = "$key";
                }
    
                $xmlObj->addChild($key, $value);
            }   
        }   
    }

    public function toXML()
    {
        $xmlObj = new SimpleXMLElement('<ISO18626Message ill:version="1.0" xmlns="http://illtransactions.org/2013/iso18626" xmlns:ill="http://illtransactions.org/2013/iso18626" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://illtransactions.org/2013/iso18626 http://illtransactions.org/schemas/ISO-18626-v1_2.xsd"></ISO18626Message>');
        $reqConf=$xmlObj->addChild($this->type."Confirmation");
        $this->array2xml($reqConf,$this->data);
        return $xmlObj->asXML();
    }

}