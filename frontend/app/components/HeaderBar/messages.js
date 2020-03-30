/*
 * HeaderBar Messages
 *
 * This contains all the text for the HeaderBar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.HeaderBar';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the HeaderBar component!',
  },
  UserAccount: {
    id: `${scope}.UserAccount`,
    defaultMessage: 'User Account',
  },
  Profile: {
    id: `${scope}.Profile`,
    defaultMessage: 'Profile',
  },
  ChangePassword: {
    id: `${scope}.ChangePassword`,
    defaultMessage: 'Change Password',
  },
  libraries: {
    id: `${scope}.libraries`,
    defaultMessage: 'Libraries',
  },
  institutions: {
    id: `${scope}.institutions`,
    defaultMessage: 'Institutions',
  },
  projects: {
    id: `${scope}.projects`,
    defaultMessage: 'Projects',
  },
  consortia: {
    id: `${scope}.consortia`,
    defaultMessage: 'Consortia',
  },
  Logout: {
    id: `${scope}.Logout`,
    defaultMessage: 'Logout',
  },
});
