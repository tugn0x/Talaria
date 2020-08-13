/*
 * Patron saga Messages
 *
 * This contains all the text for the Patron container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.RequestPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Requests form',
  },
  headerDetail: {
    id: `${scope}.headerDetail`,
    defaultMessage: 'Request Detail',
  },
  requestAdded: {
    id: `${scope}.requestAdded`,
    defaultMessage: 'Request added',
  },
  requestUpdate: {
    id: `${scope}.requestUpdate`,
    defaultMessage: 'Request updated',
  },
  updateSubmitText: {
    id: `${scope}.updateSubmitText`,
    defaultMessage: 'Update Request',
  },
  createSubmitText: {
    id: `${scope}.createSubmitText`,
    defaultMessage: 'Create Request',
  },
  requested: {
    id: `${scope}.requested`,
    defaultMessage: 'Requested',
  },
  received: {
    id: `${scope}.received`,
    defaultMessage: 'Received',
  },
  fileReceived: {
    id: `${scope}.fileReceived`,
    defaultMessage: 'File Received',
  },
  notReceived: {
    id: `${scope}.notReceived`,
    defaultMessage: 'Not Received',
  },
  userAskCancel: {
    id: `${scope}.userAskCancel`,
    defaultMessage: 'Cancel requested',
  },
  canceled: {
    id: `${scope}.canceled`,
    defaultMessage: 'Canceled',
  },
  waitingForCost: {
    id: `${scope}.waitingForCost`,
    defaultMessage: 'Cost approval requested',
  },
  costAccepted: {
    id: `${scope}.costAccepted`,
    defaultMessage: 'Cost accepted',
  },
  costNotAccepted: {
    id: `${scope}.costNotAccepted`,
    defaultMessage: 'Cost not accepted',
  },
  costAcceptedMessage: {
    id: `${scope}.costAcceptedMessage`,
    defaultMessage: 'Cost accepted',
  },
  costNotAcceptedMessage: {
    id: `${scope}.costNotAcceptedMessage`,
    defaultMessage: 'Cost not accepted',
  },
  readyToDelivery: {
    id: `${scope}.readyToDelivery`,
    defaultMessage: 'Ready to delivery',
  }, 
});
