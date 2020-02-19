/*
 * BasePage Messages
 *
 * This contains all the text for the BasePage component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.BasePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the BasePage component!',
  },
});
