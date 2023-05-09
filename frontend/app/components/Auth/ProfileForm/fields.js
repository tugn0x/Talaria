

export const fields = {
    name: {
        type: "text",
        required: true,
        name: "name",
        order: 1,
    },
    surname: {
        type: "text",
        required: true,
        name: "surname",
        order: 2,
    },
    address: {
        type: "text",
        name: "address",
       
    },
    town: {
        type: "text",
        name: "town",
        
    },
    district: {
        type: "text",
        name: "district",
    },
    postcode: {
        type: "number",
        name: "postcode",
    },
    state: {
        type: "text",
        name: "state",
    },
    phone: {
        type: "number",
        name: "phone",
    },
    mobile: {
        type: "number",
        name: "mobile",
    },
    preflang: {
        type: "custom-select",
        name: "preflang",
        required: false,
        options: [
            { value: 'it', label: 'Italiano' },
            { value: 'en', label: 'English' },
            { value: 'sp', label: 'Español' },                         
            { value: 'tr', label: 'Türkçe' }
        ]
    },
    privacy_policy_accepted: {
        type: "switch",
        name: "privacy_policy_accepted",
        required: true,
       // error: "app.global.invalid_privacy_policy_accepted",
      //  defaultValue: moment().format('YYYY-MM-DD hh:mm:ss')
    },     
    email: {
        type: "email",
        required: true,
        name: "email",
        order: 3,
        error: "app.global.invalid_email",
    },
}