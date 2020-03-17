/*
 * Institution Form
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.InstitutionForm';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Institution form',
  },
  institution_type_id: {
    id: `${scope}.institution_type_id`,
    defaultMessage: "Institution Type ID",
  },
  country_id: {
    id: `${scope}.country_id`,
    defaultMessage: 'Country ID',
  },
  vatnumber: {
    id: `${scope}.vatnumber`,
    defaultMessage: 'PIVA',
  },
  fiscalcode: {
    id: `${scope}.fiscalcode`,
    defaultMessage: 'CF',
  },
  invoice_header: {
    id: `${scope}.invoice_header`,
    defaultMessage: 'invoice_header',
  },
  registration_date: {
    id: `${scope}.registration_date`,
    defaultMessage: 'Registration date',
  },
  email_pec: {
    id: `${scope}.email_pec`,
    defaultMessage: 'email_pec',
  },
  ccu: {
    id: `${scope}.ccu`,
    defaultMessage: 'ccu',
  },
  administrative: {
    id: `${scope}.administrative`,
    defaultMessage: 'administrative',
  },
  administrative_email: {
    id: `${scope}.administrative_email`,
    defaultMessage: 'administrative_email',
  },
  administrative_phone: {
    id: `${scope}.administrative_phone`,
    defaultMessage: 'administrative_phone',
  },
  terzo_code: {
    id: `${scope}.terzo_code`,
    defaultMessage: 'terzo_code',
  },
  general_info: {
    id: `${scope}.general_info`,
    defaultMessage: 'General info',
  },
  administrative_info: {
    id: `${scope}.administrative_info`,
    defaultMessage: 'Administrative Info',
  },
  updateSubmitText: {
    id: `${scope}.updateSubmitText`,
    defaultMessage: 'Update Institution',
  },
  createSubmitText: {
    id: `${scope}.createSubmitText`,
    defaultMessage: 'Create Institution',
  },
});

