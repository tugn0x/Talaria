/*
 * LibrariesListPage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LibrariesListPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Libraries list',
  },
  createNew: {
    id: `${scope}.createNew`,
    defaultMessage: 'Register new library',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit library',
  },
});
