<?php
//NB: il nome dello stato deve essere di max(20) caratteri!

return [
    'status_resolver' =>
        [
            'App\Models\Requests\PatronDocdelRequest'=> [

                'flow_tree' => [
                    'requested'	=> [
                        //DUBBIO: se il cambio stato lo potesse fare anche il bibliotecario
                        //scatenandolo, forse dovrei mettere tra i ruoli anche manager 
                        //ma poi come lo verifico???
                        'role'  =>  ['patron'],
                        'next_statuses'  =>  ['canceled','received','waitingForCost','notReceived','fileReceived','readyToDelivery'],
                        'constraints'   =>  ['isOwner'],
                    ],
                   /* 'userAskCancel'	=> [
                        'role'  =>  ['patron'],
                        'next_statuses'  =>  ['Canceled','received','waitingForCost','notReceived','fileReceived','readyToDelivery'],
                        'constraints'   =>  ['isOwner'],
                    ],*/
                    'canceled'	=> [
                        'role'  =>  ['patron'],
                        'next_statuses'  =>  [],
                        'constraints'   =>  ['isOwner'],
                        'notify'    =>  [
                            'Model'=>'owner',
                        ]
                    ],
                    'waitingForCost' => [
                        'role'  =>  [], //borrow/lend/manage?
                        'next_statuses'  =>  ['costAccepted','costNotAccepted'],
                        'constraints'   =>  ['isOwner'],
                        'notify'    =>  [
                            'Model'=>'owner',
                        ]
                    ],
                    'costAccepted' => [
                        'role'  =>  ['patron'],
                        'next_statuses'  =>  ['canceled','received','fileReceived','notReceived','readyToDelivery'],
                        'constraints'   =>  ['isOwner'],
                        'notify'    =>  [
                            'Model'=>'owner',
                        ]
                    ],
                    'costNotAccepted' => [
                        'role'  =>  ['patron'],
                        'next_statuses'  =>  ['canceled','received','fileReceived','notReceived','readyToDelivery'],
                        'constraints'   =>  ['isOwner'],
                        'notify'    =>  [
                            'Model'=>'owner',
                        ]
                    ],
                    /*TODO: costNotAnswered: l'utente non risponde ..*/
                    'readyToDelivery'	=> [
                        'role'  =>  ['patron'],//borrow/lend/manage?
                        'next_statuses'  =>  ['received','notReceived'],
                        'constraints'   =>  ['isOwner'],
                        'notify'    =>  [
                            'Model'=>'owner',
                        ],
                        /*'jobs' => [classe del job da eseguire]*/
                    ],
                    'received'	=> [
                        'role'  =>  [],//borrow/lend/manage?
                        'next_statuses'  =>  [],
                        'constraints'   =>  ['isOwner'],
                        'notify'    =>  [
                            'Model'=>'owner',
                        ],
                        /*'jobs' => [classe del job da eseguire]*/
                    ],
                    'notReceived'	=> [
                        'role'  =>  [],//borrow/lend/manage?
                        'next_statuses'  =>  [],
                        'constraints'   =>  ['isOwner'],
                        'notify'    =>  [
                            'Model'=>'owner',
                        ]
                        /*'jobs' => [classe del job da eseguire]*/
                    ],
                    'fileReceived'	=> [
                        'role'  =>  [],//borrow/lend/manage?
                        'next_statuses'  =>  [],
                        'constraints'   =>  ['isOwner'],
                        'notify'    =>  [
                            'Model'=>'owner',
                        ]
                        /*'jobs' => [classe del job da eseguire]*/
                    ],
                ],
            ],
        ],


];