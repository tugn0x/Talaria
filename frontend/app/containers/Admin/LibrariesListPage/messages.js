/*
 * LibrariesListPage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LibrariesListPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Libraries list',
  },
  createNew: {
    id: `${scope}.createNew`,
    defaultMessage: 'Register new library',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit library',
  },
  confirm:{
    id: 'app.global.confirm',
    defaultMessage: 'Confirm',
  },
  askDeleteMessage:{
    id: 'app.global.deleteMessage',
    defaultMessage: 'Delete this item?',
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
