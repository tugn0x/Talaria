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
    LibraryNew: {
        id: `${scope}.LibraryNew`,
        defaultMessage: 'Create new library',
    },
    UsersList: {
        id: `${scope}.UsersList`,
        defaultMessage: 'Users list',
    },
    UserNew: {
        id: `${scope}.UserNew`,
        defaultMessage: 'Create new user',
    },
    UserUpdate: {
        id: `${scope}.UserUpdate`,
        defaultMessage: 'Update user',
    },
});
