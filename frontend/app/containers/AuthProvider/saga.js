import { call, put, select, takeLatest  } from 'redux-saga/effects';
import { REQUEST_LOGIN, REQUEST_LOGOUT, REQUEST_REFRESH, REQUEST_SIGNUP, REQUEST_PROFILE, REQUEST_NEW_TOKEN, REQUEST_VERIFICATION, REQUEST_CHANGE_PASSWORD, REQUEST_RESET_PASSWORD, REQUEST_FORGOT_PASSWORD, REQUEST_UPDATE_PROFILE, REQUEST_DELETE_PROFILE, REQUEST_REGION_GROUPS, REQUEST_REGION_GROUPS_SUCCESS } from 'containers/AuthProvider/constants';
import {
  requestError,
  requestLoginSuccess,
  requestLogoutSuccess,
  requestSignupSuccess,
  requestProfileSuccess,
  requestVerificationSuccess,
  requestNewTokenSuccess,
  stopLoading,
  requestChangePasswordSuccess,
  requestForgotPasswordSuccess,
  requestResetPasswordSuccess,
  requestProfileUpdateSuccess,
  requestProfileDeleteSuccess,
  requestRegionGroups,
  requestRegionGroupsSuccess,
  requestRegionGroupsFailure
} from '../../containers/AuthProvider/actions';
import makeSelectAuth, { tokensExistsExpired  } from '../../containers/AuthProvider/selectors';
import { push } from 'connected-react-router';

import { login, loginRefresh, oauthOption, oauthOptionRefreshToken, signup, getProfile, setToken, verifySms, newToken, changePassword, forgotPassword, resetPassword, updateProfile, deleteProfile } from 'utils/api';

// import { enqueueSuccess } from '../NotificationSnake/actions';
import {getRegionGroups} from "../../utils/api";

