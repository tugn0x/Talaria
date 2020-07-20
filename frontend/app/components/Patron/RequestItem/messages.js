/*
 * References Form
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.RequestItem';

export default defineMessages({
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
  readyToDelivery: {
    id: `${scope}.readyToDelivery`,
    defaultMessage: 'Ready to delivery',
  },  
});

