import { defineMessages } from 'react-intl';

export const scope = 'app.components.OASearchReferenceForm';

export default defineMessages({  
goToForm: {
    id: `${scope}.goToForm`,
    defaultMessage: 'Or fill the form manually',
},
goToFormButton: {
    id: `${scope}.goToFormButton`,
    defaultMessage: 'Go to form',
},
resetSearchButton: {
    id: `${scope}.resetSearchButton`,
    defaultMessage: 'clear',
},
bodySearch: {
    id: `${scope}.bodySearch`,
    defaultMessage: 'Search a reference using DOI, PMI or ISBN',
  },  
  inputPlaceHolder: {
    id: `${scope}.inputPlaceHolder`,
    defaultMessage: 'Es: 10.1002/hlca.19740570315',
  },

});