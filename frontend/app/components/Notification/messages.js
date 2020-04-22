/*
 * Notification Messages
 *
 *
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Notification';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Notification',
  },
  mark_all_as_read: {
    id: `${scope}.mark_all_as_read`,
    defaultMessage: 'Mark all as read',
  },
});
