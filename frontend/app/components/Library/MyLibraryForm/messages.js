/*
 * Library Form
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.LibraryForm';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Library form',
  },
  institution_id: {
    id: `${scope}.institution_id`,
    defaultMessage: "Institution ID",
  },
  subject_id: {
    id: `${scope}.subject_id`,
    defaultMessage: 'Subject ID',
  },
  country_id: {
    id: `${scope}.country_id`,
    defaultMessage: 'Country ID',
  },

  identifier_type_id: {
    id: `${scope}.identifier_type_id`,
    defaultMessage: 'identifier_type_id',
  },

  opac: {
    id: `${scope}.opac`,
    defaultMessage: 'Url opac',
  },
  ill_email: {
    id: `${scope}.ill_email`,
    defaultMessage: 'Email LL service',
  },
  ill_phone: {
    id: `${scope}.ill_phone`,
    defaultMessage: 'Phone LL service',
  },
  ill_supply_conditions: {
    id: `${scope}.ill_supply_conditions`,
    defaultMessage: 'Supply conditions',
  },
  ill_imbalance: {
    id: `${scope}.ill_imbalance`,
    defaultMessage: 'Imbalance',
  },
  ill_susp_date_start: {
    id: `${scope}.ill_susp_date_start`,
    defaultMessage: 'Susp start date',
  },
  ill_susp_date_end: {
    id: `${scope}.ill_susp_date_end`,
    defaultMessage: 'Susp end date',
  },
  ill_susp_notification_days: {
    id: `${scope}.ill_susp_notification_days`,
    defaultMessage: 'Susp notice days',
  },
  ill_cost: {
    id: `${scope}.ill_cost`,
    defaultMessage: 'ill_cost',
  },
  ill_user_cost: {
    id: `${scope}.ill_user_cost`,
    defaultMessage: 'ill_user_cost',
  },
  status: {
    id: `${scope}.status`,
    defaultMessage: 'status',
  },
  external: {
    id: `${scope}.external`,
    defaultMessage: 'external',
  },
  registration_date: {
    id: `${scope}.registration_date`,
    defaultMessage: 'Registration date',
  },
  vatnumber: {
    id: `app.global.vatnumber`,
    defaultMessage: 'PIVA',
  },
  fiscalcode: {
    id: `app.global.fiscalcode`,
    defaultMessage: 'CF',
  },
  invoice_header: {
    id: `app.global.invoice_header`,
    defaultMessage: 'invoice_header',
  },
  registration_date: {
    id: `${scope}.registration_date`,
    defaultMessage: 'Registration date',
  },
  email_pec: {
    id: `app.global.email_pec`,
    defaultMessage: 'email_pec',
  },
  ccu: {
    id: `app.global.ccu`,
    defaultMessage: 'ccu',
  },
  administrative: {
    id: `app.global.administrative`,
    defaultMessage: 'administrative',
  },
  administrative_email: {
    id: `app.global.administrative_email`,
    defaultMessage: 'administrative_email',
  },
  administrative_phone: {
    id: `app.global.administrative_phone`,
    defaultMessage: 'administrative_phone',
  },
  terzo_code: {
    id: `app.global.terzo_code`,
    defaultMessage: 'terzo_code',
  },
  general_info: {
    id: `${scope}.general_info`,
    defaultMessage: 'General info',
  },
  administrative_info: {
    id: `app.global.administrative_info`,
    defaultMessage: 'Administrative Info',
  },
  granted_permissions: {
    id: `${scope}.granted_permissions`,
    defaultMessage: 'Users permissions',
  },
  updateSubmitText: {
    id: `${scope}.updateSubmitText`,
    defaultMessage: 'Update Reference',
  },
  createSubmitText: {
    id: `${scope}.createSubmitText`,
    defaultMessage: 'Create Reference',
  },
});

