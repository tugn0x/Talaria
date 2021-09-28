import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mapPage state domain
 */

const selectReferenceDomain = state => state.reference || initialState;

const makeSelectReference = () =>
  createSelector(
    selectReferenceDomain,
    substate => substate.reference,
  );

const isReferenceLoading = () => 
createSelector(
    selectReferenceDomain,
  substate => (substate.loading)
);

export default makeSelectReference;
export {  isReferenceLoading };