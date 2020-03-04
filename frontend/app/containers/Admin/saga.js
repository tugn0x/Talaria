import { call, put, takeLatest } from 'redux-saga/effects';
import { REQUEST_USERS_LIST, REQUEST_UPDATE_USER, REQUEST_POST_USER } from './constants';
import {
  requestError,
  stopLoading,
  requestSuccess,
  requestUsersListSuccess
} from './actions';
import { toast } from "react-toastify";
import { push } from 'connected-react-router';
import {getUsersList, updateUser, createUser} from 'utils/api'
import moment from 'moment';


export function* requestUsersListSaga(action = {}) {
  const options = {
    method: 'get',
    page: action.page ? action.page.toString() : '1'
  };
  try {
    const request = yield call(getUsersList, options);
    yield put(requestUsersListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestUpdateUserSaga(action) {
  const options = {
    method: 'put',
    body: action.request
  };
  try {
    const request = yield call(updateUser, options);
    yield call(requestUsersListSaga);
    yield put(push("/admin/users-list"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestPostUserSaga(action) {
  const options = {
    method: 'post',
    body: {...action.request, privacy_policy_accepted: moment().format('YYYY-MM-DD hh:mm:ss') }
  };
  try {
    const request = yield call(createUser, options);
    yield call(requestUsersListSaga);
    yield put(push("/admin/users-list"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* adminSaga() {
  yield takeLatest(REQUEST_USERS_LIST, requestUsersListSaga);
  yield takeLatest(REQUEST_UPDATE_USER, requestUpdateUserSaga);
  yield takeLatest(REQUEST_POST_USER, requestPostUserSaga);
}
