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
  labelAs: {
    id: `${scope}.labelAs`,
    defaultMessage: 'Label as',
  },
  groups: {
    id: `${scope}.groups`,
    defaultMessage: 'Categories',
  },
  groupAs: {
    id: `${scope}.groupAs`,
    defaultMessage: 'Group as',
  },
  createNewLabel: {
    id: `${scope}.createNewLabel`,
    defaultMessage: 'Create new',
  },
  confirm:{
    id: 'app.global.confirm',
    defaultMessage: 'Confirm',
  },
  askRemoveLabelMessage:{
    id: `${scope}.removeLabelMessage`,
    defaultMessage: 'Remove this label from this reference?',
  },
  askRemoveGroupMessage:{
    id: `${scope}.removeGroupMessage`,
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
  OAfoundAndUpdateMessage: {
    id: `${scope}.OAfoundAndUpdateMessage`,
    defaultMessage: 'Versione OA trovata. Riferimento aggiornato.',
  },
  OAnotfoundAndUpdateMessage: {
    id: `${scope}.OAnotfoundAndUpdateMessage`,
    defaultMessage: 'Versione OA NON trovata. Riferimento non aggiornato.',
  }
});
