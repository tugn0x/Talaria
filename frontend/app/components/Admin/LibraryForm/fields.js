export const fieldsGroups = {
    general_info: {
        name: 'general_info',
        order: 0,
        label: 'general_info'
    },
    administrative_info: {
        name: 'administrative_info',
        order: 2,
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
        order: 1,
    },
    institution_id: {
        type: "custom-select",
        required: true,
        disabled: true,
        name: "institution_id",
        width: "col-sm-6",
        group: "general_info",
        options: "institution_id",
        order: 3,
        // selectedOption: "institution_type_id"
        
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
        width: "col-sm-6"
    },
    town: {
        type: "text",
        name: "town",                
        width: "col-sm-6"
    },
    district: {
        type: "text",
        name: "district",                
        width: "col-sm-6"
    },
    postcode: {
        type: "number",
        name: "postcode",        
        width: "col-sm-6"
    },
    state: {
        type: "text",
        name: "state",        
        width: "col-sm-6"
    },    
    lat: {
        type: "text",
        name: "lat",        
        width: "col-sm-6"
    },    
    lon: {
        type: "text",
        name: "lon",                
        width: "col-sm-6"
    },    

    url: {
        type: "text",
        name: "url",
        width: "col-sm-6"
    },
    opac: {
        type: "text",
        name: "opac",
        width: "col-sm-6"
    },
    ill_referent_name: {
        type: "text",
        name: "ill_referent_name",
        width: "col-sm-6"
    },
    ill_email: {
        type: "email",
        name: "ill_email",
        width: "col-sm-6"
    },
    ill_phone: {
        type: "text",
        name: "ill_phone",
        width: "col-sm-6"
    },
    ill_supply_conditions: {
        type: "textarea",
        name: "ill_supply_conditions",
        width: "col-sm-6"
    },
    ill_imbalance: {
        type: "text",
        name: "ill_imbalance",
        width: "col-sm-6"
    },
    ill_cost: {
        type: "number",
        name: "ill_cost",
        width: "col-sm-6"
    },
    ill_user_cost: {
        type: "number",
        name: "ill_user_cost",
        width: "col-sm-6"
    },
    ill_susp_date_start: {
        type: "date",
        name: "ill_susp_date_start",
        width: "col-sm-6"
    },
    ill_susp_date_end: {
        type: "date",
        name: "ill_susp_date_end",
        width: "col-sm-6"
    },
    ill_susp_notification_days: {
        type: "number",
        name: "ill_susp_notification_days",
        width: "col-sm-6"
    },   
    ill_IFLA_voucher: {
        type: "checkbox",
        name: "ill_IFLA_voucher",
    },
    ill_cost_in_voucher: {
        type: "number",
        name: "ill_cost_in_voucher",
        width: "col-sm-6"
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
    external: {
        type: "checkbox",
        name: "external",
        width: "col-sm-6",        
    },
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
        group: "administrative_info"
    },
    fiscalcode: {
        type: "text",
        name: "fiscalcode",
        width: "col-sm-6",
        group: "administrative_info"
    },
    invoice_header: {
        type: "text",
        name: "invoice_header",
        width: "col-sm-6",
        group: "administrative_info"
    },
    email_pec: {
        type: "email",
        name: "email_pec",
        width: "col-sm-6",
        group: "administrative_info",
        
    },
    ccu: {
        type: "text",
        name: "ccu",
        width: "col-sm-6",
        group: "administrative_info"
    },
    administrative: {
        type: "text",
        name: "administrative",
        width: "col-sm-6",
        group: "administrative_info"
    },
    administrative_email: {
        type: "email",
        name: "administrative_email",
        width: "col-sm-6",
        group: "administrative_info",
        
    },
    administrative_phone: {
        type: "number",
        name: "administrative_phone",
        width: "col-sm-6",
        group: "administrative_info"
    },
    terzo_code: {
        type: "text",
        name: "terzo_code",
        width: "col-sm-6",
        group: "administrative_info"
    },
}