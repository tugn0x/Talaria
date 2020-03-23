<?php

return [

    "macro" => [
//        \App\Models\Libraries\Library::class => [
        'libraries' => [
            //Manager
            'manage',
            //Op. Utenti
            'manage-users',
            //Op. Borr
            'borrow',
            //Op. Lend
            'lend',
            //Op. Consegna
            'deliver',
            //Op. ILL Borr
            'ill-borrow',
            //Op. ILL Lend
            'ill-lend',
            //Op. Licenze
            'manage-licenses',
        ],
//        \App\Models\Institutions\Institution::class => [
        'institutions' => [
            // Manager
            'manage',
            // ManagerTech.
            'manage-tech',
            // Op. Licenze
            'manage-licenses',
        ],
//        \App\Models\Projects\Project::class => [
        'projects' => [
            // Manager,
            'manage',
            // ManagerTech.
            'manage-tech',
            // Op. Licenze
            'manage-licenses',
        ],
//        \App\Models\Institutions\Consortium::class => [
        'consortia' => [
            // Op. Licenze
            'manage-licenses',
        ],
    ]
];
