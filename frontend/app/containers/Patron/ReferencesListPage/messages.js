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
});
