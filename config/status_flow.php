<?php
//NOTES:
//- status "name" must be less than 20 char lenght!
//- role/constraint are not defined, so averyone can call these statusChange
   //otherwise was too difficult to filter these methods
//- everytime you change this, please run: php artisan cache:clear + php artisan optimize 

return [
    'status_resolver' =>
        [
            'App\Models\Requests\PatronDocdelRequest'=> [

                'flow_tree' => [
                    'requested'	=> [
                        'role'  =>  ['patron'],
                        'next_statuses'  =>  ['canceled','received','waitingForCost','notReceived','readyToDelivery'],
                        'constraints'   =>  ['isOwner'],
                        /*'notify'    =>  [   //Notify is managed directly in patronrequest created observer method
                            'Model'=>'libraryOperators',                               
                        ],*/
                        'jobs'=>[]
                    ],                   
                    'canceled'	=> [
                        'role'  =>  ['patron'],
                        'next_statuses'  =>  [],
                        'constraints'   =>  ['isOwner'],                        
                        'jobs' => ['App\\Jobs\\PatronUpdateBorrowing']
                    ],
                    'waitingForCost' => [
                        'role'  =>  [], 
                        'next_statuses'  =>  ['costAccepted','costNotAccepted','costNotAnswered'],
                        'constraints'   =>  ['isOwner'],
                        'notify'    =>  [
                            'Model'=>'owner',
                        ],
                        'jobs'=>[]
                    ],
                    'costAccepted' => [
                        'role'  =>  ['patron'],
                        'next_statuses'  =>  ['received','notReceived','readyToDelivery'],
                        'constraints'   =>  ['isOwner'],
                        'notify'    =>  [
                            'Model'=>'owner',                            
                        ],
                        'jobs' => ['App\\Jobs\\PatronUpdateBorrowing']
                    ],
                    'costNotAccepted' => [
                        'role'  =>  ['patron'],
                        'next_statuses'  =>  ['notReceived'],
                        'constraints'   =>  ['isOwner'],
                        'notify'    =>  [
                            'Model'=>'owner',                            
                        ],
                        'jobs' => ['App\\Jobs\\PatronUpdateBorrowing']
                    ],
                    'costNotAnswered' => [
                        'role'  =>  [],
                        'next_statuses'  =>  ['costAccepted','notReceived'],
                        'constraints'   =>  ['isOwner'],
                        'notify'    =>  [
                            'Model'=>'owner',
                        ],
                        'jobs'=>[]
                    ],
                    'readyToDelivery'	=> [
                        'role'  =>  [],
                        'next_statuses'  =>  ['received','notReceived'],
                        'constraints'   =>  ['isOwner'],
                        'notify'    =>  [
                            'Model'=>'owner',
                        ],
                        'jobs'=>[]
                        
                    ],
                    'received'	=> [
                        'role'  =>  [],
                        'next_statuses'  =>  [],
                       // 'constraints'   =>  ['isOwner'],
                        'notify'    =>  [
                            'Model'=>'owner',
                        ],
                        'jobs'=>[]
                        
                    ],
                    'notReceived'	=> [
                        'role'  =>  [],
                        'next_statuses'  =>  [],
                        //'constraints'   =>  ['isOwner'],
                        'notify'    =>  [
                            'Model'=>'owner',
                        ],
                        'jobs'=>[]
                       
                    ],   
                    /*'userAskCancel'	=> [
                        'role'  =>  ['patron'],
                        'next_statuses'  =>  ['Canceled','received','waitingForCost','notReceived','readyToDelivery'],
                        'constraints'   =>  ['isOwner'],
                    ],*/                
                ],
            ],
            'App\Models\Requests\BorrowingDocdelRequest'=> [
                'flow_tree' => [
                    'newrequest'	=> [
                        'role'  =>  [],
                    'next_statuses'  =>  ['canceled','canceledDirect','requested','notDeliveredToUserDirect','notReceived','deliveredToUserDirect','deskReceived','deliveringToDesk'],
                        'constraints'   =>  [],                        
                        'notify'    =>  [
                            'Model'=>'borrowingLibraryOperators',                            
                        ],  
                        //TODO: 'jobs'=>['App\\Jobs\\BorrowingRequestReset'] //clean all temp lender to start new request and update lender (if only 1) saying request was canceled
                    ],                   
                    'canceled'	=> [
                        'role'  =>  [],
                        'next_statuses'  =>  [],
                        'constraints'   =>  [],  
                        'notify'    =>  [
                            'Model'=>'borrowingLibraryOperators',                            
                        ],  
                        'jobs' => ['App\\Jobs\\LendingRequestUpdateNotify']
                    ],
                    //NOTE on canceledDirect: i removed constraint because this status can be changed both from patron or borrower                       
                    'canceledDirect'	=> [
                        'role'  =>  [],
                        'next_statuses'  =>  [],
                        'constraints'   =>  [],     
                        'notify'    =>  [
                            'Model'=>'borrowingLibraryOperators',
                        ],                                              
                        'jobs' => ['App\\Jobs\\LendingRequestUpdateNotify'] 
                    ],
                    //NOTE on cancelRequested: i removed constraint because this status can be changed both from patron or borrower                       
                    'cancelRequested'	=> [
                        'role'  =>  [],
                        'next_statuses'  =>  ['canceled'],
                        'constraints'   =>  [],  
                        'notify'    =>  [
                            'Model'=>'borrowingLibraryOperators',
                        ],  
                        'jobs' => ['App\\Jobs\\LendingRequestUpdateNotify']
                    ],
                    /*'canceledAccepted'	=> [
                        'role'  =>  [],//borrow/lend/manage?,
                        'next_statuses'  =>  ['canceled'],
                        'constraints'   =>  [],  
                        'notify'    =>  [
                            'Model'=>'borrowingLibraryOperators',                            
                        ],                        
                    ],*/

                    //Note: i added also "canceled" next status, because from frontend 
                    //we need to change in "canceled" (from requested state) but we don't know what will be really the next status (cancelDirect,cancelRequested)
                    'requested'	=> [
                        'role'  =>  [],
                        'next_statuses'  =>  ['newrequest','canceled','canceledDirect','cancelRequested','fulfilled','notReceived'], 
                        'constraints'   =>  ["canBorrow"],  
                        'notify'    =>  [
                            'Model'=>'borrowingLibraryOperators',                                                        
                        ],  
                        'jobs' => ['App\\Jobs\\LendingRequestUpdateNotify']
                    ],
                    //this configuration is needed by status resolver to exists because it checks when do status change FROM this state
                    //but it will not change TO this state cause is instead the lender that change directly borrowing_status field without doing a borrow->changeStatus
                    'fulfilled'	=> [
                        'role'  =>  [],
                        'next_statuses'  =>  ['documentReady','documentNotReady'], 
                        'constraints'   =>  ["canBorrow"],                                                   
                    ],                    
                    'documentReady'	=> [ 
                        'role'  =>  [],
                        'next_statuses'  =>  ['deliveredToUser','notDeliveredToUser','deskReceived','deliveringToDesk'], 
                        'constraints'   =>  ["canBorrow"],  
                        'notify'    =>  [
                            'Model'=>'borrowingLibraryOperators',                                                        
                        ],                          
                        'jobs' => ['App\\Jobs\\BorrowingUpdatePatronRequest']
                    ],                    
                    'documentNotReady'	=> [ 
                        'role'  =>  [],
                        'next_statuses'  =>  ['notDeliveredToUser'], 
                        'constraints'   =>  ["canBorrow"],  
                        'notify'    =>  [
                            'Model'=>'borrowingLibraryOperators',                                                        
                        ],                          
                        'jobs' => ['App\\Jobs\\BorrowingUpdatePatronRequest']
                    ],
                    //this configuration is needed by status resolver to exists because it checks when do status change FROM this state
                    //and because it's used just in the case of a new request (but with parent) that must be set as notReceived+archived
                    //also the lender will change that directly without doing a borrow->changeStatus
                    'notReceived'	=> [ 
                        'role'  =>  [],
                        'next_statuses'  =>  ['notDeliveredToUser'], 
                        'constraints'   =>  ["canBorrow"],                                                   
                        'notify'    =>  [
                            'Model'=>'borrowingLibraryOperators',                                                        
                        ],  
                        'jobs' => ['App\\Jobs\\BorrowingUpdatePatronRequest']
                    ],                    
                    'notDeliveredToUserDirect' => [
                        'role'  =>  [],
                        'next_statuses'  =>  [''], 
                        'constraints'   =>  ["canDeliver"],
                        'notify'    =>  [
                            'Model'=>'borrowingLibraryOperators',                                                                                                                
                            'Model'=>'deskLibraryOperators'
                        ], 
                        'jobs' => ['App\\Jobs\\BorrowingUpdatePatronRequest']
                    ],
                    'notDeliveredToUser' => [
                        'role'  =>  [],
                        'next_statuses'  =>  [''], 
                        'constraints'   =>  ["canDeliver"],
                        'notify'    =>  [
                            'Model'=>'borrowingLibraryOperators',                                                                                                                
                            'Model'=>'deskLibraryOperators'
                        ], 
                        'jobs' => ['App\\Jobs\\BorrowingUpdatePatronRequest']
                    ],
                    'deliveredToUser' => [
                        'role'  =>  [],
                        'next_statuses'  =>  [''], 
                        'constraints'   =>  ["canDeliver"],
                        'notify'    =>  [
                            'Model'=>'borrowingLibraryOperators',       
                            'Model'=>'deskLibraryOperators'                                                                             
                        ], 
                        'jobs' => ['App\\Jobs\\BorrowingUpdatePatronRequest']
                    ],
                    'deliveredToUserDirect' => [
                        'role'  =>  [],
                        'next_statuses'  =>  [''], 
                        'constraints'   =>  ["canDeliver"],
                        'notify'    =>  [
                            'Model'=>'borrowingLibraryOperators',       
                            'Model'=>'deskLibraryOperators'                                                                            
                        ], 
                        'jobs' => ['App\\Jobs\\BorrowingUpdatePatronRequest']
                    ],
                    //NB: added notDeliveredToUser+Direct cause it will change to these from deskNotReceived
                    'deliveringToDesk' => [
                        'role'  =>  [],
                        'next_statuses'  =>  ['deskReceived','deskNotReceived','notDeliveredToUser','notDeliveredToUserDirect'], 
                        'constraints'   =>  ["canBorrow"],
                        'notify'    =>  [
                            'Model'=>'borrowingLibraryOperators',         
                            'Model'=>'deskLibraryOperators'                                                                  
                        ],                                 
                    ],
                    'deskReceived' => [
                        'role'  =>  [],
                        'next_statuses'  =>  ['deliveredToUser','notDeliveredToUser','deliveredToUserDirect','notDeliveredToUserDirect'], 
                        'constraints'   =>  ["canDeliver"],
                        'notify'    =>  [
                            'Model'=>'borrowingLibraryOperators',                                                                                    
                            'Model'=>'deskLibraryOperators'
                        ], 
                        'jobs' => ['App\\Jobs\\PatronRequestUpdateNotify'] //notify to patron
                    ],
                    /*questo è uno stato di transizione*/
                    'deskNotReceived' => [
                        'role'  =>  [],
                        'next_statuses'  =>  ['notDeliveredToUserDirect','notDeliveredToUser'], 
                        'constraints'   =>  ["canDeliver"],
                        /*'notify'    =>  [
                            'Model'=>'borrowingLibraryOperators', 
                            'Model'=>'deskLibraryOperators'                                                                                
                        ],*/                         
                    ],                    
                ]
            ],
            'App\Models\Requests\LendingDocdelRequest'=> [
                'flow_tree' => [             
                    //this configuration is needed by status resolver to exists because it checks when do status change FROM this state
                    //but it will not change TO this state cause is instad the borrow that change directly lending_status field without doing a lending->changeStatus
                    'requestReceived' => [
                        'role' => [],
                        'next_statuses' => ['willSupply','canceledAccepted','unFilled'],
                        'constraints' => [],                         
                    ],
                    'willSupply' => [
                        'role' => [],//borrow/lend/manage?
                        'next_statuses' => ['copyCompleted','unFilled'],
                        'constraints' => [], 
                        'notify' => [
                            'Model'=>'lendingLibraryOperators',
                        ], 
                        'jobs' => ['App\\Jobs\\BorrowingRequestUpdateNotify']
                    ],
                    //this configuration is needed by status resolver to exists because it checks when do status change FROM this state
                    //but it will not change TO this state cause is instad the borrow that change directly lending_status field without doing a lending->changeStatus                    
                    'cancelRequested' => [
                        'role' => [],//borrow/lend/manage?
                        'next_statuses' => ['canceledAccepted','copyCompleted'],
                        'constraints' => [],                                         
                    ],
                    'canceledAccepted' => [
                        'role' => [],//borrow/lend/manage?
                        'next_statuses' => [],
                        'constraints' => [], 
                        'notify' => [
                             'Model'=>'lendingLibraryOperators', 
                        ],                     
                        'jobs' => ['App\\Jobs\\BorrowingRequestUpdateNotify']
                    ],
                    'unFilled' => [
                        'role' => [],//borrow/lend/manage?
                        'next_statuses' => [],
                        'constraints' => [], 
                        'notify' => [
                            'Model'=>'lendingLibraryOperators', 
                        ],                         
                        'jobs' => ['App\\Jobs\\BorrowingRequestUpdateNotify']
                    ],
                    'copyCompleted' => [
                        'role' => [],//borrow/lend/manage?
                        'next_statuses' => [''],
                        'constraints' => [], 
                        'notify' => [
                            'Model'=>'lendingLibraryOperators', 
                        ], 
                        'jobs' => ['App\\Jobs\\BorrowingRequestUpdateNotify']
                    ],
                           
                ],
            ],

            'App\Models\Libraries\Library'=> [

                    'flow_tree' => [
                        //disabled
                        config("constants.library_status.disabled") => [
                            'role'  =>  ['super-admin','manager'],
                            'next_statuses'  =>  [config("constants.library_status.enabled"),config("constants.library_status.renewing")],                            
                            'notify' => [
                                'Model'=>'manageOperators', 
                            ], 
                        ],
                        config("constants.library_status.disabled_bad") => [
                            'role'  =>  ['super-admin','manager'],
                            'next_statuses'  =>  [config("constants.library_status.enabled")],
                            'notify' => [
                                'Model'=>'manageOperators', 
                            ], 
                        ],
                        config("constants.library_status.disabled_subscription_expired") => [
                            'role'  =>  ['super-admin','manager'],
                            'next_statuses'  =>  [config("constants.library_status.disabled"),config("constants.library_status.renewing")],
                            'notify' => [
                                'Model'=>'manageOperators', 
                            ], 
                        ],
                        config("constants.library_status.disabled_didntpaid") => [
                            'role'  =>  ['super-admin','manager'],
                            'next_statuses'  =>  [config("constants.library_status.enabled")],
                            'notify' => [
                                'Model'=>'manageOperators', 
                            ], 
                        ],
                        //new
                        config("constants.library_status.new") => [
                            'role'  =>  ['super-admin','manager'],
                            'next_statuses'  =>  [config("constants.library_status.enabled"),config("constants.library_status.disabled")],                            
                        ],
                        //enabled
                        config("constants.library_status.enabled")	=> [
                            'role'  =>  ['super-admin','manager'],
                            'next_statuses'  =>  [config("constants.library_status.disabled"), config("constants.library_status.disabled_bad"), config("constants.library_status.disabled_didntpaid"),config("constants.library_status.renewing")],
                            'constraints'   =>  ["canBeEnabled"], 
                            'notify' => [
                                'Model'=>'manageOperators', 
                            ],                             
                        ],
                        //renewing
                        config("constants.library_status.renewing")=> [
                            'role'  =>  ['super-admin','manager'],
                            'next_statuses'  =>  [config("constants.library_status.enabled"),config("constants.library_status.disabled"),config("constants.library_status.disabled_subscription_expired")],
                            'notify' => [
                                'Model'=>'manageOperators', 
                            ], 
                        ],
                ],
            
            ],  
            
            'App\Models\Institutions\Institution'=> [

                'flow_tree' => [
                    //disabled
                    config("constants.institution_status.disabled") => [
                        'role'  =>  ['super-admin','manager'],
                        'next_statuses'  =>  [config("constants.institution_status.enabled")],     
                        'constraints'   =>  ["canBeDisabled"],                         
                        'notify' => [
                            'Model'=>'manageOperators', 
                        ], 
                    ],
                    config("constants.institution_status.enabled") => [
                        'role'  =>  ['super-admin','manager'],
                        'next_statuses'  =>  [config("constants.institution_status.disabled")],
                        'notify' => [
                            'Model'=>'manageOperators', 
                        ], 
                    ],
                    config("constants.institution_status.pending") => [
                        'role'  =>  ['super-admin','manager'],
                        'next_statuses'  =>  [config("constants.institution_status.enabled")],
                        'notify' => [
                            'Model'=>'manageOperators', 
                        ], 
                    ],
                ]
            ]
        ],
    ];