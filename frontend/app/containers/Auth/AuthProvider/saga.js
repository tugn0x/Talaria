import { call, put, select, takeLatest, fork, take  } from 'redux-saga/effects';
import { REQUEST_LOGIN, REQUEST_LOGOUT, REQUEST_REFRESH, REQUEST_SIGNUP, REQUEST_PROFILE, REQUEST_PERMISSIONS, REQUEST_NEW_TOKEN, REQUEST_VERIFICATION, REQUEST_CHANGE_PASSWORD, REQUEST_RESET_PASSWORD, REQUEST_FORGOT_PASSWORD, REQUEST_UPDATE_PROFILE, REQUEST_DELETE_PROFILE,
  SOCIAL_LOGIN_PREPARE, SOCIAL_LOGIN_REQUEST, SOCIAL_OAUTH_SIGNUP, REQUEST_IDP_SIGNUP } from 'containers/Auth/AuthProvider/constants';
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
  requestPermissionsSuccess,
  socialLoginPrepare,
  socialLoginRequest,
  requestIdpSignup, requestPermissions,
} from './actions';
import makeSelectAuth, { tokensExistsExpired, isLogged  } from './selectors';
import { push } from 'connected-react-router';
import { toast } from "react-toastify";
import { login, loginRefresh, oauthOption, oauthOptionRefreshToken, signup, getProfile, getPermissions, setToken, verifySms, newToken, changePassword, forgotPassword, resetPassword, updateProfile, deleteProfile, socialOauth } from 'utils/api';
// import {socialLogin} from "../../../../fblogin/src/store/social/actions";


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
    yield call(userPermissionsSaga);
    yield put(push("/"));
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
      name: action.request.name,
      surname: action.request.surname,
      email: action.request.email,
      username: action.request.email,
      password: action.request.password,
      password_confirmation: action.request.password_confirmation,
      privacy_policy_accepted: action.request.privacy_policy_accepted,
      // privacy_policy_accepted: new Date(),
    })
  };
  try {
    const request = yield call(signup, signupOption);
    setToken(request.access_token);
    yield call(userProfileSaga);
    yield call(userPermissionsSaga);
    yield put(requestSignupSuccess(request));
    // yield put(requestPermissionsSuccess(request));
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
    console.log('userProfileSaga')
    console.log('userProfileSaga')
    console.log('userProfileSaga')
    console.log('userProfileSaga')
    const request = yield call(getProfile, options);
    yield put(requestProfileSuccess(request));
    // yield put(push("/"));
  } catch(e) {
    yield put(requestError(e.message));
    yield call(logoutAuthSaga);
  }
}

export function* userPermissionsSaga() {
  const options = {
    method: 'get'
  };
  try {
    const request = yield call(getPermissions, options);
    yield put(requestPermissionsSuccess(request));
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
    yield call(toast.success(action.message)) 
  } catch(e) {
    yield put(requestError(e.message));
   // yield call(logoutAuthSaga);
  }
}

export function* userProfileDeleteSaga() {
  const options = {
    method: 'DELETE'
  };
  try {
    const request = yield call(deleteProfile, options);
    yield put(requestProfileDeleteSuccess(request));
    // yield call(toast.success("Profilo eliminato")) 
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
    yield call(toast.success(action.message)) 
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
    body: {...oauthOption, ...action.request, username: action.request.email}
  }
  try {
    const request = yield call(resetPassword, resetPasswordOption);
    yield put(requestResetPasswordSuccess(request));
    yield put(push("/"));
    yield call(toast.success(action.message))
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
  yield put(push("/"));
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
      yield call(requestPermissions);
    } catch(e) {
      yield put(requestError(e.message));
      yield call(logoutAuthSaga);
    }
  } else {
    yield put(stopLoading())
  }
}

export function* socialOauthSaga(action) {
  const socialOptions = {
    method: 'post',
    body: action.data
  };
  try {
    const request = yield call(socialOauth, action.provider, socialOptions);
    setToken(request.access_token);
    yield call(userProfileSaga);
    yield call(userPermissionsSaga);
    yield put(requestSignupSuccess(request));
    yield put(push("/"));
  } catch(e) {
    yield put(requestError(e.message));
  }
}




/*
SOCIAL & IDP STUFFS
 */
export const socialPromises = {
  fbLogin: (options) => new Promise((resolve, reject) => {
    window.FB.login((response) => {
      // istanbul ignore else
      if (response.authResponse) {
        resolve(response.authResponse)
      } else {
        reject(response.status)
      }
    }, options)
  }),
  fbGetMe: (options) => new Promise((resolve) => {
    window.FB.api('/me', options, (me) => resolve(me))
  }),
  loadGoogleAuth2: () => new Promise((resolve) => {
    window.gapi.load('auth2', resolve)
  }),
  loadScript: (src) => new Promise((resolve, reject) => {
    const js = document.createElement('script')
    js.src = src
    js.onload = resolve
    js.onerror = reject
    document.head.appendChild(js)
  })
}

