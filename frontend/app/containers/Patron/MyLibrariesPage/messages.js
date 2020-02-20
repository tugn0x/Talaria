/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.MyLibrariesPage';

export default defineMessages({
  updateMessage: {
    id: `${scope}.updateMessage`,
    defaultMessage: 'Profile Updated',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'My Libraries Form',
  },
  selectLibrary: {
    id: `${scope}.selectLibrary`,
    defaultMessage: 'Select library',
  },
});
