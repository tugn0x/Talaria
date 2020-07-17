/*
 * References Form
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.RequestItem';

export default defineMessages({
  requested: {
    id: `${scope}.requested`,
    defaultMessage: 'Requested',
  },
  received: {
    id: `${scope}.received`,
    defaultMessage: 'Received',
  },
  notReceived: {
    id: `${scope}.notReceived`,
    defaultMessage: 'Not Received',
  },
});

