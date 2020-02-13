/*
 * LoginForm Messages
 *
 * This contains all the text for the LoginForm component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ForgotPasswordForm';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Forgot Password',
  },
  submitFormButton: {
    id: `${scope}.submitFormButton`,
    defaultMessage: 'Request Password',
  }
});
