/*
 * References Form
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.PickupsList';

export default defineMessages({
  createNewPickup: {
    id: `${scope}.createNewPickup`,
    defaultMessage: 'Create new pickup',
  },
  PickupsNotFound: {
    id: `${scope}.PickupsNotFound`,
    defaultMessage: 'Pickup not found',
  },  
});

