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

const institutionsByTypeCountryOptionListSelector = () => 
createSelector(
  selectAdminDomain,
  substate => (substate.institutionsByTypeCountryOptionList)
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

const projectsOptionListSelector = () => 
createSelector(
  selectAdminDomain,
  substate => (substate.projectsOptionList)
);

const institutionsTypeOptionListSelector = () => 
createSelector(
  selectAdminDomain,
  substate => (substate.institutionsTypesOptionList)
);

const placesSelector = () => 
createSelector(
  selectAdminDomain,
  substate => (substate.places)
);

const libraryProjectsOptionListSelector = () => 
createSelector(
  selectAdminDomain,
  substate => (substate.libraryProjectsOptionList)
);

// export default makeSelectAdmin;
export {  institutionsOptionListSelector, countriesOptionListSelector, librarySubjectOptionListSelector,projectsOptionListSelector, 
  institutionsTypeOptionListSelector, placesSelector, institutionsByTypeCountryOptionListSelector, libraryProjectsOptionListSelector };