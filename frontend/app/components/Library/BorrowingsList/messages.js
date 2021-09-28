/*
 * References Form
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.BorrowingsList';

export default defineMessages({
  createNewBorrowing: {
    id: `${scope}.createNewBorrowing`,
    defaultMessage: 'Create new borrowing',
  },
  BorrowingsNotFound: {
    id: `${scope}.BorrowingsNotFound`,
    defaultMessage: 'Borrowing not found',
  },
  ResetAll: {
    id: `app.global.resetAll`,
  },
  BorrowingSelected: {
    id: `${scope}.BorrowingSelected`,
    defaultMessage: 'Selected',
  },
});

