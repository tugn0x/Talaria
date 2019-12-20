/*
 * HeaderBar Messages
 *
 * This contains all the text for the HeaderBar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.HeaderBar';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the HeaderBar component!',
  },
});