export const appendFbRoot = () => {
  const fbRoot = document.createElement('div')
  fbRoot.id = 'fb-root'
  document.body.appendChild(fbRoot)
}

export const serviceAction = (suffix, service) => (action) =>
  action.type === `SOCIAL_LOGIN_${suffix}` && action.service === service

export function* loginFacebook ({ scope = 'public_profile,email', fields = 'id,name,email', ...options } = {}) {
  try {
    const provider = 'facebook'
    const data = yield call(socialPromises.fbLogin, { scope, ...options })
    console.log(data)
    const testdata = yield call(socialPromises.fbGetMe, { fields })
    const loggedIn = yield select(isLogged());
    console.log('testdata', testdata,testdata.email,loggedIn)
    if(testdata.email || loggedIn) {
      console.log('socialOauthSaga')
      yield call(socialOauthSaga, {provider, data})
    } else {
      yield put(requestError("email address required"))
    }
  } catch (e) {
    console.log("ERRORE ERRORE", e)
    yield put(requestError(e.message));
  }
}

export function* prepareGoogle ({ client_id, ...options }) {
  yield call(socialPromises.loadScript, '//apis.google.com/js/platform.js')
  // console.log('//apis.google.com/js/platform.js')
  yield call(socialPromises.loadGoogleAuth2)
  yield call(window.gapi.auth2.init, { client_id, ...options })
}

export function* prepareSPID ({ client_id, ...options }) {
  const authDomain = yield select(makeSelectAuth())
  console.log('prepareSPID')
  yield call(socialPromises.loadScript, '/spid-login-button/spid-button.min.js')
  yield call(window.SPID.init, {
    selector: '#my-spid-button',
    lang: 'it',
    method: 'GET',
    url: `/iam/Login1?entityID={{idp}}&target=https://${process.env.FRONTEND_DOMAIN}/spidlogin?token=${authDomain.oauth.access_token ? authDomain.oauth.access_token : ''}`,
    supported: [],
    extraProviders: [
      { "entityID": "http://spid-idp.inkode.it:8088", "entityName": "Test IdP", "active": true }
    ]
  })
}

export function* prepareFacebook ({ appId, version = 'v2.8', ...options }) {
  yield call(appendFbRoot)
  yield call(socialPromises.loadScript, '//connect.facebook.net/it_IT/sdk.js')
  yield call([window.FB, window.FB.init], { appId, version, ...options })
}

export function* loginGoogle ({ scope = 'profile', ...options } = {}) {
  const provider = 'google'
  const auth2 = yield call(window.gapi.auth2.getAuthInstance)
  console.log(auth2)
  const user = yield call([auth2, auth2.signIn], { scope, ...options })
  const data = {accessToken: user.Zi.access_token}
  console.log(data)
  yield call(socialOauthSaga, {provider, data})
}
export function* socialLoginPrepareSaga() {
  yield call(prepareFacebook, { appId: process.env.FACEBOOK_APP_ID })
  yield call(prepareGoogle, { client_id: process.env.GOOGLE_CLIENT_ID })
  yield call(prepareSPID, {})
}

export function* socialLoginRequestSaga(action) {
  console.log('socialLoginRequestSaga', action)
  switch (action.provider) {
    case 'facebook':
      yield call(loginFacebook, action.options)
      break;
    case 'google':
      yield call(loginGoogle, action.options)
      break;
  }
}

export function* requestIdpSignupSaga() {
  console.log('requestIdpSignupSaga')
  yield put(push('/'));
    try {
      // console.log("CI STO PROVANDO")
      yield call(refreshAuthSaga);
    } catch(e) {
      // console.log("ERRORE", e)
      yield put(requestError(e.message));
      yield call(logoutAuthSaga);
    }
}
/*
END OF SOCIAL AND IDP STUFFS
 */






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
  yield takeLatest(REQUEST_PERMISSIONS, userPermissionsSaga);
  yield takeLatest(REQUEST_VERIFICATION, verificationAuthSaga);
  yield takeLatest(REQUEST_NEW_TOKEN, requestNewTokenAuthSaga);
  yield takeLatest(REQUEST_CHANGE_PASSWORD,changePasswordSaga);
  yield takeLatest(REQUEST_FORGOT_PASSWORD,forgotPasswordSaga);
  yield takeLatest(REQUEST_RESET_PASSWORD,resetPasswordSaga);
  yield takeLatest(REQUEST_UPDATE_PROFILE, userProfileUpdateSaga);
  yield takeLatest(REQUEST_DELETE_PROFILE, userProfileDeleteSaga);

  yield takeLatest(SOCIAL_LOGIN_PREPARE, socialLoginPrepareSaga);
  yield takeLatest(SOCIAL_LOGIN_REQUEST, socialLoginRequestSaga);
  yield takeLatest(SOCIAL_OAUTH_SIGNUP, socialOauthSaga);
  yield takeLatest(REQUEST_IDP_SIGNUP, requestIdpSignupSaga);
}
