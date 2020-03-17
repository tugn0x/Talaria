/*
 * InstitutionsList Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.InstitutionsList';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Institutions list',
  },
  createNewInstitution: {
    id: `${scope}.createNewInstitution`,
    defaultMessage: 'Register new institution',
  },
  editInstitution: {
    id: `${scope}.editInstitution`,
    defaultMessage: 'Edit institution',
  },
});
