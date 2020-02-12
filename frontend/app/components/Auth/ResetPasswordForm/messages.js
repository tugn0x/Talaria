/*
 * LoginForm Messages
 *
 * This contains all the text for the LoginForm component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ResetPasswordForm';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Reset Password',
  },
  submitFormButton: {
    id: `${scope}.submitFormButton`,
    defaultMessage: 'Reset Password',
  }
});
