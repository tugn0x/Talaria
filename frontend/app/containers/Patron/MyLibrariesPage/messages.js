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
  librariesList: {
    id: `${scope}.librariesList`,
    defaultMessage: 'Select library',
  },
});
