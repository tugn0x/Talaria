import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the patron state domain
 */

const selectPatronDomain = state => state.patron || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Patron
 */

const makeSelectPatron = () =>
  createSelector(
    selectPatronDomain,
    substate => substate,
  );

export default makeSelectPatron;
export { selectPatronDomain };
