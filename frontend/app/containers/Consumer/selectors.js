import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the consumer state domain
 */

const selectConsumerDomain = state => state.consumer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Consumer
 */

const makeSelectConsumer = () =>
  createSelector(
    selectConsumerDomain,
    substate => substate,
  );

export default makeSelectConsumer;
export { selectConsumerDomain };
