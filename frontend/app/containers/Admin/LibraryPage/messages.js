/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LibraryPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Library Page',
  },
  updateMessage: {
    id: `${scope}.updateMessage`,
    defaultMessage: 'Library updated',
  },
  createMessage: {
    id: `${scope}.createMessage`,
    defaultMessage: 'Library created',
  },
  titleNewLibrary: {
    id: `${scope}.titleNewLibrary`,
    defaultMessage: 'Register new library',
  },
});
