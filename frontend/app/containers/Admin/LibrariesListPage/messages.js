/*
 * LibrariesListPage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.LibrariesListPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Libraries list',
  },
  createNew: {
    id: `${scope}.createNew`,
    defaultMessage: 'Create new',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit',
  },
});
