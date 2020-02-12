import { createSelector } from 'reselect';
import { initialState } from '../AuthProvider/reducer';
/**
 * Direct selector to the auth state domain
 */

const selectForgotPassword = state => state.error || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Auth
 */

const requestError = () =>
  createSelector(
    selectForgotPassword,
    substate => substate,
  );



export default requestError;
// export { selectAuthDomain, isLogged, tokensExistsExpired };
