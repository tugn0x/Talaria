export const fields = {
    name: {
        type: "text",
        name: "name",
        width: "col-md-12",
        disabled: true,
        order: 1
    },
    /* questa dovrebbe essere un dropdown con i valori presi dai dipartimenti della biblio*/
    department_id: { 
        type: "text",
        name: 'department_id',
        width: "col-md-12",
        order: 2, 
    },
    /* questa dovrebbe essere un dropdown con i valori presi dalle qualifiche dell'ente della biblio*/
    title_id: { 
        type: "text",
        name: 'title_id',
        width: "col-md-12",
        order: 3, 
    },
    user_referent: { 
        type: "text",
        name: 'user_referent',
        width: "col-md-12",
        order: 4, 
    },
    user_mat: { 
        type: "text",
        name: 'user_mat',
        width: "col-md-12",
        order: 5, 
    },
    user_service_phone: { 
        type: "text",
        name: 'user_service_phone',
        width: "col-md-12",
        order: 6, 
    },
    user_service_email: { 
        type: "email",
        name: 'user_service_email',
        width: "col-md-12",
        order: 7, 
    },
    status: {
        /*type: "number",
        name: 'status',
        width: "col-md-12",
        */
        type: "custom-select",
        name: "status",
        width: "col-md-6",
        options: [
            { value: 2, label: 'pending' },
            { value: 1, label: 'enabled' },
            { value: 0, label: 'disabled' },
        ],
        order: 8, 
    }
}