/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.UsersList';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Users',
  },
  editUser: {
    id: `${scope}.editUser`,
    defaultMessage: 'Update user',
  },
});
