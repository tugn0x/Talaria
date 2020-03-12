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
  createNewLibrary: {
    id: `${scope}.createNewLibrary`,
    defaultMessage: 'Register new library',
  },
  LibraryCreateNew: {
    id: `${scope}.LibraryCreateNew`,
    defaultMessage: 'Register new library',
  },
  editLibrary: {
    id: `${scope}.editLibrary`,
    defaultMessage: 'Edit library',
  },
});
