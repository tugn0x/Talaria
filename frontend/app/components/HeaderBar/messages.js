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
    id: `app.routes.Libraries`,
    // defaultMessage: 'Libraries',
  },
  institutions: {
    id: `app.routes.Institutions`,
    // defaultMessage: 'Institutions',
  },
  projects: {
    id: `app.routes.Projects`,
   // defaultMessage: 'Projects',
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
