/**
 *
 * Asynchronously loads the component for Patron
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
