/*
 * ReferencesListPage Messages
 *
 * 
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ReferencesListPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'References list',
  },
  createNew: {
    id: `${scope}.createNew`,
    defaultMessage: 'New reference',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit reference',
  },
  labels: {
    id: `${scope}.labels`,
    defaultMessage: 'Labels',
  },
  groups: {
    id: `${scope}.groups`,
    defaultMessage: 'Categories',
  },
  confirm:{
    id: 'app.global.confirm',
    defaultMessage: 'Confirm',
  },
  askRemoveLabelMessage:{
    id: 'app.global.removeLabelMessage',
    defaultMessage: 'Remove this label from this reference?',
  },
  askRemoveGroupMessage:{
    id: 'app.global.removeGroupMessage',
    defaultMessage: 'Remove this category from this reference?',
  },
  removedMessage:{
    id: 'app.global.removedMessage',
    defaultMessage: 'Successfully removed',
  },
  addedMessage:{
    id: 'app.global.addedMessage',
    defaultMessage: 'Successfully added',
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
