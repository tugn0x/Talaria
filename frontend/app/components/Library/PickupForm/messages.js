/*
 * Library Form
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.PickupForm';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Pickup form',
  },  
  country_id: {
    id: `${scope}.country_id`,
    defaultMessage: 'Country ID',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
  },
  phone: {
    id: `${scope}.phone`,
    defaultMessage: 'Phone',
  },
  openinghours: {
    id: `${scope}.openinghours`,
    defaultMessage: 'Opening hours',
  },
  address: {
    id: `${scope}.address`,
    defaultMessage: 'Address',
  },
  town: {
    id: `${scope}.town`,
    defaultMessage: 'Town',
  },
  district: {
    id: `${scope}.district`,
    defaultMessage: 'District',
  },
  postcode: {
    id: `${scope}.postcode`,
    defaultMessage: 'Postcode',
  },
  state: {
    id: `${scope}.state`,
    defaultMessage: 'State',
  },  
  updateSubmitText: {
    id: `${scope}.updateSubmitText`,
    defaultMessage: 'Update pickup',
  },
  createSubmitText: {
    id: `${scope}.createSubmitText`,
    defaultMessage: 'Create pickup',
  },
});

