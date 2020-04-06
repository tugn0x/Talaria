/*
 * RegisterLibrary Messages
 *
 * This contains all the text for the Footer component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.RegisterNewLibrary';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Register new public library',
  },
  link: {
    id: `${scope}.link`,
    defaultMessage: 'Register new library',
  },
  step_1: {
    id: `${scope}.step_1`,
    defaultMessage: `Insert library's general data`,
  },
  step_2: {
    id: `${scope}.step_2`,
    defaultMessage: `Insert library's general data 2`,
  },
  step_3: {
    id: `${scope}.step_3`,
    defaultMessage: `Insert library's administrative data`,
  },
  step_4: {
    id: `${scope}.step_4`,
    defaultMessage: `Summary`,
  },
  createMessage: {
    id: `${scope}.createMessage`,
    defaultMessage: `Public Library created`,
  },
});
