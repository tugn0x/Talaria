/* export const fieldsGroups = {
    step_1: {
        name: 'step_1',
        order: 0,
        label: 'general_info'
    },
    step_2: {
        name: 'step_2',
        order: 1,
        label: 'general_info'
    },
    step_3: {
        name: 'step_3',
        order: 2,
        label: 'administrative_info'
    },
}; */

export const totalSteps = 3;

export const fields = {
    name: {
        type: "text",
        required: true,
        name: "name",
        width: "col-sm-6",
        group: "step_1",
        order: 1,
    },
    email: {
        type: "email",
        required: true,
        name: "email",
        width: "col-sm-6",
        group: "step_1",
        order: 2,
    },
    institution_id: {
        type: "custom-select",
        required: true,
        name: "institution_id",
        width: "col-sm-6",
        group: "step_1",
        options: "institution_id",
        order: 3,
        // selectedOption: "institution_type_id"
        
    },
    subject_id: {
        type: "custom-select",
        required: true,
        name: "subject_id",
        width: "col-sm-6",
        group: "step_1",
        options: "subject_id",
        order: 4,
    },
    country_id: {
        type: "custom-select",
        required: true,
        name: "country_id",
        width: "col-md-6",
        group: "step_1",
        options: "country_id",
        order: 5,
    },
    address: {
        type: "text",
        name: "address",
        label: 'app.global.address',
        placeholder: 'app.global.address',
        group: "step_2",
        width: "col-sm-6"
    },
    town: {
        type: "text",
        name: "town",
        label: 'app.global.town',
        placeholder: 'app.global.town',
        group: "step_2",
        width: "col-sm-6"
    },
    district: {
        type: "text",
        name: "district",
        label: 'app.global.district',
        placeholder: 'app.global.district',
        group: "step_2",
        width: "col-sm-6"
    },
    postcode: {
        type: "number",
        name: "postcode",
        label: 'app.global.postcode',
        placeholder: 'app.global.postcode',
        group: "step_2",
        width: "col-sm-6"
    },
    state: {
        type: "text",
        name: "state",
        label: 'app.global.state',
        placeholder: 'app.global.state',
        group: "step_2",
        width: "col-sm-6"
    },
    phone: {
        type: "text",
        name: "phone",
        label: 'app.global.phone',
        placeholder: 'app.global.phone',
        group: "step_2",
        width: "col-sm-6"
    },
    fax: {
        type: "text",
        name: "fax",
        label: 'app.global.fax',
        placeholder: 'app.global.fax',
        group: "step_2",
        width: "col-sm-6"
    },
    url: {
        type: "text",
        name: "url",
        group: "step_2",
        width: "col-sm-6"
    },
    
    /*info amministrative */
    opac: {
        type: "text",
        name: "opac",
        group: "step_3",
        width: "col-sm-6"
    },
    vatnumber: {
        type: "number",
        name: "vatnumber",
        width: "col-sm-6",
        group: "step_3",
    },
    fiscalcode: {
        type: "text",
        name: "fiscalcode",
        width: "col-sm-6",
        group: "step_3",
    },
    invoice_header: {
        type: "text",
        name: "invoice_header",
        width: "col-sm-6",
        group: "step_3",
    },
    email_pec: {
        type: "email",
        name: "email_pec",
        width: "col-sm-6",
        group: "step_3",
        
    },
    ccu: {
        type: "text",
        name: "ccu",
        width: "col-sm-6",
        group: "step_3",
    },
    administrative: {
        type: "text",
        name: "administrative",
        width: "col-sm-6",
        group: "step_3",
    },
    administrative_email: {
        type: "email",
        name: "administrative_email",
        width: "col-sm-6",
        group: "step_3",
        
    },
    administrative_phone: {
        type: "number",
        name: "administrative_phone",
        width: "col-sm-6",
        group: "step_3",
    },
    terzo_code: {
        type: "text",
        name: "terzo_code",
        width: "col-sm-6",
        group: "step_3",
    },
}