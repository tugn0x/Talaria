/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.InstitutionTypeListPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Institution Types list',
  },
  createNew: {
    id: `${scope}.createNew`,
    defaultMessage: 'New institution type',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit institution type',
  },
});
