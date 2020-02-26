export const fields = {
    name: {
        type: "text",
        required: true,
        name: "name",
        label: 'app.global.name',
        placeholder: 'app.global.name',
        options: 'user'
    },
    surname: {
        type: "text",
        required: true,
        name: "surname",
        label: 'app.global.surname',
        placeholder: 'app.global.surname',
        options: 'user'
    },
    address: {
        type: "text",
        name: "address",
        label: 'app.containers.UserProfile.address',
        placeholder: 'app.containers.UserProfile.address',
        options: 'user'
    },
    town: {
        type: "text",
        name: "town",
        label: 'app.containers.UserProfile.town',
        placeholder: 'app.containers.UserProfile.town',
        options: 'user'
    },
    district: {
        type: "text",
        name: "district",
        label: 'app.containers.UserProfile.district',
        placeholder: 'app.containers.UserProfile.town',
        options: 'user'
    },
    postcode: {
        type: "number",
        name: "postcode",
        label: 'app.containers.UserProfile.postcode',
        placeholder: 'app.containers.UserProfile.town',
        options: 'user'
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
        options: 'user'
    },
    phone: {
        type: "number",
        name: "phone",
        label: 'app.containers.UserProfile.phone',
        placeholder: 'app.containers.UserProfile.town',
        options: 'user'
    },
    mobile: {
        type: "number",
        name: "mobile",
        label: 'app.containers.UserProfile.mobile',
        placeholder: 'app.containers.UserProfile.town',
        options: 'user'
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
        label: 'app.global.email',
        placeholder: 'app.global.email',
        options: 'user'
    },
}