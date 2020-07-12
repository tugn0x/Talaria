/*
 * References Form
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.ReferencesList';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'References',
  },
  createNewReference: {
    id: `${scope}.createNewReference`,
    defaultMessage: 'Create new reference',
  },
  ReferencesNotFound: {
    id: `${scope}.ReferencesNotFound`,
    defaultMessage: 'References not found',
  },
  ResetAll: {
    id: `app.global.resetAll`,
  },
});

