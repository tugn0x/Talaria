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
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
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
  update: {
    id: `${scope}.update`,
    defaultMessage: 'Update',
  },
});
