import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mapPage state domain
 */

const selectOASearchReferenceDomain = state => state.oasearchreference || initialState;

const makeSelectOASearchReference = () =>
  createSelector(
    selectOASearchReferenceDomain,
    substate => substate,
  );

const isOASearchReferenceLoading = () => 
createSelector(
  selectOASearchReferenceDomain,
  substate => (substate.loading)
);



export default makeSelectOASearchReference;
export {  isOASearchReferenceLoading};