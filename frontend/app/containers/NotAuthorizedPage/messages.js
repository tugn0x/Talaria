/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NotAuthorizedPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: '403 Forbidden',
  },
  intro: {
    id: `${scope}.intro`,
    defaultMessage: 'We\' sorry but you can\'t access the page you\'r looking for',
  },
});
