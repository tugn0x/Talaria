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

const tagsOptionListSelector = () => 
createSelector(
  selectLibraryDomain,
  substate => (substate.tagsOptionList)
);

const fileUploadNameSelector = () =>
createSelector(
  selectLibraryDomain,
  substate => (substate.getFileUploadname)
);

const countriesOptionListSelector = () => 
createSelector(
  selectLibraryDomain,
  substate => (substate.countriesOptionList)
);

const librarySubjectOptionListSelector = () => 
createSelector(
  selectLibraryDomain,
  substate => (substate.librarySubjectOptionList)
);


const institutionsOptionListSelector = () => 
createSelector(
  selectLibraryDomain,
  substate => (substate.institutionsOptionList)
);


export default makeSelectLibrary;
export {  isLibraryLoading,tagsOptionListSelector, fileUploadNameSelector,countriesOptionListSelector,librarySubjectOptionListSelector,institutionsOptionListSelector };
