import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mapPage state domain
 */

const selectPatronDomain = state => state.patron || initialState;

const makeSelectPatron = () =>
  createSelector(
    selectPatronDomain,
    substate => substate,
  );

const isPatronLoading = () => 
createSelector(
  selectPatronDomain,
  substate => (substate.loading)
);

export default makeSelectPatron;
export {  isPatronLoading };