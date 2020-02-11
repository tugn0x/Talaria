/*
 * LoginForm Messages
 *
 * This contains all the text for the LoginForm component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.LoginForm';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Login',
  },
  loginButton: {
    id: `${scope}.loginButton`,
    defaultMessage: 'Login',
  },
  loginDescription: {
    id: `${scope}.loginDescription`,
    defaultMessage: 'Sign In to your account',
  },
  register: {
    id: `${scope}.signup`,
    defaultMessage: 'Register now',
  },
});
