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


    library_location_label: {
        type: "Label",
        required: false,
        nolabel: true,
        paddingtop:"30px",
        name: "library_location_label",
        width: "col-sm-12",
        size:"25px",
        group: "step_1",
        order: 1,
    },

    library_coordinates: {
        type: "ButtonMapPosition",
        label:"Get Coords",
        name: "library_coordinates",
        width: "col-md-2",
        group: "step_1",
  
        order: 2,
    },

    library_coordinates_txt_long: {
        type: "text",
        name: "lon",
        width: "col-md-2",
        group: "step_1",
        order: 3,
    },

    library_coordinates_txt_lat: {
        type: "text",
        name: "lat",
        width: "col-md-2",
        group: "step_1",
        order: 4,
    },

    library_coordinates_note: {
        type: "Label",
        required: false,
        nolabel: true,
        name: "library_coordinates_note",
        width: "col-sm-12",
        size:"13px",
        group: "step_1",
        order: 5,
    },

    // library_id: { 
    //     type: "map-selector",
    //     name: 'library_id',
    //     nolabel: true,
    //     width: "col-md-12",
    //     group: "step_1",
    //     freeSearch: true,
    //     required: true,
    //     order:1,
    //     hidden:true
    // },
    name: {
        type: "text",
        required: true,
        name: "name",
        width: "col-sm-12",
        group: "step_1",
        order: 6,
    },
    alt_name: {
        type: "text",
        required: false,
        name: "alt_name",
        width: "col-sm-12",
        group: "step_1",
        order: 7,
    },  
    url: {
        type: "text",
        required: true,
        name: "url",
        width: "col-sm-12",
        group: "step_1",
        order: 8,
    },




    country_id: {
        type: "custom-select",
        required: true,
        name: "country_id",
        width: "col-md-6",
        group: "step_1",
        options: "country_id",
        order: 9,
    },
    state: {
        type: "text",
        required: false,
        name: "state",
        label: 'app.global.state',
        placeholder: 'app.global.state',
        group: "step_1",
        width: "col-sm-6",
        order: 10,
    }, 
    town: {
        type: "text",
        required: true,
        name: "town",
        label: 'app.global.town',
        placeholder: 'app.global.town',
        group: "step_1",
        width: "col-sm-6",
        order: 11,
    },

    postcode: {
        type: "number",
        required: true,
        name: "postcode",
        label: 'app.global.postcode',
        placeholder: 'app.global.postcode',
        group: "step_1",
        width: "col-sm-6",
        order: 12,
    },

    address: {
        type: "text",
        required: true,
        name: "address",
        label: 'app.global.address',
        placeholder: 'app.global.address',
        group: "step_1",
        width: "col-sm-12",
        order: 13,
    },

   library_contact_label: {
        type: "Label",
        required: false,
        paddingtop:"30px",
        nolabel: true,
        name: "library_contact_label",
        width: "col-sm-12",
        size:"25px",
        group: "step_1",
        order: 14,
    },

    ill_email: {
        type: "text",
        required: true,
        name: "ill_email",
        label: 'app.global.ill_email',
        group: "step_1",
        width: "col-sm-6",
        order: 15,
    },

    ill_phone: {
        type: "text",
        name: "ill_phone",
        label: 'ill_phone',
        group: "step_1",
        width: "col-sm-6",
        order: 16,
    },

    ill_referent_name: {
        type: "text",
        name: "ill_referent_name",
        group: "step_1",
        width: "col-sm-12",
        order: 17,
    },

    ill_institution_label: {
        type: "Label",
        required: false,
        paddingtop:"30px",
        size:"25px",
        nolabel:true,
        name: "ill_institution_label",
        width: "col-sm-12",
        group: "step_1",
        order: 18,
    },

    institution_type_id: {
        type: "custom-select",
        required: true,
        name: "institution_type_id",
        width: "col-md-6",
        group: "step_1",
        options: "institution_type_id",
        order: 19,
       // selectedOption: "institution_type_id"
        
    },

    institution_country_id: {
        type: "custom-select",
        required: true,
        name: "institution_country_id",
        width: "col-md-6",
        group: "step_1",
        options: "institution_country_id",
        order: 20,
        selectedOption: "institution_country_id"
    },
    institution_id: {
        type: "custom-select",
        required: true,
        name: "institution_id",
        width: "col-sm-12",
        group: "step_1",
        options: "institution_id",
        order: 21,
        selectedOption: "id"
    },
    suggested_institution_name: {
        type: "text",
        name:"suggested_institution_name",
        required: false,
        width: "col-md-12",
        group: "step_1",
        order: 22,
        hidden: true,
    },

    projects_label: {
        type: "Label",
        required: false,
        paddingtop:"30px",
        size:"25px",
        name: "projects_label",
        nolabel:true,
        width: "col-sm-12",
        group: "step_1",
        order: 23,
    },

    project_id: {
        nolabel: true,
        type: "list-checkbox",
        name: "project_id",
        width: "col-sm-12",
        group: "step_1",
        order: 24,
    },

    volunteer_library_label: {
        type: "Label",
        required: false,
        paddingtop:"30px",
        hidden: false,
        size:"25px",
        name: "volunteer_library_label",
        nolabel: true,
        width: "col-sm-12",
        group: "step_1",
        order: 25,
    },    

    showfullProfile: {
        type: "Button",
        label:"Click here",
        name: "showfullProfile",
        width: "col-md-12",
        group: "step_1",
        order: 26,
    },

    opac_label: {
        type: "Label",
        required: false,
        paddingtop:"30px",
        hidden: true,
        size:"25px",
        name: "opac_label",
        nolabel: true,
        width: "col-sm-12",
        group: "step_1",
        order: 27,
    },

    opac: {
        type: "text",
        required: false,
        name: "opac",
        group: "step_1",
        width: "col-sm-12",
        hidden: true,
        order: 28,
    },

    subject_label: {
        type: "Label",
        required: false,
        paddingtop:"30px",
        hidden: true,
        size:"25px",
        name: "subject_label",
        nolabel: true,
        width: "col-sm-12",
        group: "step_1",
        order: 29,
    },

    subject_id: {
        type: "custom-select",
        required: false,
        name: "subject_id",
        width: "col-sm-12",
        group: "step_1",
        options: "subject_id",
        hidden: true,
        order: 30,
    },
    
    ill_service_conditions: {
        type: "Label",
        required: false,
        size:"25px",
        paddingtop:"30px",
        hidden: false,
        name: "ill_service_conditions",
        nolabel:true,
        width: "col-sm-12",
        group: "step_1",
        order: 31
    },

    ill_user_cost: {
        type: "number",
        required: false,
        name: "ill_user_cost",
        width: "col-sm-6",
        group: "step_1",
        order: 32,
    },

    ill_service_conditions_other: {
        type: "Label",
        required: false,
        size:"25px",
        paddingtop:"30px",
        hidden: false,
        name: "ill_service_conditions_other",
        nolabel: true,
        width: "col-sm-12",
        group: "step_1",
        order: 33,
    },


    ill_cost: {
        type: "number",
        required: false,
        name: "ill_cost",
        width: "col-sm-6",
        group: "step_1",
        order: 34,
    },

    ill_imbalance: {
        type: "text",
        required: false,
        name: "ill_imbalance",
        width: "col-sm-6",
        group: "step_1",
        order: 35,
    },

    ill_supply_conditions: {
        type: "textarea",
        required: false,
        name: "ill_supply_conditions",
        width: "col-sm-6",
        group: "step_1",
        order: 36,
    },

     
    ill_help_other: {
        type: "Label",
        required: false,
        size:"20px",
        paddingtop:"100px",
        hidden: false,
        name: "ill_help_other",  
        nolabel:true,        
        width: "col-sm-12",
        group: "step_1",
        order: 37,
    },    
}

