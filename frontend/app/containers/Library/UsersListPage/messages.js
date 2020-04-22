/*
 * Library UserListPage Messages
 *
 * This contains all the text for the Library UserListPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LibraryUsersListPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Users list',
  },
  name: {
    id: 'app.global.name',
    defaultMessage: 'Nome',
  },
  created_at: { 
    id: 'app.global.created_at', 
    defaultMessage: 'created_at',
  },
  department_id: {
    id: 'app.global.department',
    defaultMessage: 'Department',
  },
  department_name: {
    id: 'app.global.department',
    defaultMessage: 'Department',
  },
  title_id: {
    id: 'app.global.title',
    defaultMessage: 'Title',
  },
  title_name: {
    id: 'app.global.title',
    defaultMessage: 'Title',
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
  status: {
    id: 'app.global.status',
    defaultMessage: 'Status',
  },
  statusUpdateMessage: {
    id: `${scope}.statusUpdateMessage`,
    defaultMessage: 'Status updated',
  },
  createNew: {
    id: `${scope}.createNew`,
    defaultMessage: 'Add user',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit',
  },
});
