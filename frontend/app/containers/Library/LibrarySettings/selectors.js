import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the LibrarySettings state domain
 */

const selectLibrarySettingsDomain = state => state.LibrarySettings || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LibrarySettings
 */

const makeSelectLibrarySettings = () =>
  createSelector(
    selectLibrarySettingsDomain,
    substate => substate,
  );

export default makeSelectLibrarySettings;
export { selectLibrarySettingsDomain };
