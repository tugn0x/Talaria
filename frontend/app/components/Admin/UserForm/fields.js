export const fields = {
    name: {
        type: "text",
        required: true,
        name: "name",
        label: 'app.global.name',
        placeholder: 'app.global.name',
    },
    surname: {
        type: "text",
        required: true,
        name: "surname",
        label: 'app.global.surname',
        placeholder: 'app.global.surname',
    },
    email: {
        type: "email",
        required: true,
        name: "email",
        label: 'app.global.email',
        placeholder: 'app.global.email',
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
        label: 'app.containers.UserProfile.address',
        placeholder: 'app.containers.UserProfile.address',
        
    },
    town: {
        type: "text",
        name: "town",
        label: 'app.containers.UserProfile.town',
        placeholder: 'app.containers.UserProfile.town',
        
    },
    district: {
        type: "text",
        name: "district",
        label: 'app.containers.UserProfile.district',
        placeholder: 'app.containers.UserProfile.town',
        
    },
    postcode: {
        type: "number",
        name: "postcode",
        label: 'app.containers.UserProfile.postcode',
        placeholder: 'app.containers.UserProfile.town',
        
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
        label: 'app.containers.UserProfile.state',
        placeholder: 'app.containers.UserProfile.town',
        
    },
    phone: {
        type: "number",
        name: "phone",
        label: 'app.containers.UserProfile.phone',
        placeholder: 'app.containers.UserProfile.town',
        
    },
    mobile: {
        type: "number",
        name: "mobile",
        label: 'app.containers.UserProfile.mobile',
        placeholder: 'app.containers.UserProfile.town',
        
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
   
}