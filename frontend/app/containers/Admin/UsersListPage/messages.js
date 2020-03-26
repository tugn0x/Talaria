/*
 * UsersListPage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.UsersListPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Users list',
  },
  createNew: {
    id: `${scope}.createNew`,
    defaultMessage: 'Register new user',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit user',
  },
});
