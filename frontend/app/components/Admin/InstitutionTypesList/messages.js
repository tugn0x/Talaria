/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.InstitutionTypesList';

export default defineMessages({
  InstitutionTypesNotFound: {
    id: `${scope}.InstitutionTypesNotFound`,
    defaultMessage: 'No institutions',
  },
  ResetAll: {
    id: `app.global.resetAll`,
  },
  InstitutionTypeSelected: {
    id: `${scope}.InstitutionTypeSelected`,
    defaultMessage: 'Selected',
  },
});
