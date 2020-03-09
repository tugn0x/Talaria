/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.MyLibrariesList';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'My Libraries',
  },
  createNewLibrary: {
    id: `${scope}.createNewLibrary`,
    defaultMessage: 'Create new library',
  },
  editLibrary: {
    id: `${scope}.editLibrary`,
    defaultMessage: 'Update library',
  },
});
