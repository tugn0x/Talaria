/*
 * Routes Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.routes';

export default defineMessages({
    Reference: {
        id: `${scope}.Reference`,
        defaultMessage: 'My References',
    },
    ReferenceNew: {
        id: `${scope}.ReferenceNew`,
        defaultMessage: 'Create new reference',
    },
    Searches: {
        id: `${scope}.Searches`,
        defaultMessage: 'My Searches',
    },
    Requests: {
        id: `${scope}.Requests`,
        defaultMessage: 'My Requests',
    },
    Libraries: {
        id: `${scope}.Libraries`,
        defaultMessage: 'My Libraries',
    },
});
