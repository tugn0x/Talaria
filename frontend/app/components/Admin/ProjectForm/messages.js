/*
 * Institution Form
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.ProjectForm';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Project form',
  },
  active: {
    id: `app.components.ProjectForm.active`,
    defaultMessage: 'Active',
  },
  granted_permissions: {
    id: `${scope}.granted_permissions`,
    defaultMessage: 'Users permissions',
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
    id: `app.components.ProjectForm.general_info`,
    defaultMessage: 'General info',
  },
  administrative_info: {
    id: `app.global.administrative_info`,
    defaultMessage: 'Administrative Info',
  },
  updateSubmitText: {
    id: `${scope}.updateSubmitText`,
    defaultMessage: 'Update Project',
  },
  createSubmitText: {
    id: `${scope}.createSubmitText`,
    defaultMessage: 'Create Project',
  },
});

