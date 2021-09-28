/*
 * Patron saga Messages
 *
 * This contains all the text for the Patron container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ReferencePage';

export default defineMessages({
  headerDetail: {
    id: `${scope}.headerDetail`,
    defaultMessage: 'Reference Detail',
  },
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
  referenceAdded: {
    id: `${scope}.referenceAdded`,
    defaultMessage: 'Reference added',
  },
  referenceUpdate: {
    id: `${scope}.referenceUpdate`,
    defaultMessage: 'Reference updated',
  },
});
