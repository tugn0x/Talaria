/*
 * ReferencesLabels Messages
 *
 * 
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ReferencesLabels';

export default defineMessages({
  labels: {
    id: `app.containers.ReferencesListPage.labels`,
    defaultMessage: 'Labels',
  },
  labelCreateNew: {
    id: `${scope}.labelCreateNew`,
    defaultMessage: 'Create new label',
  },
  labelRemoveMessage: {
    id: `${scope}.labelRemoveMessage`,
    defaultMessage: 'Label successfully removed',
  },
  labelUpdateMessage: {
    id: `${scope}.labelUpdateMessage`,
    defaultMessage: 'Label successfully updated',
  },
  labelCreateMessage: {
    id: `${scope}.labelCreateMessage`,
    defaultMessage: 'Label successfully created',
  },
});
