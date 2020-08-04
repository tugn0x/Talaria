/*
 * ReferencesListPage Messages
 *
 * 
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.RequestsListPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Pending requests',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit request',
  },
  labels: {
    id: 'app.containers.ReferencesListPage.labels',
    defaultMessage: 'Labels',
  },
  labelAs: {
    id: 'app.containers.ReferencesListPage.labelAs',
    defaultMessage: 'Label as',
  },
  groups: {
    id: 'app.containers.ReferencesListPage.groups',
    defaultMessage: 'Categories',
  },
  groupAs: {
    id: 'app.containers.ReferencesListPage.groupAs',
    defaultMessage: 'Group as',
  },
  createNewLabel: {
    id: 'app.containers.ReferencesListPage.createNewLabel',
    defaultMessage: '(Create new)',
  },
  confirm:{
    id: 'app.global.confirm',
    defaultMessage: 'Confirm',
  },
  askRemoveLabelMessage:{
    id: 'app.containers.ReferencesListPage.removeLabelMessage',
    defaultMessage: 'Remove this label from this reference?',
  },
  askRemoveGroupMessage:{
    id: 'app.containers.ReferencesListPage.removeGroupMessage',
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
  askArchiveRequestMessage:{
    id: `${scope}.askArchiveRequestMessage`,
    defaultMessage: 'Archive this request?',
  },
  archivedMessage:{
    id: 'app.global.archivedMessage',
    defaultMessage: 'Successfully archived',
  },
  askCancelRequestMessage:{
    id: `${scope}.askCancelRequestMessage`,
    defaultMessage: 'Cancel this request?',
  },
  canceledMessage:{
    id: 'app.global.canceledMessage',
    defaultMessage: 'Successfully canceled',
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
