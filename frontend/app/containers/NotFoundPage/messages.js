/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NotFoundPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: '404 Sorry this page does not exists',
  },
  intro: {
    id: `${scope}.intro`,
    defaultMessage: 'We\' sorry but we can\'t find the page you\'r looking for',
  },
});
