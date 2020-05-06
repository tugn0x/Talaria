import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mapPage state domain
 */

const selectLibraryDomain = state => state.library || initialState;
const selectAdminDomain = state => state.admin || initialState;

const makeSelectAdmin = () =>
  createSelector(
    selectAdminDomain,
    substate => substate,
  );

const isAdminLoading = () => 
createSelector(
  selectAdminDomain,
  substate => (substate.loading)
);

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
export {  isLibraryLoading, isAdminLoading , makeSelectAdmin };
