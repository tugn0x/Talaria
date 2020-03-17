export const fields = {
    name: {
        type: "text",
        required: true,
        name: "name",
        width: "col-md-6"
    },
    surname: {
        type: "text",
        required: true,
        name: "surname",
        width: "col-md-6"
    },
    email: {
        type: "email",
        required: true,
        name: "email",
        width: "col-md-6"
    },
    /* role: {
        type: "select",
        required: true,
        name: "role",
        label: 'app.global.role',
        placeholder: 'app.global.role',
        options: "role"
    }, */
    address: {
        type: "text",
        name: "address",
        width: "col-md-6"
    },
    town: {
        type: "text",
        name: "town",
        width: "col-md-6"
    },
    district: {
        type: "text",
        name: "district",
        width: "col-md-6"
    },
    postcode: {
        type: "number",
        name: "postcode",
        width: "col-md-6"
    },
    /*  checkbox: {
        type: "checkbox",
        name: "checkbox",
        label: 'app.containers.UserProfile.postcode',
        placeholder: 'app.containers.UserProfile.town',
        checked: true,
    },  */
    state: {
        type: "text",
        name: "state",
        width: "col-md-6"
    },
    phone: {
        type: "number",
        name: "phone",
        width: "col-md-6"
    },
    mobile: {
        type: "number",
        name: "mobile",
        width: "col-md-6"
    },
    privacy_policy_accepted: {
        type: "switch",
        name: "privacy_policy_accepted",
        required: true,
        width: "col-md-6"
       // error: "app.global.invalid_privacy_policy_accepted",
      //  defaultValue: moment().format('YYYY-MM-DD hh:mm:ss')
    }, 
   
}