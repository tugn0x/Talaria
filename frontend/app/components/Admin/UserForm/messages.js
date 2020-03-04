/*
 * userForm Messages
 *
 * 
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.UserForm';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'User Form',
  },
  subtitle: {
    id: `${scope}.subtitle`,
    defaultMessage: 'Update user',
  },
  createNewUser: {
    id: `${scope}.createNewUser`,
    defaultMessage: 'Create new user',
  },
  editUser: {
    id: `${scope}.editUser`,
    defaultMessage: 'Edit user',
  },
});
