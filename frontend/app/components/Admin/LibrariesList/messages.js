/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.LibrariesList';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Libraries list',
  },
  LibrariesNotFound: {
    id: `${scope}.LibrariesNotFound`,
    defaultMessage: 'No libraries',
  },
  ResetAll: {
    id: `app.global.resetAll`,
  },
  LibrarySelected: {
    id: `${scope}.LibrarySelected`,
    defaultMessage: 'Selected',
  },
});
