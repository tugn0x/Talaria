import { createSelector } from 'reselect';
import { initialState } from '../AuthProvider/reducer';
/**
 * Direct selector to the auth state domain
 */

const selectForgotPassword = state => state.auth || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Auth
 */

const requestError = () =>
  createSelector(
    selectForgotPassword,
    substate => substate.error,
  );
/* 
const requestSucces = () =>
  createSelector(
    selectForgotPassword,
    substate => substate.error,
); */



export default requestError;
// export { selectAuthDomain, isLogged, tokensExistsExpired };
