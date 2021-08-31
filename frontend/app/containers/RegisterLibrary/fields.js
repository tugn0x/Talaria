export const fieldsGroups = {
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
};

export const totalSteps = 2;
export const setNewSteps = () => {
    let objectSteps = {}
    for(let i = 1; i <= totalSteps; i++){
        objectSteps[i] =  { active: i===1 ? true : false }
    }
    return objectSteps
}


export const fields = {

    library_id: { 
        type: "map-selector",
        name: 'library_id',
        nolabel: true,
        width: "col-md-12",
        group: "step_1",
        freeSearch: true,
        required: true,
        order:1
    },
    name: {
        type: "text",
        required: true,
        name: "name",
        width: "col-sm-12",
        group: "step_1",
        order: 2,
    },
    alt_name: {
        type: "text",
        required: false,
        name: "alt_name",
        width: "col-sm-12",
        group: "step_1",
        order: 3,
    },  
    url: {
        type: "text",
        required: true,
        name: "url",
        width: "col-sm-12",
        group: "step_1",
        order: 4,
    },


    library_location_label: {
        type: "Label",
        required: false,
        label:"Library Location",
        name: "library_location_label",
        width: "col-sm-12",
        group: "step_1",
        order: 5,
    },


    country_id: {
        type: "custom-select",
        required: true,
        name: "country_id",
        width: "col-md-6",
        group: "step_1",
        options: "country_id",
        order: 6,
    },
    state: {
        type: "text",
        required: true,
        name: "state",
        label: 'app.global.state',
        placeholder: 'app.global.state',
        group: "step_1",
        width: "col-sm-6",
        order: 7,
    }, 
    town: {
        type: "text",
        required: true,
        name: "town",
        label: 'app.global.town',
        placeholder: 'app.global.town',
        group: "step_1",
        width: "col-sm-6",
        order: 8,
    },

    postcode: {
        type: "number",
        required: true,
        name: "postcode",
        label: 'app.global.postcode',
        placeholder: 'app.global.postcode',
        group: "step_1",
        width: "col-sm-6",
        order: 9,
    },

    address: {
        type: "text",
        required: true,
        name: "address",
        label: 'app.global.address',
        placeholder: 'app.global.address',
        group: "step_1",
        width: "col-sm-12",
        order: 10,
    },

   library_contact_label: {
        type: "Label",
        required: false,
        label:"Service contact",
        name: "library_contact_label",
        width: "col-sm-12",
        group: "step_1",
        order: 11,
    },

    ill_email: {
        type: "text",
        required: true,
        name: "ill_email",
        label: 'app.global.ill_email',
        group: "step_1",
        width: "col-sm-6",
        order: 12,
    },

    ill_phone: {
        type: "text",
        name: "ill_phone",
        label: 'ill_phone',
        group: "step_1",
        width: "col-sm-6",
        order: 13,
    },

    ill_referent_name: {
        type: "text",
        name: "ill_referent_name",
        group: "step_1",
        width: "col-sm-12",
        order: 14,
    },

    ill_institution_label: {
        type: "Label",
        required: false,
        label:"Institution",
        name: "ill_institution_label",
        width: "col-sm-12",
        group: "step_1",
        order: 15,
    },

    // institution_type_id: {
    //     type: "custom-select",
    //     required: true,
    //     name: "institution_type_id",
    //     width: "col-sm-6",
    //     group: "step_1",
    //     options: "institution_type_id",
    //     order: 16,

    // },

    institution_type_id: {
        type: "custom-select",
        required: true,
        name: "institution_type_id",
        width: "col-md-6",
        group: "step_1",
        options: "institution_type_id",
        order: 16,
       // selectedOption: "institution_type_id"
        
    },

    int_country_id: {
        type: "custom-select",
        required: true,
        name: "int_country_id",
        width: "col-md-6",
        group: "step_1",
        options: "int_country_id",
        order: 17,
        selectedOption: "int_country_id"
    },
    institution_id: {
        type: "custom-select",
        required: true,
        name: "institution_id",
        width: "col-sm-12",
        group: "step_1",
        options: "institution_id",
        order: 18,
        selectedOption: "id"
    },
    suggested_institution_name: {
        type: "text",
        name:"suggested_institution_name",
        required: false,
        width: "col-md-12",
        group: "step_1",
        order: 19,
        hidden: true,
    },

    ill_service_contact_label: {
        type: "Label",
        required: false,
        label:"Progect or Consortium",
        width: "col-sm-12",
        group: "step_1",
        order: 20,
    },

    // project_id: {
    //     type: "custom-select",
    //     required: true,
    //     name: "project_id",
    //     width: "col-sm-12",
    //     group: "step_1",
    //     options: "project_id",
    //     order: 21,
    //     selectedOption: "id"
    // },


    project_id: {
        label:"project_id",
        type: "list-checkbox",
        name: "project_id",
        width: "col-sm-12",
        group: "step_1",
        order: 21,
    },



    // volunteer_library_label: {
    //     type: "Label",
    //     required: false,
    //     hidden: false,
    //     name: "volunteer_library_label",
    //     label:"can't find your instution or consortium? write us at: mail@mail.com",
    //     width: "col-sm-12",
    //     group: "step_1",
    //     order: 22,
    // },

    volunteer_library_label: {
        type: "Label",
        required: false,
        hidden: false,
        name: "volunteer_library_label",
        label:"Want to be a Volunteer Library?",
        width: "col-sm-12",
        group: "step_1",
        order: 23,
    },
  

    showfullProfile: {
        type: "Button",
        label:"Click here",
        name: "showfullProfile",
        width: "col-md-12",
        group: "step_1",
        order: 24,
    },
    opac: {
        type: "text",
        required: false,
        name: "opac",
        group: "step_1",
        width: "col-sm-12",
        hidden: true,
        order: 25,
    },
    subject_id: {
        type: "custom-select",
        required: false,
        name: "subject_id",
        width: "col-sm-12",
        group: "step_1",
        options: "subject_id",
        hidden: true,
        order: 26,
    },
    
    ill_service_conditions: {
        type: "Label",
        required: false,
        hidden: false,
        name: "ill_service_conditions_label",
        label:"ILL service conditions",
        width: "col-sm-12",
        group: "step_1",
        order: 27
    },

    ill_user_cost: {
        type: "number",
        required: false,
        name: "ill_user_cost",
        width: "col-sm-6",
        group: "step_1",
        order: 28,
    },

    ill_service_conditions_other: {
        type: "Label",
        required: false,
        hidden: false,
        name: "ill_service_conditions_others_label",
        label:"ILL service to other libraries",
        width: "col-sm-12",
        group: "step_1",
        order: 29,
    },


    ill_cost: {
        type: "number",
        required: false,
        name: "ill_cost",
        width: "col-sm-6",
        group: "step_1",
        order: 30,
    },

    ill_imbalance: {
        type: "text",
        required: false,
        name: "ill_imbalance",
        width: "col-sm-6",
        group: "step_1",
        order: 31,
    },

    ill_supply_conditions: {
        type: "textarea",
        required: false,
        name: "ill_supply_conditions",
        width: "col-sm-6",
        group: "step_1",
        order: 32,
    },

    // custombutton: {
    //     type: "Button",
    //     label:"Show Hide",
    //     width: "col-sm-12",
    //     group: "step_1",
    //     order: 18,
    // },

    // district: {
    //     type: "text",
    //     name: "district",
    //     label: 'app.global.district',
    //     placeholder: 'app.global.district',
    //     group: "step_1",
    //     width: "col-sm-6",
    //     order: 29,
    // },


   
//     identifier_id_2: {
//         type: "custom-select",
//         required: true,
//         name: "identifier_id",
//         label: 'app.global.identifier_id',
//         width: "col-md-6",
//         group: "step_1",
//         options: "identifier_id",
//         order: 12,
//     },
//     identifier_code_2: {
//         type: "text",
//         name: "identifier_code",
//         label: 'app.global.identifier_code',
//         group: "step_1",
//         width: "col-sm-6",
//         order: 13,
//     },
//     subject_id: {
//         type: "custom-select",
//         required: true,
//         name: "subject_id",
//         width: "col-sm-6",
//         group: "step_1",
//         options: "subject_id",
//         order: 22,
//     },
    
//   /*library Identifier */

    
    
//     /*info amministrative */
    

    // vatnumber: {
    //     type: "number",
    //     name: "vatnumber",
    //     width: "col-sm-6",
    //     group: "step_2",
    // },
    // fiscalcode: {
    //     type: "text",
    //     name: "fiscalcode",
    //     width: "col-sm-6",
    //     group: "step_2",
    // },
    // invoice_header: {
    //     type: "text",
    //     name: "invoice_header",
    //     width: "col-sm-6",
    //     group: "step_2",
    // },
    // email_pec: {
    //     type: "email",
    //     name: "email_pec",
    //     width: "col-sm-6",
    //     group: "step_2",
        
    // },
    // ccu: {
    //     type: "text",
    //     name: "ccu",
    //     width: "col-sm-6",
    //     group: "step_2",
    // },
    // administrative: {
    //     type: "text",
    //     name: "administrative",
    //     width: "col-sm-6",
    //     group: "step_2",
    // },
    // administrative_email: {
    //     type: "email",
    //     name: "administrative_email",
    //     width: "col-sm-6",
    //     group: "step_2",
        
    // },
    // administrative_phone: {
    //     type: "number",
    //     name: "administrative_phone",
    //     width: "col-sm-6",
    //     group: "step_2",
    // },
    // terzo_code: {
    //     type: "text",
    //     name: "terzo_code",
    //     width: "col-sm-6",
    //     group: "step_2",
    // },
}

