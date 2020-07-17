/*
 * ReferencesGroups Messages
 *
 * 
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ReferencesGroups';

export default defineMessages({
  groups: {
    id: `app.containers.ReferencesListPage.groups`,
    defaultMessage: 'Labels',
  },
  groupCreateNew: {
    id: `${scope}.groupCreateNew`,
    defaultMessage: 'Create new group',
  },
  groupRemoveMessage: {
    id: `${scope}.groupRemoveMessage`,
    defaultMessage: 'Label successfully removed',
  },
  groupUpdateMessage: {
    id: `${scope}.groupUpdateMessage`,
    defaultMessage: 'Label successfully updated',
  },
  groupCreateMessage: {
    id: `${scope}.groupCreateMessage`,
    defaultMessage: 'Label successfully created',
  },
});
