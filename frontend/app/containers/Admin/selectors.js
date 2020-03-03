import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mapPage state domain
 */

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

export default makeSelectAdmin;
export {  isAdminLoading };