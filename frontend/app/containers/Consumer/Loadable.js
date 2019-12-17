/**
 *
 * Asynchronously loads the component for Consumer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
