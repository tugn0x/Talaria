/*
 * SignupForm Messages
 *
 * This contains all the text for the SignupForm component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.SignupForm';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Sign up! HOHOHOH',
  },
  subtitle: {
    id: `${scope}.subtitle`,
    defaultMessage: 'Create a profile! HOHOHOH',
  },
  passwordConfirmation: {
    id: `${scope}.passwordConfirmation`,
    defaultMessage: 'ripeti la passwortd, mò',
  },
});
