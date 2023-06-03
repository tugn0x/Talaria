export const fieldsGroups = {
    general_info: {
        name: 'general_info',
        order: 0,
        label: 'general_info'
    },
    institution_info: {
        name: 'institution_info',
        order: 1,
        label: 'institution_info'
    },
    identifier_info: {
        name: 'identifier_info',
        order: 2,
        label: 'identifier_info'
    },
    service_info: {
        name: 'service_info',
        order: 3,
        label: 'service_info'
    },
    administrative_info: {
        name: 'administrative_info',
        order: 4,
        label: 'administrative_info'
    },
};

export const fields = {
    name: {
        type: "text",
        required: true,
        name: "name",
        width: "col-sm-6",
        group: "general_info",
        order: 1,
    },
    alt_name: {
        type: "text",
        required: false,
        name: "alt_name",
        width: "col-sm-6",
        group: "general_info",
        order: 2,
    },
    external: {
        type: "checkbox",
        name: "external",
        width: "col-sm-6",      
        group: "general_info",  
        order: 3,
    },
    profile_type: {
        type: "custom-select",
        name: "profile_type",
        width: "col-sm-6",      
        group: "general_info",  
        options: "profile_type",
        order: 3,
    },
    
    subject_id: {
        type: "custom-select",
        required: true,
        name: "subject_id",
        width: "col-sm-6",
        group: "general_info",
        options: "subject_id",
        order: 4,
    },
    country_id: {
        type: "custom-select",
        required: true,
        name: "country_id",
        width: "col-md-6",
        group: "general_info",
        options: "country_id",
        order: 5,
    },
    address: {
        type: "text",
        name: "address",
        required: true,        
        group: "general_info",        
        width: "col-sm-6",
        order: 6,
    },
    town: {
        type: "text",
        name: "town",         
        group: "general_info",       
        width: "col-sm-6",
        order: 7,
    },
    district: {
        type: "text",
        name: "district",     
        group: "general_info",           
        width: "col-sm-6",
        order: 8,
    },
    postcode: {
        type: "number",
        name: "postcode",     
        group: "general_info",   
        width: "col-sm-6",
        order: 9,
    },
    state: {
        type: "text",
        name: "state",        
        group: "general_info",
        width: "col-sm-6",
        order: 10,
    },    
    lat: {
        type: "text",
        name: "lat",        
        group: "general_info",
        width: "col-sm-6",
        order: 11,        
    },    
    lon: {
        type: "text",
        name: "lon",          
        group: "general_info",      
        width: "col-sm-6",
        order: 12,
    },
    library_coordinates_Validity: {
        type: "Label",
        required: false,
        nolabel: true,
        name: "library_coordinates_Validity",
        width: "col-sm-6",
        group: "general_info",
        order: 13,
        hidden:false,
        color:"#FF0000"
    },    

    institution_id: {
        type: "custom-select",
        required: true,
        name: "institution_id",
        width: "col-sm-6",
        group: "institution_info",
        options: "institution_id",
        order: 1,

    },
    institution_type_id: {
        type: "custom-select",
        required: false,
        name: "institution_type_id",
        width: "col-md-6",
        group: "institution_info",
        options: "institution_type_id",
        order: 2,
        //selectedOption: "id"
    },
    institution_country_id: {
        type: "custom-select",
        required: false,
        name: "institution_country_id",
        width: "col-md-6",
        group: "institution_info",
        options: "institution_country_id",
        order: 3,
        //selectedOption: "id"
    },
    
    projects_label: {
        type: "Label",
        required: false,                
        name: "projects_label",
        nolabel:true,
        width: "col-sm-12",
        group: "institution_info",
        order: 4,
    },

    project_id: {
        nolabel: true,
        type: "list-checkbox",
        name: "project_id",
        width: "col-sm-12",
        group: "institution_info",
        options: "project_id",
        order: 5,
    },

    
    identifier_type_id: {
        type: "custom-select",
        //required: true,
        name: "identifier_type_id",
        width: "col-md-6",
        group: "identifier_info",
        options: "identifier_type_id",
        order: 2,
    },
 
    library_identifiers_txt: {
        type: "text",
        name: "library_identifiers_txt",
        width: "col-md-4",
        //required: true,
        group: "identifier_info",
        order: 3,
        
    },

    library_identifier_add: {
        type: "AddButton",
        label:"Add Code",
        name: "library_identifier_add",
        margintop:"13px",
        width: "col-md-2",
        group: "identifier_info",
        disabled: true,
        order: 4,
    },

    library_identifier_list: {
        type: "list",
        label:"Add",
        name: "library_identifier_list",
        hidden: false,
        width: "col-md-12",
        group: "identifier_info",
        order: 5,
    },

    identifiers_id: {
        type: "text",
        name: "identifiers_id",
        width: "col-md-3",
        group: "identifier_info",
        hidden:true
    },

    

    url: {
        type: "text",
        name: "url",
        width: "col-sm-6",
        group: "service_info",
        order: 1,
    },
    opac: {
        type: "text",
        name: "opac",
        width: "col-sm-6",
        group: "service_info",
        order: 2,
    },
    ill_email: {
        type: "email",
        name: "ill_email",
        width: "col-sm-6",
        group: "service_info",
        order: 4,
    },
    ill_phone: {
        type: "text",
        name: "ill_phone",
        width: "col-sm-6",
        group: "service_info",
        order: 5,
    },
    ill_supply_conditions: {
        type: "textarea",
        name: "ill_supply_conditions",
        width: "col-sm-6",
        group: "service_info",
        order: 6,
    },
    ill_imbalance: {
        type: "text",
        name: "ill_imbalance",
        width: "col-sm-6",
        group: "service_info",
        order: 7,
    },
    ill_cost: {
        type: "number",
        name: "ill_cost",
        width: "col-sm-6",
        group: "service_info",
        order: 8,
    },
    ill_user_cost: {
        type: "number",
        name: "ill_user_cost",
        width: "col-sm-6",
        group: "service_info",
        order: 9,
    },
    ill_susp_date_start: {
        type: "date",
        name: "ill_susp_date_start",
        width: "col-sm-6",
        group: "service_info",
        order: 10,
    },
    ill_susp_date_end: {
        type: "date",
        name: "ill_susp_date_end",
        width: "col-sm-6",
        group: "service_info",
        order: 11,
    },
    ill_susp_notification_days: {
        type: "number",
        name: "ill_susp_notification_days",
        width: "col-sm-6",
        group: "service_info",
        order: 12,
    },   
    ill_IFLA_voucher: {
        type: "checkbox",
        name: "ill_IFLA_voucher",
        width: "col-sm-6",
        group: "service_info",
        order: 13,
    },
    ill_cost_in_voucher: {
        type: "number",
        name: "ill_cost_in_voucher",
        width: "col-sm-6",
        group: "service_info",
        order: 14,
    },
    /*status: {
        type: "custom-select",
        name: "status",
        label: "status",
        width: "col-sm-6",
        options: [
            { value: 0, label: 'disabilitata' },
            { value: 1, label: 'abilitata' },
            { value: 2, label: 'in rinnovo' },
        ]
    },*/
    /*registration_date: {
        type: "date",
        name: "registration_date",
        width: "col-sm-6"
    },*/
    /*info amministrative */
    vatnumber: {
        type: "number",
        name: "vatnumber",
        width: "col-sm-6",
        group: "administrative_info",
        order: 1,
    },
    fiscalcode: {
        type: "text",
        name: "fiscalcode",
        width: "col-sm-6",
        group: "administrative_info",
        order: 2,
    },
    invoice_header: {
        type: "text",
        name: "invoice_header",
        width: "col-sm-6",
        group: "administrative_info",
        order: 3,
    },
    email_pec: {
        type: "email",
        name: "email_pec",
        width: "col-sm-6",
        group: "administrative_info",
        order: 4,
        
    },
    ccu: {
        type: "text",
        name: "ccu",
        width: "col-sm-6",
        group: "administrative_info",
        order: 5,
    },
    administrative: {
        type: "text",
        name: "administrative",
        width: "col-sm-6",
        group: "administrative_info",
        order: 6,
    },
    administrative_email: {
        type: "email",
        name: "administrative_email",
        width: "col-sm-6",
        group: "administrative_info",
        order: 7,
        
    },
    administrative_phone: {
        type: "number",
        name: "administrative_phone",
        width: "col-sm-6",
        group: "administrative_info",
        order: 8,
    },
    terzo_code: {
        type: "text",
        name: "terzo_code",
        width: "col-sm-6",
        group: "administrative_info",
        order: 9,
    },
}