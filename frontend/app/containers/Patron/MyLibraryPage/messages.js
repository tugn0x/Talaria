/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.MyLibrariesPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'My Library',
  },
  headerNew: {
    id: `${scope}.headerNew`,
    defaultMessage: 'New Library',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Add a new library',
  },
  library_id: {
    id: `${scope}.library_id`,
    defaultMessage: 'Select library',
  },
  name: {
    id: 'app.global.library',
    defaultMessage: 'Library',
  },
  label: {
    id: 'app.global.label',
    defaultMessage: 'Label',
  },
  department_id: {
    id: `${scope}.department_id`,
    defaultMessage: 'Select department',
  },
  title_id: {
    id: `${scope}.title_id`,
    defaultMessage: 'Select Title',
  },
  user_referent:{
    id: `${scope}.user_referent`,
    defaultMessage: 'Referent',
  },
  user_mat:{
    id: `${scope}.user_mat`,
    defaultMessage: 'Matricola',
  },
  user_service_phone:{
    id: `${scope}.user_service_phone`,
    defaultMessage: 'Service phone',
  },
  user_service_email:{
    id: `${scope}.user_service_email`,
    defaultMessage: 'Service email',
  },
  preferred: {
    id: 'app.global.preferred',
    defaultMessage: 'Preferred',
  },
  status: {
    id: 'app.global.status',
    defaultMessage: 'Status',
  },
  libraryUpdateMessage: {
    id: `${scope}.updateMessage`,
    defaultMessage: 'Library updated',
  },
  libraryCreateMessage: {
    id: `${scope}.createMessage`,
    defaultMessage: 'Library added',
  },

});
