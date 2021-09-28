/*
 * References Form
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.BorrowingRequestPage';

export default defineMessages({
  headerNew: {
    id: `${scope}.headerNew`,
    defaultMessage: 'New request',
  },
  headerEdit: {
    id: `${scope}.headerEdit`,
    defaultMessage: 'Edit request',
  },
  headerDetail: {
    id: `${scope}.headerDetail`,
    defaultMessage: 'Request detail',
  },
  
});

