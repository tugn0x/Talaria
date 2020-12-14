<?php

namespace App\Http\Controllers;

use App\Models\References\Reference;
use App\Models\Requests\DocdelRequest;
use App\Modules\ISO18626\IsoMessage;
use Carbon\Carbon;
use Illuminate\Http\Request;

//NOTA: per il momento questo controller è brutale
//ed esegue il parsing di una rich ISO18626 e prova a registrare i dati
//sul db in base al tipo di rich che mi è arrivata

//OVVIAMENTE NON e' completo ed in futuro è meglio spostare questa logica
//altrove (forse in un metodo del model DocDelRequest una volta sicuri sull'implementazione
//del FN via iso18626)
class ISO18626Controller extends Controller
{
    public function __construct()
    {
    }

    public function parse(Request $request)
    {
        $isoreq=new IsoMessage($request->getContent());
        
        if($isoreq->isValid()) 
        {
            $dataArr=$isoreq->getData();
            if(isset($dataArr["request"])||isset($dataArr["supplyingAgencyMessage"])||isset($dataArr["requestingAgencyMessage"]))
            {
                if($isoreq->isRequest())
                {
                    //TEST: provo a creare una DocDelRequest partendo 
                    //dai dati che leggo via iso18626

                   $bibinfo=$dataArr["request"]["bibliographicInfo"];
                   $reftype=1; //article
                   if(isset($dataArr["request"]["publicationInfo"]["publicationType"]))
                   {
                       switch($dataArr["request"]["publicationInfo"]["publicationType"])
                       {
                           case 'Article': 
                           case 'Journal': 
                           case 'ConferenceProc': 
                           case 'Patent':  $reftype=1; break;

                           case 'Book': 
                           case 'Chapter': $reftype=2; break;

                           case 'Thesis': $reftype=3; break;

                           default: $reftype=1;
                       }
                   }
                    
                    $borrowing_library=1; //NOTA: dovrei mapparla a partire dal RequestingAgencyId(ovvero cod isil...)
                    
                    //pages
                    $pagestart='';
                    $pageend='';
                    if(isset($bibinfo["pagesRequested"]))
                        list($pagestart,$pageend,$other)=explode("-",$bibinfo["pagesRequested"]);

                    //author
                    $author=isset($bibinfo["author"])?$bibinfo["author"]:'';
                    /*$authorc=isset($bibinfo["authorOfComponent"])?$bibinfo["authorOfComponent"]:'';
                    if($author!="" && $authorc!="") $author.=',';
                    $author.=$authorc;
                    */

                    $pubyear='';
                    if(isset($dataArr["request"]["publicationInfo"]["publicationDate"]))
                        $pubyear=Carbon::createFromFormat('Y-m-d H:i:s',$dataArr["request"]["publicationInfo"]["publicationDate"])->format('Y');
               

                    $ref=Reference::create([
                        'material_type'=>$reftype,
                        'pub_title'=>isset($bibinfo["title"])?$bibinfo["title"]:'',
                        'part_title'=>isset($bibinfo["titleOfComponent"])?$bibinfo["titleOfComponent"]:'',
                        'volume'=>isset($bibinfo["volume"])?$bibinfo["volume"]:'',
                        'issue'=>isset($bibinfo["issue"])?$bibinfo["issue"]:'',
                        'pubyear'=> $pubyear, 
                        'pages'=>$pagestart,
                        'page_end'=>$pageend,
                        'authors'=>$author,
                        ]);

                    $ref->save();
                    $refid=$ref->id;
    
                    $ddreq=DocdelRequest::create([
                        'reference_id'=>$refid,
                        'borrowing_library_id'=>$borrowing_library, 
                        'request_type'=>0, //DD
                        'request_protnr'=>isset($dataArr["request"]["header"]["requestingAgencyRequestId"])?$dataArr["request"]["header"]["requestingAgencyRequestId"]:null,
                    ]);

                    $ddreq->save();
                
                }
                else if($isoreq->isRequestingAgencyMessage())
                {
                    //TODO
                }
                else if($isoreq->isSupplyingAgencyMessage())
                {
                    //TODO
                }

                
                //then send confirmation
                return $isoreq->okConfirmation()->toXML();
            }
            
        }
        else {
            return $isoreq->errorConfirmation()->toXML();
        }
    
    }


}
