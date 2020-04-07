import { createSelector } from 'reselect';
import { initialState } from 'containers/Admin/reducer';

/**
 * 
 */

const selectAdminDomain = state => state.admin || initialState;

const institutionsOptionListSelector = () => 
createSelector(
  selectAdminDomain,
  substate => (substate.institutionsOptionList)
);

const countriesOptionListSelector = () => 
createSelector(
  selectAdminDomain,
  substate => (substate.countriesOptionList)
);

const librarySubjectOptionListSelector = () => 
createSelector(
  selectAdminDomain,
  substate => (substate.librarySubjectOptionList)
);


// export default makeSelectAdmin;
export {  institutionsOptionListSelector, countriesOptionListSelector, librarySubjectOptionListSelector };