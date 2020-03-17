import moment from "moment";

export const fields = {
    name: {
        type: "text",
        required: true,
        name: "name",
       
    },
    surname: {
        type: "text",
        required: true,
        name: "surname",
      
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
    },
    phone: {
        type: "number",
        name: "phone",
    },
    mobile: {
        type: "number",
        name: "mobile",
    },
    privacy_policy_accepted: {
        type: "switch",
        name: "privacy_policy_accepted",
        required: true,
        error: "app.global.invalid_privacy_policy_accepted"
    }, 
    /* select: {
        type: "select",
        name: "select",
        label: "app.containers.UserProfile.state",
        placeholder: "app.containers.UserProfile.state",
        options: [
            { value: 'acquisto', label: 'acquisto' },
            { value: 'donazione', label: 'donazione' },
            { value: 'comodato', label: 'comodato' }
        ]
    }, */
    email: {
        type: "email",
        required: true,
        name: "email",
    },
}