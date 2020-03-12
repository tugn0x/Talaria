import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mapPage state domain
 */

const selectLibraryDomain = state => state.library || initialState;

const makeSelectLibrary = () =>
  createSelector(
    selectLibraryDomain,
    substate => substate,
  );

const isLibraryLoading = () =>
createSelector(
  selectLibraryDomain,
  substate => (substate.loading)
);

export default makeSelectLibrary;
export {  isLibraryLoading };
