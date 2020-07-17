/*
 * References Form
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.RequestsList';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Pending requests',
  },
  createNewRequest: {
    id: `${scope}.createNewRequest`,
    defaultMessage: 'Create new request',
  },
  RequestsNotFound: {
    id: `${scope}.RequestsNotFound`,
    defaultMessage: 'Requests not found',
  },
  ResetAll: {
    id: `app.global.resetAll`,
  },
  RequestSelected: {
    id: `${scope}.RequestSelected`,
    defaultMessage: 'Selected',
  },
});

