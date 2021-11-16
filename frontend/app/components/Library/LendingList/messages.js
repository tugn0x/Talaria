/*
 * References Form
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.LendingsList';

export default defineMessages({
  createNewLending: {
    id: `${scope}.createNewLending`,
    defaultMessage: 'Create new lending',
  },
  LendingsNotFound: {
    id: `${scope}.LendingsNotFound`,
    defaultMessage: 'Lending not found',
  },
  ResetAll: {
    id: `app.global.resetAll`,
  },
  LendingSelected: {
    id: `${scope}.LendingSelected`,
    defaultMessage: 'Selected',
  },
});

