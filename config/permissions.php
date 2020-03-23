<?php

return [

    "macro" => [
        \App\Models\Libraries\Library::class => [
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
        \App\Models\Institutions\Institution::class => [
            // Manager
            'manage',
            // ManagerTech.
            'manage-tech',
            // Op. Licenze
            'manage-licenses',
        ],
        \App\Models\Projects\Project::class => [
            // Manager,
            'manage',
            // ManagerTech.
            'manage-tech',
            // Op. Licenze
            'manage-licenses',
        ],
        \App\Models\Institutions\Consortium::class => [
            // Op. Licenze
            'manage-licenses',
        ],
    ]
];
