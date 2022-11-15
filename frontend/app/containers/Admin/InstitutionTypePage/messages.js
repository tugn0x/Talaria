/*
 * InstitutionPage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.InstitutionTypePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Institution Page',
  },
  createSuccess: {
    id: `${scope}.createSuccess`,
    defaultMessage: 'New institution created',
  },
  updateSuccess: {
    id: `${scope}.updateSuccess`,
    defaultMessage: 'Institution updated',
  },
});
