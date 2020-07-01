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

const labelsOptionListSelector = () => 
createSelector(
  selectPatronDomain,
  substate => (substate.labelsOptionList)
);

const groupsOptionListSelector = () => 
createSelector(
  selectPatronDomain,
  substate => (substate.groupsOptionList)
);

export default makeSelectPatron;
export {  isPatronLoading,labelsOptionListSelector,groupsOptionListSelector };