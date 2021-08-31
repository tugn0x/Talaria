import { createSelector } from 'reselect';
import { initialState } from './reducer';
import moment from 'moment';

/**
 * Direct selector to the auth state domain
 */

const selectAuthDomain = state => state.auth || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Auth
 */

const makeSelectAuth = () =>
  createSelector(
    selectAuthDomain,
    substate => substate,
  );

const isLogged = () =>
  createSelector(
    selectAuthDomain,
    substate => (!substate.loading && substate.user && substate.user.id && Object.keys(substate.permissions).length>0 /*&& substate.user.is_verified*/ && substate.oauth && substate.oauth.token && substate.oauth.expire_at && substate.oauth.expire_at > moment().unix()) ? true : false,
  );

const isAuthLoading = () =>
  createSelector(
    selectAuthDomain,
    substate => substate.loading
  );



const tokensExistsExpired = () =>
  createSelector(
    selectAuthDomain,
    substate => (substate.oauth && substate.oauth.token && substate.oauth.refreshToken && substate.oauth.expire_at && substate.oauth.expire_at <= moment().unix()) ? true : false,
  );

export default makeSelectAuth;
export { selectAuthDomain, isLogged, tokensExistsExpired, isAuthLoading };
