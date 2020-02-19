/*
 *
 * Auth actions
 *
 */

import { SYNC_AUTH, STOP_LOADING, REQUEST_LOGIN, REQUEST_LOGOUT, REQUEST_REFRESH, REQUEST_LOGIN_SUCCESS, REQUEST_LOGOUT_SUCCESS, REQUEST_REFRESH_SUCCESS, REQUEST_ERROR, REQUEST_SIGNUP, REQUEST_SIGNUP_SUCCESS, REQUEST_PROFILE, REQUEST_PROFILE_SUCCESS , REQUEST_PERMISSIONS, REQUEST_PERMISSIONS_SUCCESS, REQUEST_VERIFICATION, REQUEST_VERIFICATION_SUCCESS, REQUEST_NEW_TOKEN, REQUEST_NEW_TOKEN_SUCCESS, REQUEST_CHANGE_PASSWORD, REQUEST_CHANGE_PASSWORD_SUCCESS, REQUEST_FORGOT_PASSWORD, REQUEST_FORGOT_PASSWORD_SUCCESS, REQUEST_RESET_PASSWORD, REQUEST_RESET_PASSWORD_SUCCESS, REQUEST_UPDATE_PROFILE, REQUEST_UPDATE_PROFILE_SUCCESS, REQUEST_DELETE_PROFILE, REQUEST_DELETE_PROFILE_SUCCESS, SOCIAL_LOGIN_PREPARE, SOCIAL_LOGIN_REQUEST, SOCIAL_LOGIN_SUCCESS, REQUEST_IDP_SIGNUP } from './constants';

export function stopLoading() {
  return {
    type: STOP_LOADING,
   // request: request
  };
}
export function syncAuth(request) {
  return {
    type: SYNC_AUTH,
    request: request
  };
}

export function requestLogin(request) {
  return {
    type: REQUEST_LOGIN,
    request: request
  };
}

export function requestLoginSuccess(result) {
  return {
    type: REQUEST_LOGIN_SUCCESS,
    result: result
  };
}

export function requestLogout() {
  return {
    type: REQUEST_LOGOUT,
  };
}

export function requestLogoutSuccess() {
  return {
    type: REQUEST_LOGOUT_SUCCESS,
  };
}

export function requestRefresh() {
  return {
    type: REQUEST_REFRESH,
  };
}

export function requestChangePassword(request, message){
  return{
    type: REQUEST_CHANGE_PASSWORD,
    request,
    message
  };
}

export function requestChangePasswordSuccess() {
  return {
    type: REQUEST_CHANGE_PASSWORD_SUCCESS
  }
}

export function requestForgotPassword(request){
  return{
    type: REQUEST_FORGOT_PASSWORD,
    request: request
  }
}

export function requestForgotPasswordSuccess(){
  return{
    type: REQUEST_FORGOT_PASSWORD_SUCCESS
  }
}

export function requestResetPassword(request, message){
  return{
    type: REQUEST_RESET_PASSWORD,
    request: request,
    message
  }
}

export function requestResetPasswordSuccess(){
  return{
    type: REQUEST_RESET_PASSWORD_SUCCESS
  }
}


export function requestRefreshSuccess() {
  return {
    type: REQUEST_REFRESH_SUCCESS,
  };
}

export function requestError(errorMessage) {
  return {
    type: REQUEST_ERROR,
    error: errorMessage
  };
}

export function requestSignup(request) {
  return {
    type: REQUEST_SIGNUP,
    request: request
  };
}

export function requestSignupSuccess(result) {
  return {
    type: REQUEST_SIGNUP_SUCCESS,
    result: result
  };
}

export function requestProfile(request) {
  return {
    type: REQUEST_PROFILE,
    request: request
  };
}

export function requestProfileSuccess(result) {
  return {
    type: REQUEST_PROFILE_SUCCESS,
    result: result
  };
}

export function requestPermissions(request) {
  return {
    type: REQUEST_PERMISSIONS,
    request: request
  };
}

export function requestPermissionsSuccess(result) {
  return {
    type: REQUEST_PERMISSIONS_SUCCESS,
    result: result
  };
}

export function requestProfileUpdate(request, message) {
  return {
    type: REQUEST_UPDATE_PROFILE,
    request,
    message
  };
}

export function requestProfileUpdateSuccess(result) {
  return {
    type: REQUEST_UPDATE_PROFILE_SUCCESS,
    result: result
  };
}

export function requestProfileDelete(request) {
  return {
    type: REQUEST_DELETE_PROFILE,
    request: request
  };
}

export function requestProfileDeleteSuccess(result) {
  return {
    type: REQUEST_DELETE_PROFILE_SUCCESS,
    result: result
  };
}


export function requestVerification(request) {
  return {
    type: REQUEST_VERIFICATION,
    request: request
  };
}

export function requestVerificationSuccess(result) {
  return {
    type: REQUEST_VERIFICATION_SUCCESS,
    result: result
  };
}


export function requestNewToken(request) {
  return {
    type: REQUEST_NEW_TOKEN,
    request: request
  };
}

export function requestNewTokenSuccess(result) {
  return {
    type: REQUEST_NEW_TOKEN_SUCCESS,
    result: result
  };
}

export function socialLoginPrepare(provider, options) {
  return {
    type: SOCIAL_LOGIN_PREPARE
  };
}
export function socialLoginRequest(provider) {
  return {
    type: SOCIAL_LOGIN_REQUEST,
    provider: provider
  };
}
export function socialOauthSignup(provider, options) {
  return {
    type: SOCIAL_OAUTH_SIGNUP,
    provider: provider,
    options: options,
  };
}
export function requestIdpSignup(refresh_token) {
  return {
    type: REQUEST_IDP_SIGNUP,
    refresh_token: refresh_token
  };
}
