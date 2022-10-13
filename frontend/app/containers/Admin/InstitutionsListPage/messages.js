/*
 * LibrariesListPage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.InstitutionsListPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Institutions list',
  },
  createNew: {
    id: `${scope}.createNew`,
    defaultMessage: 'Register new institution',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit institution',
  },
  confirm:{
    id: 'app.global.confirm',
    defaultMessage: 'Confirm',
  },
  askDeleteMessage:{
    id: 'app.global.deleteMessage',
    defaultMessage: 'Delete this item?',
  },
  askChangeStatusMessage:{
    id: 'app.global.changeStatusMessage',
    defaultMessage: 'Apply this status?',
  },
  statusAppliedMessage:{
    id: 'app.global.statusAppliedMessage',
    defaultMessage: 'Status changed',
  },
  deletedMessage:{
    id: 'app.global.deletedMessage',
    defaultMessage: 'Item deleted',
  },
  yes:{
    id: 'app.global.yes',
    defaultMessage: 'Yes',
  },
  no:{
    id: 'app.global.no',
    defaultMessage: 'No',
  },



  
});
