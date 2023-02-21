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

const placesSelector = () => 
createSelector(
  selectPatronDomain,
  substate => (substate.places)
);


const titlesSelector = () => 
createSelector(
  selectPatronDomain,
  substate => (substate.titlesOptionList)
);

const libraryListSelector = () => 
createSelector(
  selectPatronDomain,
  substate => (substate.libraryList)
);

export default makeSelectPatron;
export {  isPatronLoading,labelsOptionListSelector,groupsOptionListSelector,placesSelector,titlesSelector,libraryListSelector };