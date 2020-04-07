/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.MyLibrariesPage';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Add a new library',
  },
  library_id: {
    id: `${scope}.library_id`,
    defaultMessage: 'Select library',
  }
});
