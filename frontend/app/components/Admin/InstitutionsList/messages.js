/*
 * HomePage Messages
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
  InstitutionsNotFound: {
    id: `${scope}.InstitutionsNotFound`,
    defaultMessage: 'No institutions',
  },
  ResetAll: {
    id: `app.global.resetAll`,
  },
  InstitutionSelected: {
    id: `${scope}.InstitutionSelected`,
    defaultMessage: 'Selected',
  },
});
