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
    id: `app.components.LibraryForm.country_id`,
    defaultMessage: 'Country ID',
  },
  vatnumber: {
    id: `app.components.LibraryForm.vatnumber`,
    defaultMessage: 'PIVA',
  },
  fiscalcode: {
    id: `app.components.LibraryForm.fiscalcode`,
    defaultMessage: 'CF',
  },
  invoice_header: {
    id: `app.components.LibraryForm.invoice_header`,
    defaultMessage: 'invoice_header',
  },
  email_pec: {
    id: `app.components.LibraryForm.email_pec`,
    defaultMessage: 'email_pec',
  },
  ccu: {
    id: `app.components.LibraryForm.ccu`,
    defaultMessage: 'ccu',
  },
  administrative: {
    id: `app.components.LibraryForm.administrative`,
    defaultMessage: 'administrative',
  },
  administrative_email: {
    id: `app.components.LibraryForm.administrative_email`,
    defaultMessage: 'administrative_email',
  },
  administrative_phone: {
    id: `app.components.LibraryForm.administrative_phone`,
    defaultMessage: 'administrative_phone',
  },
  terzo_code: {
    id: `app.components.LibraryForm.terzo_code`,
    defaultMessage: 'terzo_code',
  },
  general_info: {
    id: `app.components.LibraryForm.general_info`,
    defaultMessage: 'General info',
  },
  administrative_info: {
    id: `app.components.LibraryForm.administrative_info`,
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

