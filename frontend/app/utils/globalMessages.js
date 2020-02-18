/*
 * Global Messages
 *
 * 
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.global';

export default defineMessages({
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name',
  },
  surname: {
    id: `${scope}.surname`,
    defaultMessage: 'Surname',
  },
  password_repeat: {
    id: `${scope}.password_repeat`,
    defaultMessage: 'Repeat password',
  },
  invalid_name: {
    id: `${scope}.invalid_name`,
    defaultMessage: 'Please choose a username',
  },
  invalid_surname: {
    id: `${scope}.invalid_surname`,
    defaultMessage: 'Please choose a surname',
  },
  invalid_email: {
    id: `${scope}.invalid_email`,
    defaultMessage: 'Please provide a valid email',
  },
  password_match: {
    id: `${scope}.password_match`,
    defaultMessage: 'Password must match',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
  },
});
