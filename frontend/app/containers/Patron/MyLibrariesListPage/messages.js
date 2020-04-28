/*
 * MyLibrariesListPage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.MyLibrariesListPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'My Libraries',
  },
  createNew: {
    id: `${scope}.createNew`,
    defaultMessage: 'Add library',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Change library',
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
