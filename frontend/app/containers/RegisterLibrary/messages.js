/*
 * RegisterLibrary Messages
 *
 * This contains all the text for the Footer component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.containers.RegisterNewLibrary.header',
    defaultMessage: 'Register public library',
  },
  link: {
    id: 'app.containers.RegisterNewLibrary.link',
    defaultMessage: 'Register library',
  },
  step_1: {
    id: 'app.containers.RegisterNewLibrary.step_1',
    defaultMessage: "Insert library's general data",
  },
  step_2: {
    id: 'app.containers.RegisterNewLibrary.step_2',
    defaultMessage: "Insert library's general data 2",
  },
  step_3: {
    id: 'app.containers.RegisterNewLibrary.step_3',
    defaultMessage: "Insert library's administrative data",
  },
  step_4: {
    id: 'app.containers.RegisterNewLibrary.step_4',
    defaultMessage: 'Summary Report',
  },
  createIdentifier: {
    id: 'app.containers.RegisterNewLibrary.createIdentifier',
    defaultMessage: 'Create Identifer',
  },
  createMessage: {
    id: 'app.containers.RegisterNewLibrary.createMessage',
    defaultMessage: 'Public Library created',
  },
  switchToBasicProfile: {
    id: 'app.containers.RegisterNewLibrary.switchToBasicProfile',
    defaultMessage:'Switch to Basic profile'
  },
  switchToFullProfile: {
    id: 'app.containers.RegisterNewLibrary.switchToFullProfile',
    defaultMessage:'Yes, Click here'
  },

  clicktoGetRecords: {
    id: 'app.containers.RegisterNewLibrary.clicktoGetRecords',
    defaultMessage:'Click to get coords'
  },

  stopEnterManually: {
    id: 'app.containers.RegisterNewLibrary.stopEnterManually',
    defaultMessage:'Stop to enter manually'
  },
  geolocationNotSupported: {
    id: 'app.containers.RegisterNewLibrary.geolocationNotSupported',
    defaultMessage:'Geolocation is not supported by your browser'
  },

  unableRetriveLocation: {
    id: 'app.containers.RegisterNewLibrary.unableRetriveLocation',
    defaultMessage:'Unable to retreive your library location'
  },
  locatingLibraryLocation: {
    id: 'app.containers.RegisterNewLibrary.locatingLibraryLocation',
    defaultMessage:'Locating your library location...'
  },

  placesFreeSearchPlaceholder: {
    id: 'app.containers.RegisterNewLibrary.placesFreeSearchPlaceholder',
    defaultMessage: 'Search for a new library',
  },

  institution_id: {
    id: 'app.libraries.institution_id',
    defaultMessage: "Institution",
  },
  subject_id: {
    id: 'app.libraries.subject_id',
    defaultMessage: 'Subject',
  },

  subject_name: {
    id: 'app.libraries.subject_name',
    defaultMessage: 'Subject',
  },

  country_id: {
    id: 'app.libraries.country_id',
    defaultMessage: 'Country',
  },
  opac: {
    id: 'app.libraries.opac',
    defaultMessage: 'Url opac',
  },
  ill_email: {
    id: 'app.libraries.ill_email',
    defaultMessage: 'Email LL service',
  },
  ill_phone: {
    id: 'app.libraries.ill_phone',
    defaultMessage: 'Phone LL service',
  },
  ill_supply_conditions: {
    id: 'app.libraries.ill_supply_conditions',
    defaultMessage: 'Supply conditions',
  },
  ill_imbalance: {
    id: 'app.libraries.ill_imbalance',
    defaultMessage: 'Imbalance',
  },
  ill_susp_date_start: {
    id: 'app.libraries.ill_susp_date_start',
    defaultMessage: 'Susp start date',
  },
  ill_susp_date_end: {
    id: 'app.libraries.ill_susp_date_end',
    defaultMessage: 'Susp end date',
  },
  ill_susp_notification_days: {
    id: 'app.libraries.ill_susp_notification_days',
    defaultMessage: 'Susp notice days',
  },
  ill_cost: {
    id: 'app.libraries.ill_cost',
    defaultMessage: 'ill_cost',
  },
  ill_user_cost: {
    id: 'app.libraries.ill_user_cost',
    defaultMessage: 'ill_user_cost',
  },
  status: {
    id: 'app.libraries.status',
    defaultMessage: 'status',
  },
  external: {
    id: 'app.libraries.external',
    defaultMessage: 'external',
  },
  registration_date: {
    id: 'app.libraries.registration_date',
    defaultMessage: 'Registration date',
  },
  vatnumber: {
    id: 'app.global.vatnumber',
    defaultMessage: 'PIVA',
  },
  fiscalcode: {
    id: 'app.global.fiscalcode',
    defaultMessage: 'CF',
  },
  invoice_header: {
    id: 'app.global.invoice_header',
    defaultMessage: 'invoice_header',
  },
  registration_date: {
    id: 'app.libraries.registration_date',
    defaultMessage: 'Registration date',
  },
  email_pec: {
    id: 'app.global.email_pec',
    defaultMessage: 'email_pec',
  },
  ccu: {
    id: 'app.global.ccu',
    defaultMessage: 'ccu',
  },
  administrative: {
    id: 'app.global.administrative',
    defaultMessage: 'administrative',
  },
  administrative_email: {
    id: 'app.global.administrative_email',
    defaultMessage: 'administrative_email',
  },
  administrative_phone: {
    id: 'app.global.administrative_phone',
    defaultMessage: 'administrative_phone',
  },
  terzo_code: {
    id: 'app.global.terzo_code',
    defaultMessage: 'terzo_code',
  },
  general_info: {
    id: 'app.libraries.general_info',
    defaultMessage: 'General info',
  },
  administrative_info: {
    id: 'app.global.administrative_info',
    defaultMessage: 'Administrative Info',
  },
  granted_permissions: {
    id: 'app.libraries.granted_permissions',
    defaultMessage: 'Users permissions',
  },
  updateSubmitText: {
    id: 'app.libraries.updateSubmitText',
    defaultMessage: 'Update Reference',
  },
  createSubmitText: {
    id: 'app.libraries.createSubmitText',
    defaultMessage: 'Create Reference',
  },

  institution_type_id: {
    id: 'app.libraries.institution_type_id',
    defaultMessage: 'Institution Type',
  },

  institution_type_name: {
    id: 'app.libraries.institution_type_name',
    defaultMessage: 'Institution Type',
  },
  
  library_identifiers: {
    id: 'app.libraries.institution_type_name',
    defaultMessage: 'Library Identifiers',
  },

  identifier_type_id: {
    id: 'app.RegisterNewLibrary.identifier_type_id',
    defaultMessage: 'Identifier Type',
  },

  library_identifiers_txt: {
    id: 'app.RegisterNewLibrary.library_identifiers_txt',
    defaultMessage: 'Identifier Code',
  },

  institution_country_id: {
    id: 'app.libraries.institution_country_id',
    defaultMessage: 'Institution Country',
  },

  institution_country_name: {
    id: 'app.libraries.institution_country_name',
    defaultMessage: 'Institution Country',
  },
  
  country_name: {
    id: 'app.libraries.country_name',
    defaultMessage: 'Country name',
  },

ill_referent_name: {
  id: 'app.libraries.ill_referent_name',
  defaultMessage: 'Ill referant name',
},

lat: {
  id: 'app.libraries.lat',
  defaultMessage: 'Latitude',
},

lon: {
  id: 'app.libraries.long',
  defaultMessage: 'Longtitude',
},

lon: {
  id: 'app.libraries.identifier_type_id',
  defaultMessage: 'Longtitude',
},

alt_name: {
  id: 'app.libraries.alt_name',
  defaultMessage: 'Alternative name',
},

suggested_institution_name: {
  id: 'app.libraries.suggested_institution_name',
  defaultMessage: 'Your institution Name',
},

institution_name: {
  id: 'app.libraries.institution_name',
  defaultMessage: 'Institution Name',
},

ill_help_other: {
  id: 'app.containers.RegisterNewLibrary.ill_help_other', 
  defaultMessage: 'Contact Hermes',
},
ill_service_conditions_other: {
  id: 'app.containers.RegisterNewLibrary.ill_service_conditions_other', 
  defaultMessage: 'ILL service to other libraries',
},
ill_service_conditions: {
  id: 'app.containers.RegisterNewLibrary.ill_service_conditions', 
  defaultMessage: 'ILL service conditions',
},
volunteer_library_label: {
  id: 'app.containers.RegisterNewLibrary.volunteer_library_label', 
  defaultMessage:  "Want to be a Volunteer Library?",
},
projects_label: {
  id: 'app.containers.RegisterNewLibrary.projects_label',
  defaultMessage: 'Project or Consortium',
},

identifiers_label: {
  id: 'app.containers.RegisterNewLibrary.identifiers_label',
  defaultMessage: 'Identifiers',
},

ill_institution_label: {
  id: 'app.containers.RegisterNewLibrary.ill_institution_label',
  defaultMessage: 'Institution',
},

library_contact_label: {
  id: 'app.containers.RegisterNewLibrary.library_contact_label',
  defaultMessage: 'Service contact',
},

library_location_label: {
  id: 'app.containers.RegisterNewLibrary.library_location_label',
  defaultMessage: 'Library location',
},

TextButtonList: {
  id: 'app.containers.RegisterNewLibrary.library_location_label',
  defaultMessage: 'TextButtonList',
},

library_coordinates_note: {
  id: 'app.containers.RegisterNewLibrary.library_coordinates_note',
  defaultMessage: 'This GPS coords are needed to display the library in a map',
},


library_coordinates: {
  id: 'app.containers.RegisterNewLibrary.library_coordinates',
  defaultMessage: 'Library location',
}, 

identifiers_id: {
  id: 'app.containers.RegisterNewLibrary.identifiers_id',
  defaultMessage: 'Identifiers Code',
}, 

project_id: {
  id: 'app.containers.RegisterNewLibrary.project_id',
  defaultMessage: 'Project',
},

subject_label: {
  id: 'app.containers.RegisterNewLibrary.subject_label',
  defaultMessage: 'Library disciplinary sector',
},

opac_label: {
  id: 'app.containers.RegisterNewLibrary.opac_label',
  defaultMessage: 'Library Online Catalog (OPAC)',
},


duplicate_identifer_type: {
  id: 'app.containers.RegisterNewLibrary.duplicate_identifer_type',
  defaultMessage: 'A second code for the same type cannot be added, kindly choose another identifier type',
},

});
