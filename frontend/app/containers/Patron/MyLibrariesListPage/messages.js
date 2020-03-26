/*
 * MyLibrariesListPage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.MyLibrariesListPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'My Libraries list',
  },
  createNew: {
    id: `${scope}.createNew`,
    defaultMessage: 'Request new library',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit library',
  },
});
