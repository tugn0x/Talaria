export const fields = {
    name: {
        type: "text",
        name: "name",
        width: "col-md-12",
        disabled: true,
        order: 1
    },
    label: {
        type: "text",
        name: "label",
        width: "col-md-12",
        order: 2,
        maxLength: 20
    },
    /*preferred: {
        type: "switch",
        name: "preferred",
        width: "col-md-12",
        order: 3,
    },*/
    department_id: { 
        type: "custom-select",
        name: 'department_id',
        width: "col-md-12",
        options: 'department_id',
        order: 4,
        required: true,
    },  
    title_id: { 
        type: "custom-select",
        name: 'title_id',
        width: "col-md-12",
        options: 'title_id',
        order: 5, 
        required: true,
    },
    user_referent: { 
        type: "text",
        name: 'user_referent',
        width: "col-md-12",
        order: 6, 
    },
    user_mat: { 
        type: "text",
        name: 'user_mat',
        width: "col-md-12",
        order: 6, 
    },
    user_service_phone: { 
        type: "text",
        name: 'user_service_phone',
        width: "col-md-12",
        order: 8, 
    },
    user_service_email: { 
        type: "email",
        name: 'user_service_email',
        width: "col-md-12",
        order: 9, 
    },
}

export const fieldsIsNew = { 
  
    library_id: { 
        type: "map-selector",
        name: 'library_id',
        nolabel: true,
        width: "col-md-12",
        freeSearch: true,
        required: true,
        order: 1
    },
    /*name: {
        type: "text",
        name: "name",
        width: "col-md-12",
        disabled: true,
        order: 2
    },*/
    label: {
        type: "text",
        name: "label",
        width: "col-md-12",
        order: 3,
        maxLength: 20
    },
    department_id: { 
        type: "custom-select",
        name: 'department_id',
        width: "col-md-12",
        options: 'department_id',
        required: true, 
    },  
    title_id: { 
        type: "custom-select",
        name: 'title_id',
        width: "col-md-12",
        options: 'title_id',
        required: true,
    },    
    user_referent: { 
        type: "text",
        name: 'user_referent',
        width: "col-md-12",
    },
    user_mat: { 
        type: "text",
        name: 'user_mat',
        width: "col-md-12",
    },
    user_service_phone: { 
        type: "text",
        name: 'user_service_phone',
        width: "col-md-12",
    },
    user_service_email: { 
        type: "email",
        name: 'user_service_email',
        width: "col-md-12",
    },
}