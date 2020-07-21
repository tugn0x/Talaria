/*
 * Patron saga Messages
 *
 * This contains all the text for the Patron container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.RequestPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Requests form',
  },
  headerDetail: {
    id: `${scope}.headerDetail`,
    defaultMessage: 'Request Detail',
  },
  requestAdded: {
    id: `${scope}.requestAdded`,
    defaultMessage: 'Request added',
  },
  requestUpdate: {
    id: `${scope}.requestUpdate`,
    defaultMessage: 'Request updated',
  },
  updateSubmitText: {
    id: `${scope}.updateSubmitText`,
    defaultMessage: 'Update Request',
  },
  createSubmitText: {
    id: `${scope}.createSubmitText`,
    defaultMessage: 'Create Request',
  },
});
