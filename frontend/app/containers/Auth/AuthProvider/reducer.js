/*
 *
 * Auth reducer
 *
 */
import produce from 'immer';
import moment from "moment";
import { SYNC_AUTH, STOP_LOADING, REQUEST_LOGIN, REQUEST_LOGOUT, REQUEST_REFRESH, REQUEST_LOGIN_SUCCESS, REQUEST_LOGOUT_SUCCESS,
  REQUEST_REFRESH_SUCCESS, REQUEST_ERROR, REQUEST_SIGNUP, REQUEST_SIGNUP_SUCCESS, REQUEST_PERMISSIONS, REQUEST_PERMISSIONS_SUCCESS,
  REQUEST_PROFILE, REQUEST_PROFILE_SUCCESS, REQUEST_NEW_TOKEN, REQUEST_NEW_TOKEN_SUCCESS, REQUEST_CHANGE_PASSWORD,
  REQUEST_CHANGE_PASSWORD_SUCCESS, REQUEST_FORGOT_PASSWORD, REQUEST_FORGOT_PASSWORD_SUCCESS, REQUEST_RESET_PASSWORD, REQUEST_RESET_PASSWORD_SUCCESS,
  REQUEST_UPDATE_PROFILE, REQUEST_UPDATE_PROFILE_SUCCESS, REQUEST_DELETE_PROFILE, REQUEST_DELETE_PROFILE_SUCCESS,
  SOCIAL_LOGIN_REQUEST, REQUEST_IDP_SIGNUP } from './constants';


export const initialState = {
  loading: false,
  user: {
    email: null,
    is_verified: false,
  },
  permissions: [],
  error: null,
  oauth: {
    token: null,
    refreshToken: null,
    expire_at: null
  },
  isForgotPasswordMode: false
};

/* eslint-disable default-case, no-param-reassign */
const authReducer = (state = initialState, action) =>
  produce(state, ( draft ) => {
    switch (action.type) {
      case REQUEST_LOGIN:
          draft.loading = true;
          draft.error = initialState.error;
        break;
      case REQUEST_LOGIN_SUCCESS:
          draft.loading = false;
          draft.error = initialState.error;
          draft.oauth.token = action.result.access_token;
          draft.oauth.refreshToken = action.result.refresh_token;
          draft.oauth.expire_at = moment().add((action.result.expires_in - (60 * 30)), 'seconds').unix();
        break;
      case REQUEST_LOGOUT:
          draft.loading = true;
          draft.error = initialState.error;
        break;
      case REQUEST_LOGOUT_SUCCESS:
          draft.loading = false;
          draft.error = initialState.error;
          draft.oauth = initialState.oauth
          draft.user = initialState.user
        break;
      case REQUEST_REFRESH:
          draft.loading = true;
          draft.error = initialState.error;
        break;
      case REQUEST_REFRESH_SUCCESS:
          draft.loading = false;
          draft.error = initialState.error;
          draft.oauth.token = action.result.access_token;
          draft.oauth.refreshToken = action.result.refresh_token;
          draft.oauth.expire_at = moment().add((action.result.expires_in - (60 * 30)), 'seconds').unix();
        break;
      case REQUEST_ERROR:
          draft.loading = false;
          draft.error = action.error;
          draft.isForgotPasswordMode = false;
        break;
      case REQUEST_SIGNUP:
          draft.loading = true;
          draft.error = initialState.error;
        break;
      case REQUEST_SIGNUP_SUCCESS:
          draft.loading = false;
          draft.error = initialState.error;
          draft.oauth.token = action.result.access_token;
          draft.oauth.refreshToken = action.result.refresh_token;
          draft.oauth.expire_at = moment().add((action.result.expires_in - (60 * 30)), 'seconds').unix();
        break;
      case REQUEST_PROFILE:
          draft.loading = true;
          draft.error = initialState.error;
        break;
      case REQUEST_PROFILE_SUCCESS:
          draft.loading = false;
          draft.error = initialState.error;
          draft.user = action.result;
        break;
      case REQUEST_PERMISSIONS:
          draft.loading = true;
          draft.error = initialState.error;
        break;
      case REQUEST_PERMISSIONS_SUCCESS:
          console.log('case REQUEST_PERMISSIONS_SUCCESS', action.result)
          draft.loading = false;
          draft.error = initialState.error;
          draft.permissions = action.result;
        break;
      case REQUEST_NEW_TOKEN:
          draft.loading = true;
        break;
      case REQUEST_NEW_TOKEN_SUCCESS:
          draft.loading = false;
        break;
      case STOP_LOADING:
          draft.loading = false;
        break;
      case SYNC_AUTH:
          draft.oauth = action.request.oauth;
          draft.user = action.request.user;
        break;
      case REQUEST_CHANGE_PASSWORD:
        draft.loading = true;
        draft.error = initialState.error;
        break;
      case REQUEST_CHANGE_PASSWORD_SUCCESS:
        draft.loading = false;
        break;
      case REQUEST_FORGOT_PASSWORD:
        draft.loading = true;
        draft.error = initialState.error;
        break;
      case REQUEST_FORGOT_PASSWORD_SUCCESS:
        draft.loading = false;
        draft.isForgotPasswordMode = true;
        break;
      case REQUEST_RESET_PASSWORD:
        draft.loading = true;
        draft.error = initialState.error;
        break;
      case REQUEST_RESET_PASSWORD_SUCCESS:
        draft.loading = false;
        draft.isForgotPasswordMode = false;
        break;
      case REQUEST_UPDATE_PROFILE:
        draft.loading = true;
        draft.error = initialState.error;
        break;
      case REQUEST_UPDATE_PROFILE_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.user = action.result;
        break;
      case REQUEST_DELETE_PROFILE:
        draft.loading = true;
        draft.error = initialState.error;
        break;
      case REQUEST_DELETE_PROFILE_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.user = initialState.user;
        break;
      case SOCIAL_LOGIN_REQUEST:
        draft.loading = true;
        break;
      case REQUEST_IDP_SIGNUP:
        // console.log('REQUEST_IDP_SIGNUP')
        draft.loading = true;
        draft.oauth.refreshToken = action.refresh_token;
        draft.oauth.token = action.refresh_token;
        draft.oauth.expire_at = moment().subtract(600, 'seconds').unix();
        break;
    }
  });

export default authReducer;
