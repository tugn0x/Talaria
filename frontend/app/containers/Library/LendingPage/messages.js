/*
 * References Form
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LendingPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Pending requests',
  },
  headerArchive: {
    id: `${scope}.headerArchive`,
    defaultMessage: 'Archived requests',
  },
  
});
