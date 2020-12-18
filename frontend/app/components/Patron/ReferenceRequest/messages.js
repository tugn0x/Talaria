/*
 * References Form Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.ReferenceRequest';

export default defineMessages({
  headerRequest: {
    id: `${scope}.headerRequest`,
    defaultMessage: 'Request status',
  },  
  prevRequests: {
    id: `${scope}.prevRequests`,
    defaultMessage: 'Previous/current requests',
  },  
  cannotRequestError: {
    id: `${scope}.cannotRequestError`,
    defaultMessage: 'Reference already actually requested!'
  }
});

