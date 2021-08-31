/*
 * References Form Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.ReferenceForm';

export default defineMessages({
  headerNew: {
    id: `${scope}.headerNew`,
    defaultMessage: 'New Reference',
  },
  headerEdit: {
    id: `${scope}.headerEdit`,
    defaultMessage: 'Edit Reference',
  },  
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Insert/Edit reference',
  },  
});

