<?php
//NB: il nome dello stato deve essere di max(20) caratteri!
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
                        /*'notify'    =>  [
                            'Model'=>'libraryOperators',                               
                        ],*/
                        'jobs'=>[]
                    ],                   
                    'canceled'	=> [
                        'role'  =>  ['patron'],
                        'next_statuses'  =>  [],
                        'constraints'   =>  ['isOwner'],
                        /*'notify'    =>  [
                            'Model'=>'libraryOperators',
                        ],*/
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
                        'jobs' => ['App\Jobs\PatronUpdateBorrowing']
                    ],
                    'costNotAccepted' => [
                        'role'  =>  ['patron'],
                        'next_statuses'  =>  ['notReceived'],
                        'constraints'   =>  ['isOwner'],
                        'notify'    =>  [
                            'Model'=>'owner',                            
                        ],
                        'jobs' => ['App\Jobs\PatronUpdateBorrowing']
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
                        'role'  =>  [],//borrow/lend/manage?
                        'next_statuses'  =>  ['canceled','canceledDirect','requested'],
                        'constraints'   =>  [],                        
                    ],
                    'canceled'	=> [
                        'role'  =>  [],//borrow/lend/manage?
                        'next_statuses'  =>  [],
                        'constraints'   =>  ['canManage'],                        
                    ],
                    'canceledDirect'	=> [
                        'role'  =>  [],//borrow/lend/manage?,
                        'next_statuses'  =>  [],
                        'constraints'   =>  ['canManage'],                        
                    ],
                    'cancelRequested'	=> [
                        'role'  =>  [],//borrow/lend/manage?,
                        'next_statuses'  =>  ['canceledAccepted','canceled'],
                        'constraints'   =>  ['canManage'],                        
                        /*'notify'    =>  [
                            'Model'=>'lender',
                        ],  */  
                        //'jobs' => ['App\Jobs\LendingRequestUpdate']
                    ],
                    'canceledAccepted'	=> [
                        'role'  =>  [],//borrow/lend/manage?,
                        'next_statuses'  =>  ['canceled'],
                        'constraints'   =>  [],                        
                    ],
                    'requested'	=> [
                        'role'  =>  [],//borrow/lend/manage?,
                        'next_statuses'  =>  ['canceledDirect','cancelRequested'],
                        'constraints'   =>  [],  
                        /*'notify'    =>  [
                            'Model'=>'lender o tutti i lender (x orphan req)',
                        ],  */                    
                    ],

                ]
            ],     
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

];