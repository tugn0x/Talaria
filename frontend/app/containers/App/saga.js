import { call, put, takeLatest  } from 'redux-saga/effects';
import { REQUEST_GET_NOTIFICATION_LIST, MARK_ALL_AS_READ } from './constants';
import {
  requestNotificationsSuccess,
  
} from './actions';

import { getNotifications, updateNotificationsAsRead} from 'utils/api';

export function* requestNotificationsSaga(action = {}) {
    const page = action.page ? action.page : ""
    const options = {
      method: 'get',
      page
    };
    try {
      const request = yield call(getNotifications, options);
      yield put(requestNotificationsSuccess(request));
    } catch(e) {
      yield put(requestError(e.message));
    }
  }

  export function* updateNotificationsAsReadSaga() {
    const options = {
      method: 'put',
    };
    try {
      const request = yield call(updateNotificationsAsRead, options);
      yield call(requestNotificationsSaga);
    } catch(e) {
      yield put(requestError(e.message));
    }
  }

/* export function* requestNotificationSaga(action = {}) {
  const page = action.page ? action.page : ""
  const options = {
    method: 'get',
    page
  };
  try {
    const request = yield call(getNotification, options);
    yield put(requestNotificationsSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
} */

export default function* appSaga() { 
  yield takeLatest(REQUEST_GET_NOTIFICATION_LIST, requestNotificationsSaga);
  yield takeLatest(MARK_ALL_AS_READ, updateNotificationsAsReadSaga);
}


  