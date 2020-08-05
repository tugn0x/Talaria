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
                        'next_statuses'  =>  ['userAskCancel','canceled','received','notReceived','fileReceived'],
                        'constraints'   =>  ['isOwner'],
                    ],
                    'userAskCancel'	=> [
                        'role'  =>  ['patron'],
                        'next_statuses'  =>  ['Canceled'],
                        'constraints'   =>  ['isOwner'],
                    ],
                    'canceled'	=> [
                        'role'  =>  ['patron'],
                        'next_statuses'  =>  [],
                        'constraints'   =>  ['isOwner'],
                        'notify'    =>  [
                            'Model'=>'owner',
                        ]
                    ],

                    'received'	=> [
                        'role'  =>  ['patron'],
                        'next_statuses'  =>  [],
                        'constraints'   =>  ['isOwner'],
                        'notify'    =>  [
                            'Model'=>'owner',
                        ],
                        /*'jobs' => [classe del job da eseguire]*/
                    ],
                    'notReceived'	=> [
                        'role'  =>  ['patron'],
                        'next_statuses'  =>  [],
                        'constraints'   =>  ['isOwner'],
                        'notify'    =>  [
                            'Model'=>'owner',
                        ]
                        /*'jobs' => [classe del job da eseguire]*/
                    ],
                    'fileReceived'	=> [
                        'role'  =>  ['patron'],
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