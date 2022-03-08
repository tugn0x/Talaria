<?php
//- everytime you change this, please run: php artisan cache:clear + php artisan optimize 

return [
    'morphmap' => [
        //        'libraries'     => 'App\Models\Libraries\Library',
        //        'institutions'  => 'App\Models\Institutions\Institution',
        //        'projects'      => 'App\Models\Projects\Project',
        //        'consortia'     => 'App\Models\Institutions\Consortium',
        
        //        'users'         => 'App\Models\Users\User',
    ],
    'status' => [
        'enabled'=>1,
        'disabled'=>0
    ],
    'library_status' => [
        'new' => -1,
	    'new_wait_fax'=>-3, 
	    'enabled'=> 10,
        'renewing'=> 11,
        'enabled_wait_fax' => 12,
        'disabled_no_fax' => 22, //not sent fax
        'disabled_bad'=>20, //suspended for bad behaviour
        'disabled_subscription_expired'=> 21,
	    'disabled_wontpaid' => 23,
	    'disabled'=> 100, //disabled by NILDE manager/admin
    ],
    'libraryuser_status' => [
        'pending'=>2, //NOTA: nel nilde5 questo è 0
        'enabled'=>1,
        'disabled'=>0 //NOTA: nel nilde5 questo è 2
    ],
    'project_status' => [
        'enabled'=>1,
        'disabled'=>0
    ],
    'catalog_status' => [
        'pending'=>2, //NOTA: nel nilde5 questo è 0
        'enabled'=>1,
        'disabled'=>0 //NOTA: nel nilde5 questo è 2
    ],
   /* 'patrondocdelrequest_status' =>[
        'requested'=>20,
        'userAskCancel'=>31,  =>canceled
        'canceled'=>32,
        'waitingForCost'=>21,
        'costAccepted'=>22,
        'costNotAccepted'=>23,
        'readyToDelivery'=>39,
        'received'=>40,
        'fileReceived'=>41, => received
        'notReceived'=>50
    ],*/
    'reference_material_type' => ['article'=>1,'book'=>2,'thesis'=>3,'manuscript'=>5,'cartography'=>4],
    'patrondocdelrequest_cost_policy' => [
        'deny'=>0,
        'accept'=>1,
        'inform'=>2 
    ],
    'patrondocdelrequest_cost_policy_status' => [
        'rejected'=>2,
        'accepted'=>1,
        'notanswer'=>3 
    ],
    'patrondocdelrequest_delivery_format' => [
        'PaperCopy'=>1,
        'PDF'=>2,
        'URL'=>3 
    ],
    'patrondocdelrequest_notfulfill_type' => [
        'notavailable'=>1,
        'usernotenabled'=>2,
        'usernottaken'=>3,
        'userrejectcost'=>4,
        'usernotanswercost'=>5,
        'notfreerlyavail'=>6,
        'wrongmetadata'=>7,
        'baddocument'=>8
    ],
    'borrowingdocdelrequest_fulfill_type'     => [
        'SED'=>1,
        'Mail'=>2,
        'Fax'=>3,
        'URL'=>4,
        'ArticleExchange'=>5,
        'Other'=>6,
    ],
    'borrowingdocdelrequest_notfulfill_type'     => [
        'NotAvailableForILL'=>1,
        'NotHeld'=>2,
        'NotOnShelf'=>3,
        'ILLNotPermittedByLicense'=>4,
        'WrongRef'=>5,
        'MaxReqNumber'=>6,
        'Other'=>7,
    ],
]; 