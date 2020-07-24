/*
 * References Form Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.ReferenceForm';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'New Reference',
  },
  bodySearch: {
    id: `${scope}.bodySearch`,
    defaultMessage: 'Search a reference using DOI, PMI or ISBN',
  },
  goToForm: {
    id: `${scope}.goToForm`,
    defaultMessage: 'Or fill the formmanually',
  },
});

