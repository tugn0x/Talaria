<?php

return [
    'status' => [
        'enabled'=>1,
        'disabled'=>0
    ],
    'library_status' => [
        'new' => -1,
	    'new_wait_fax'=>-3, 
        /*'migrated'=> -2 non credo serva più*/ 
	    /*$BIBLIO_ABILITATA_FROM3TO4 = 1;*/
	    'enabled'=> 10,
        'renewing'=> 11,
        'enabled_wait_fax'=>12,
        'disabled_no_fax' => 22, /*not sent fax*/
        'disabled_bad'=>20, /*suspended for bad behaviour*/
        'disabled_subscription_expired'=> 21,
	    'disabled_wontpaid' => 23,
	    'disabled'=> 100, /*disabled by NILDE manager/admin*/
    ],
    'patron_status' => [
        'pending'=>0,
        'enabled'=>1,
        'disabled'=>2
    ],
    'project_status' => [
        'enabled'=>1,
        'disabled'=>0
    ]

];
