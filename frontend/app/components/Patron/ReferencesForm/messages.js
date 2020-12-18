/*
 * References Form Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.ReferenceForm';

export default defineMessages({
  headerNew: {
    id: `${scope}.headerNew`,
    defaultMessage: 'New Reference',
  },
  headerEdit: {
    id: `${scope}.headerEdit`,
    defaultMessage: 'Edit Reference',
  },  
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Insert/Edit reference',
  },
  headerImport: {
    id: `${scope}.headerImport`,
    defaultMessage: 'Import Reference',
  },
  bodySearch: {
    id: `${scope}.bodySearch`,
    defaultMessage: 'Search a reference using DOI, PMI or ISBN',
  },
  goToForm: {
    id: `${scope}.goToForm`,
    defaultMessage: 'Or fill the form manually',
  },
  goToFormButton: {
    id: `${scope}.goToFormButton`,
    defaultMessage: 'Go to form',
  },
  inputPlaceHolder: {
    id: `${scope}.inputPlaceHolder`,
    defaultMessage: 'Es: 10.1002/hlca.19740570315',
  },
});

