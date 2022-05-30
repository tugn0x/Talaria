export const fields = {
    name: {
        type: "text",
        required: true,
        name: "name",
        width: "col-sm-6",        
        order: 1,
    },    
    description: {
        type: "text",
        required: true,
        name: "description",
        width: "col-sm-6",        
        order: 2,
    },     
    email: {
        type: "email",
        name: "email",
        width: "col-sm-6",
        order: 3,
    },
    phone: {
        type: "text",
        name: "phone",
        width: "col-sm-6",
        order: 4,
    },
    openinghours: {
        type: "textarea",
        name: "openinghours",
        width: "col-sm-6",
        order: 5,
    },
    address: {
        type: "text",
        name: "address",
        label: 'app.global.address',
        placeholder: 'app.global.address',
        width: "col-sm-6",
        order: 6,
    },
    town: {
        type: "text",
        name: "town",        
        label: 'app.global.town',
        placeholder: 'app.global.town',
        width: "col-sm-6",
        order: 7,
    },
    district: {
        type: "text",
        name: "district",        
        label: 'app.global.district',
        placeholder: 'app.global.district',
        width: "col-sm-6",
        order: 8,
    },
    postcode: {
        type: "number",
        name: "postcode",        
        label: 'app.global.postcode',
        placeholder: 'app.global.postcode',
        width: "col-sm-6",
        order: 9,
    },
    state: {
        type: "text",
        name: "state",        
        label: 'app.global.state',
        placeholder: 'app.global.state',
        width: "col-sm-6",
        order: 10,
    },   
    country_id: {
        type: "custom-select",
        required: true,
        name: "country_id",
        width: "col-md-6",
        options: "country_id",
        order: 11,
    }, 
   
    /*status: {
        type: "custom-select",
        name: "status",
        label: "status",
        width: "col-sm-6",
        options: [
            { value: 0, label: 'disabilitato' },
            { value: 1, label: 'abilitato' },            
        ]
    },*/
    
}