// Individual exports for testing
export function* loginAuthSaga(action) {
  // See example in containers/HomePage/saga.js
  const loginOption = {
    method: 'post',
    body: Object.assign(oauthOption, {
      username: action.request.username,
      password: action.request.password,
      recaptcha: action.request.recaptcha
    })
  };
  try {
    const request = yield call(login, loginOption);
    setToken(request.access_token);
    yield put(requestLoginSuccess(request));
    yield call(userProfileSaga);
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* signupAuthSaga(action) {
  // See example in containers/HomePage/saga.js
  const signupOption = {
    method: 'post',
    body: Object.assign(oauthOption, {
      recaptcha: action.request.recaptcha,
      first_name: action.request.first_name,
      email: action.request.email,
      password: action.request.password,
      confirm_password: action.request.confirm_password,
      accept_privacy_policy: action.request.accept_privacy_policy,
      region_group: action.request.region_group,
    })
  };
  try {
    const request = yield call(signup, signupOption);
    setToken(request.access_token);
    yield call(userProfileSaga);
    yield put(requestSignupSuccess(request));
    yield put(push("/"));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* userProfileSaga() {
  const options = {
    method: 'get'
  };
  try {
    const request = yield call(getProfile, options);
    yield put(requestProfileSuccess(request));
    yield put(push("/"));
  } catch(e) {
    yield put(requestError(e.message));
    yield call(logoutAuthSaga);
  }
}

export function* userProfileUpdateSaga(action) {
  const options = {
    method: 'PUT',
    body: action.request
  };
  try {
    const request = yield call(updateProfile, options);
    yield put(requestProfileUpdateSuccess(request));
    yield put(enqueueSuccess("Profilo aggiornato"));
  } catch(e) {
    yield put(requestError(e.message));
    yield call(logoutAuthSaga);
  }
}

export function* userProfileDeleteSaga() {
  const options = {
    method: 'DELETE'
  };
  try {
    const request = yield call(deleteProfile, options);
    yield put(requestProfileDeleteSuccess(request));
    yield put(enqueueSuccess("Profilo eliminato"));
    yield call(logoutAuthSaga);
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* verificationAuthSaga(action) {
  const verificationOption = {
    method: 'post',
    body: {
      // username: action.request.email,
      verification_code: action.request.verification_code,
    }
  };
  try {
    const request = yield call(verifySms, verificationOption);
    yield call(userProfileSaga);
    yield put(requestVerificationSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* changePasswordSaga(action) {
  const changePasswordOption = {
    method: 'post',
    body: action.request
  }
  try {
    const request = yield call(changePassword, changePasswordOption);
    yield put(requestChangePasswordSuccess(request));
    yield put(enqueueSuccess("Password aggiornata"));
  } catch (error) {
      yield put(requestError(error.message));
  }
}

export function* forgotPasswordSaga(action){
  const forgotPasswordOption = {
    method: 'post',
    body: action.request
  }
  try {
    const request = yield call(forgotPassword, forgotPasswordOption);
    yield put(requestForgotPasswordSuccess(request));
  } catch (error) {
    yield put(requestError(error.message));

  }
}

export function* resetPasswordSaga(action){
  const resetPasswordOption = {
    method: 'post',
    body: action.request
  }
  try {
    const request = yield call(resetPassword, resetPasswordOption);
    yield put(requestResetPasswordSuccess(request));
    yield put(push("/"));
  } catch (error) {
    yield put(requestError(error.message));

  }
}

export function* requestNewTokenAuthSaga(action) {
  const verificationOption = {
    method: 'post',
    body: {
      email: action.request.email,
    }
  };
  try {
    const request = yield call(newToken, verificationOption);
    yield put(requestNewTokenSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* logoutAuthSaga() {
  yield put(requestLogoutSuccess());
}

export function* refreshAuthSaga() {

  const tokensExpired = yield select(tokensExistsExpired());

  if(tokensExpired) {
    const authDomain = yield select(makeSelectAuth())
    const loginOption = {
      method: 'post',
      body: Object.assign(oauthOptionRefreshToken, {
        refresh_token: authDomain.oauth.refreshToken
      })
    };
    try {
      const request = yield call(loginRefresh, loginOption);
      setToken(request.access_token);
      yield put(requestLoginSuccess(request));
      yield call(userProfileSaga);
    } catch(e) {
      yield put(requestError(e.message));
      yield call(logoutAuthSaga);
    }
  } else {
    yield put(stopLoading())
  }
}

export function* getRegionGroupsSaga(action){
  const submitOption = {
    method: 'get'
  };
  try {
    const request = yield call(getRegionGroups, submitOption);
    yield put(requestRegionGroupsSuccess(request.results));
  } catch(e) {
    yield put(requestRegionGroupsFailure(e.message));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* authSaga() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(REQUEST_LOGIN, loginAuthSaga);
  yield takeLatest(REQUEST_LOGOUT, logoutAuthSaga);
  yield takeLatest(REQUEST_REFRESH, refreshAuthSaga);
  yield takeLatest(REQUEST_SIGNUP, signupAuthSaga);
  yield takeLatest(REQUEST_PROFILE, userProfileSaga);
  yield takeLatest(REQUEST_VERIFICATION, verificationAuthSaga);
  yield takeLatest(REQUEST_NEW_TOKEN, requestNewTokenAuthSaga);
  yield takeLatest(REQUEST_CHANGE_PASSWORD,changePasswordSaga);
  yield takeLatest(REQUEST_FORGOT_PASSWORD,forgotPasswordSaga);
  yield takeLatest(REQUEST_RESET_PASSWORD,resetPasswordSaga);
  yield takeLatest(REQUEST_UPDATE_PROFILE, userProfileUpdateSaga);
  yield takeLatest(REQUEST_DELETE_PROFILE, userProfileDeleteSaga);
  yield takeLatest(REQUEST_REGION_GROUPS, getRegionGroupsSaga);

}
