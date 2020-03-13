/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.SimpleList';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Simple list',
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
