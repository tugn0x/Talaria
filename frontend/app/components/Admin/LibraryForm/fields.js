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
        order: 1,
    },
    email: {
        type: "email",
        required: true,
        name: "email",
        width: "col-md-6",
        group: "general_info",
        order: 2,
    },
    institution_id: {
        type: "number",
        required: true,
        name: "institution_id",
        width: "col-md-6",
        group: "general_info",
        defaultValue: 1,
        order: 3,
    },
    subject_id: {
        type: "number",
        required: true,
        name: "subject_id",
        width: "col-md-6",
        group: "general_info",
        order: 4,
    },
    country_id: {
        type: "number",
        required: true,
        name: "country_id",
        width: "col-md-6",
        group: "general_info",
        order: 5,
    },
    address: {
        type: "text",
        name: "address",
        label: 'app.global.address',
        placeholder: 'app.global.address',
        width: "col-md-6"
    },
    town: {
        type: "text",
        name: "town",
        label: 'app.global.town',
        placeholder: 'app.global.town',
        width: "col-md-6"
    },
    district: {
        type: "text",
        name: "district",
        label: 'app.global.district',
        placeholder: 'app.global.district',
        width: "col-md-6"
    },
    postcode: {
        type: "number",
        name: "postcode",
        label: 'app.global.postcode',
        placeholder: 'app.global.postcode',
        width: "col-md-6"
    },
    state: {
        type: "text",
        name: "state",
        label: 'app.global.state',
        placeholder: 'app.global.state',
        width: "col-md-6"
    },
    phone: {
        type: "text",
        name: "phone",
        label: 'app.global.phone',
        placeholder: 'app.global.phone',
        width: "col-md-6"
    },
    fax: {
        type: "text",
        name: "fax",
        label: 'app.global.fax',
        placeholder: 'app.global.fax',
        width: "col-md-6"
    },
    url: {
        type: "text",
        name: "url",
        width: "col-md-6"
    },
    opac: {
        type: "text",
        name: "opac",
        width: "col-md-6"
    },
    isil_code: {
        type: "number",
        name: "isil_code",
        width: "col-md-6"
    },
    dd_email: {
        type: "email",
        name: "dd_email",
        width: "col-md-6"
    },
    ill_email: {
        type: "email",
        name: "ill_email",
        width: "col-md-6"
    },
    dd_phone: {
        type: "number",
        name: "dd_phone",
        width: "col-md-6"
    },
    ill_phone: {
        type: "text",
        name: "ill_phone",
        width: "col-md-6"
    },
    dd_supply_conditions: {
        type: "textarea",
        name: "dd_supply_conditions",
        width: "col-md-6"
    },
    dd_imbalance: {
        type: "text",
        name: "dd_imbalance",
        width: "col-md-6"
    },
    dd_cost: {
        type: "number",
        name: "dd_cost",
        width: "col-md-6"
    },
    dd_user_cost: {
        type: "number",
        name: "dd_user_cost",
        width: "col-md-6"
    },
    susp_date_start: {
        type: "date",
        name: "susp_date_start",
        width: "col-md-6"
    },
    susp_date_end: {
        type: "date",
        name: "susp_date_end",
        width: "col-md-6"
    },
    susp_notice_days: {
        type: "number",
        name: "susp_notice_days",
        width: "col-md-6"
    },
    ill_cost: {
        type: "number",
        name: "ill_cost",
        width: "col-md-6"
    },
    ill_user_cost: {
        type: "date",
        name: "susp_date_end",
        width: "col-md-6"
    },
    status: {
        type: "select",
        name: "status",
        placeholder: "status",
        width: "col-md-6",
        options: [
            { value: 0, name: 'disabilitata' },
            { value: 1, name: 'abilitata' },
            { value: 2, name: 'in rinnovo' },
        ]
    },
    nilde: {
        type: "checkbox",
        name: "nilde",
        width: "col-md-6",
    },
    rank: {
        type: "text",
        name: "rank",
        width: "col-md-6"
    },
    registration_date: {
        type: "date",
        name: "registration_date",
        width: "col-md-6"
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