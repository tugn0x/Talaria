/*
 * UserProfile Messages
 *
 * This contains all the text for the SignupForm component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.UserProfile';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Account Profile!',
  },
  subtitle: {
    id: `${scope}.subtitle`,
    defaultMessage: 'Update your profile',
  },
  address: {
    id: `${scope}.address`,
    defaultMessage: 'Address',
  },
  district: {
    id: `${scope}.district`,
    defaultMessage: 'District',
  },
  mobile: {
    id: `${scope}.mobile`,
    defaultMessage: 'Mobile',
  },
  phone: {
    id: `${scope}.phone`,
    defaultMessage: 'Phone',
  },
  state: {
    id: `${scope}.state`,
    defaultMessage: 'State',
  },
  postcode: {
    id: `${scope}.postcode`,
    defaultMessage: 'Postcode',
  },
  town: {
    id: `${scope}.town`,
    defaultMessage: 'Town',
  },
});
