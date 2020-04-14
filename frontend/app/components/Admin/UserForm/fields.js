import moment from "moment";
export const fields = {
    name: {
        type: "text",
        required: true,
        name: "name",
        width: "col-sm-6",
    },
    surname: {
        type: "text",
        required: true,
        name: "surname",
        width: "col-sm-6"
    },
    email: {
        type: "email",
        required: true,
        name: "email",
        width: "col-sm-6"
    },
    address: {
        type: "text",
        name: "address",
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
    phone: {
        type: "number",
        name: "phone",
        width: "col-sm-6"
    },
    mobile: {
        type: "number",
        name: "mobile",
        width: "col-sm-6"
    },
    status: {
        type: "switch",
        name: "status",
        width: "col-sm-6",
        // error: "app.global.invalid_privacy_policy_accepted",
    },
    roles: {
        type: "list-checkbox",
        name: "roles",
        width: "col-sm-12",
    },
    privacy_policy_accepted: {
        type: "switch",
        name: "privacy_policy_accepted",
        required: true,
        width: "col-sm-6",
       // error: "app.global.invalid_privacy_policy_accepted",
       value: moment().format('YYYY-MM-DD hh:mm:ss')
    },

}
