export const fieldsGroups = {
    general_info: {
        name: 'general_info',
        order: 0,
        label: 'general_info'
    },
    administrative_info: {
        name: 'administrative_info',
        order: 1,
        label: 'administrative_info'
    },
};


export const fields = {
    name: {
        type: "text",
        required: true,
        name: "name",
        width: "col-md-6",
        group: "general_info",
        
    },
    active: {
        type: "switch",
        name: "active",
        required: false,
        width: "col-md-6",
        group: "general_info",
       
    },
    granted_permissions: {
        type: "granted_permissions",
        name: "granted_permissions",
        width: "col-sm-12",
        options: "usersOptionList",
        searchOptionList: true,
        // order: 1,
        // group: "granted_permissions",
    },
   
    /*info amministrative */
    vatnumber: {
        type: "number",
        name: "vatnumber",
        width: "col-md-6",
        group: "administrative_info"
    },
    fiscalcode: {
        type: "text",
        name: "fiscalcode",
        width: "col-md-6",
        group: "administrative_info"
    },
    invoice_header: {
        type: "text",
        name: "invoice_header",
        width: "col-md-6",
        group: "administrative_info"
    },
    email_pec: {
        type: "email",
        name: "email_pec",
        width: "col-md-6",
        group: "administrative_info",
        
    },
    ccu: {
        type: "text",
        name: "ccu",
        width: "col-md-6",
        group: "administrative_info"
    },
    administrative: {
        type: "text",
        name: "administrative",
        width: "col-md-6",
        group: "administrative_info"
    },
    administrative_email: {
        type: "email",
        name: "administrative_email",
        width: "col-md-6",
        group: "administrative_info",
        
    },
    administrative_phone: {
        type: "number",
        name: "administrative_phone",
        width: "col-md-6",
        group: "administrative_info"
    },
    terzo_code: {
        type: "text",
        name: "terzo_code",
        width: "col-md-6",
        group: "administrative_info"
    },
}