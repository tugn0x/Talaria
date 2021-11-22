<?php
//NB: status "name" must be less than 20 char lenght!
//NOTA: everytime you change this, please run:
//php artisan cache:clear + php artisan optimize 

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
                        'role'  =>  [], //borrow/lend/manage?
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
                        'role'  =>  [],//borrow/lend/manage?
                        'next_statuses'  =>  ['costAccepted','notReceived'],
                        'constraints'   =>  ['isOwner'],
                        'notify'    =>  [
                            'Model'=>'owner',
                        ],
                        'jobs'=>[]
                    ],
                    'readyToDelivery'	=> [
                        'role'  =>  [],//borrow/lend/manage?
                        'next_statuses'  =>  ['received','notReceived'],
                        'constraints'   =>  ['isOwner'],
                        'notify'    =>  [
                            'Model'=>'owner',
                        ],
                        'jobs'=>[]
                        
                    ],
                    'received'	=> [
                        'role'  =>  [],//borrow/lend/manage?
                        'next_statuses'  =>  [],
                        'constraints'   =>  ['isOwner'],
                        'notify'    =>  [
                            'Model'=>'owner',
                        ],
                        'jobs'=>[]
                        
                    ],
                    'notReceived'	=> [
                        'role'  =>  [],//borrow/lend/manage?
                        'next_statuses'  =>  [],
                        'constraints'   =>  ['isOwner'],
                        'notify'    =>  [
                            'Model'=>'owner',
                        ],
                        'jobs'=>[]
                       
                    ],                   
                ],
            ],
            'App\Models\Requests\BorrowingDocdelRequest'=> [
                'flow_tree' => [
                    'newrequest'	=> [
                        'role'  =>  [],//borrow?
                        'next_statuses'  =>  ['canceled','canceledDirect','requested'],
                        'constraints'   =>  [],                        
                        'notify'    =>  [
                            'Model'=>'borrowingLibraryOperators',                            
                        ],  
                        //TODO: 'jobs'=>['App\\Jobs\\BorrowingRequestReset'] //clean all temp lender to start new request and update lender (if only 1) saying request was canceled
                    ],                   
                    'canceled'	=> [
                        'role'  =>  [],//borrow/lend/manage?
                        'next_statuses'  =>  [],
                        'constraints'   =>  [],  
                        'notify'    =>  [
                            'Model'=>'borrowingLibraryOperators',                            
                        ],  
                        'jobs' => ['App\\Jobs\\LendingRequestUpdateNotify']
                    ],
                    //NOTE on canceledDirect: i removed constraint because this status can be changed both from patron or borrower                       
                    'canceledDirect'	=> [
                        'role'  =>  [],//borrow?,
                        'next_statuses'  =>  [],
                        'constraints'   =>  [],     
                        'notify'    =>  [
                            'Model'=>'borrowingLibraryOperators',
                        ],                                              
                        //'jobs' => ['App\Jobs\LendingRequestUpdateNotify'] non posso notificare xke' non ho più il lender!
                    ],
                    //NOTE on cancelRequested: i removed constraint because this status can be changed both from patron or borrower                       
                    'cancelRequested'	=> [
                        'role'  =>  [],//borrow/lend/manage?,
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
                        'role'  =>  [],//borrow?,
                        'next_statuses'  =>  ['newrequest','canceled','canceledDirect','cancelRequested','fulfilled','notReceived'], 
                        'constraints'   =>  ["canManage"],  
                        'notify'    =>  [
                            'Model'=>'borrowingLibraryOperators',                                                        
                        ],  
                        'jobs' => ['App\\Jobs\\LendingRequestUpdateNotify']
                    ],
                    //todo
                    'fulfilled'	=> [
                        'role'  =>  [],//borrow?,
                        'next_statuses'  =>  ['documentReady'], 
                        'constraints'   =>  ["canManage"],  
                        'notify'    =>  [
                            'Model'=>'borrowingLibraryOperators',                                                        
                        ],                          
                    ],
                    //todo
                    'documentReady'	=> [ 
                        'role'  =>  [],//borrow?,
                        'next_statuses'  =>  [''], 
                        'constraints'   =>  ["canManage"],  
                        'notify'    =>  [
                            'Model'=>'borrowingLibraryOperators',                                                        
                        ],                          
                    ],
                    //todo
                    'notReceived'	=> [ 
                        'role'  =>  [],//borrow?,
                        'next_statuses'  =>  [''], 
                        'constraints'   =>  ["canManage"],  
                        'notify'    =>  [
                            'Model'=>'borrowingLibraryOperators',                                                        
                        ],                          
                    ],
                    //todo: notDeliveredToUser,notReceivedArchived?,deliveredToUser,documentReadyArchived?

                ]
            ],
            'App\Models\Requests\LendingDocdelRequest'=> [
                'flow_tree' => [                
                    'requestReceived' => [
                        'role' => [],//borrow/lend/manage?
                        'next_statuses' => ['willSupply'],
                        'constraints' => [], 
                        'notify' => [
                        'Model'=>'borrowingLibraryOperators', 
                        ], 
                        // 'jobs' => ['App\Jobs\LendingRequestUpdateNotify']
                    ],
                    'willSupply' => [
                        'role' => [],//borrow/lend/manage?
                        'next_statuses' => ['copyCompleted','unFilled'],
                        'constraints' => [], 
                        'notify' => [
                        'Model'=>'borrowingLibraryOperators', 
                        ], 
                        // 'jobs' => ['App\Jobs\LendingRequestUpdateNotify']
                    ],
                    
                    'cancelRequested' => [
                        'role' => [],//borrow/lend/manage?
                        'next_statuses' => ['canceledAccepted'],
                        'constraints' => [], 
                        'notify' => [
                            'Model'=>'borrowingLibraryOperators', 
                        ], 
                    //'jobs' => ['App\Jobs\LendingRequestUpdateNotify']
                    ],
                    'canceledAccepted' => [
                        'role' => [],//borrow/lend/manage?
                        'next_statuses' => [],
                        'constraints' => [], 
                        'notify' => [
                             'Model'=>'borrowingLibraryOperators', 
                        ], 
                    //'jobs' => ['App\Jobs\LendingRequestUpdateNotify']
                    ],
                    'unFilled' => [
                        'role' => [],//borrow/lend/manage?
                        'next_statuses' => [],
                        'constraints' => [], 
                        'notify' => [
                            'Model'=>'borrowingLibraryOperators', 
                        ], 
                    //'jobs' => ['App\Jobs\LendingRequestUpdateNotify']
                    ],
                    'copyCompleted' => [
                        'role' => [],//borrow/lend/manage?
                        'next_statuses' => [''],
                        'constraints' => [], 
                        'notify' => [
                            'Model'=>'borrowingLibraryOperators', 
                        ], 
                    // 'jobs' => ['App\Jobs\LendingRequestUpdateNotify']
                    ],
                           
                ]
               
                              
         
            /*
            /* 'userAskCancel'	=> [
                        'role'  =>  ['patron'],
                        'next_statuses'  =>  ['Canceled','received','waitingForCost','notReceived','readyToDelivery'],
                        'constraints'   =>  ['isOwner'],
                    ],
                               
            'App\Models\Requests\LendingDocdelRequest'=> [

                'flow_tree' => [
                    'requested'	=> [
                        'role'  =>  [],
                        'next_statuses'  =>  [],
                        'constraints'   =>  ['manage'],
                    ],
                ]
            ],
                
                */                
        ],
    ],

];