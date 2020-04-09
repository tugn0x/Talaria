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
    id: `app.components.ProjectForm.vatnumber`,
    defaultMessage: 'PIVA',
  },
  fiscalcode: {
    id: `app.components.ProjectForm.fiscalcode`,
    defaultMessage: 'CF',
  },
  invoice_header: {
    id: `app.components.ProjectForm.invoice_header`,
    defaultMessage: 'invoice_header',
  },
  email_pec: {
    id: `app.components.ProjectForm.email_pec`,
    defaultMessage: 'email_pec',
  },
  ccu: {
    id: `app.components.ProjectForm.ccu`,
    defaultMessage: 'ccu',
  },
  administrative: {
    id: `app.components.ProjectForm.administrative`,
    defaultMessage: 'administrative',
  },
  administrative_email: {
    id: `app.components.ProjectForm.administrative_email`,
    defaultMessage: 'administrative_email',
  },
  administrative_phone: {
    id: `app.components.ProjectForm.administrative_phone`,
    defaultMessage: 'administrative_phone',
  },
  terzo_code: {
    id: `app.components.ProjectForm.terzo_code`,
    defaultMessage: 'terzo_code',
  },
  general_info: {
    id: `app.components.ProjectForm.general_info`,
    defaultMessage: 'General info',
  },
  administrative_info: {
    id: `app.components.ProjectForm.administrative_info`,
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

