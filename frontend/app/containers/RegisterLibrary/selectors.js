import { createSelector } from 'reselect';
import { initialState } from 'containers/RegisterLibrary/reducer';

/**
 * Library Registration Selectors
 */

const libraryRegDomain = state => state.libraryreg || initialState;

const institutionsOptionListSelector = () => 
createSelector(
  libraryRegDomain,
  substate => (substate.institutionsOptionList)
);

const institutionsByTypeCountryOptionListSelector = () => 
createSelector(
  libraryRegDomain,
  substate => (substate.institutionsByTypeCountryOptionList)
);

const countriesOptionListSelector = () => 
createSelector(
  libraryRegDomain,
  substate => (substate.countriesOptionList)
);

const librarySubjectOptionListSelector = () => 
createSelector(
  libraryRegDomain,
  substate => (substate.librarySubjectOptionList)
);

const projectsOptionListSelector = () => 
createSelector(
  libraryRegDomain,
  substate => (substate.projectsOptionList)
);

const identifierTypesOptionListSelector = () => 
createSelector(
  libraryRegDomain,
  substate => (substate.identifierTypesOptionList)
);

const institutionTypesOptionListSelector = () => 
createSelector(
  libraryRegDomain,
  substate => (substate.institutionTypesOptionList)
);

const placesSelector = () => 
createSelector(
  libraryRegDomain,
  substate => (substate.places)
);

const libraryProjectsOptionListSelector = () => 
createSelector(
  libraryRegDomain,
  substate => (substate.libraryProjectsOptionList)
);

export {  institutionsOptionListSelector, countriesOptionListSelector, librarySubjectOptionListSelector,projectsOptionListSelector, identifierTypesOptionListSelector,
  institutionTypesOptionListSelector, placesSelector, institutionsByTypeCountryOptionListSelector, libraryProjectsOptionListSelector };
