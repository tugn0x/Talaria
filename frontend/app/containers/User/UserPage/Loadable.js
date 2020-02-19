/**
 * Asynchronously loads the component for UserPage
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
