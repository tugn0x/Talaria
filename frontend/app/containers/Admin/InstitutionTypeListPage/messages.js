/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.InstitutionTypeListPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Institution Types list',
  },
  createNew: {
    id: `${scope}.createNew`,
    defaultMessage: 'Create new',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit',
  },
});
