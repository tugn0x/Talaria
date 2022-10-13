/*
 * LibrariesListPage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.InstitutionsListPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Institutions list',
  },
  createNew: {
    id: `${scope}.createNew`,
    defaultMessage: 'Register new institution',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit institution',
  },
});
