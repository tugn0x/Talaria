import { call, put, select, takeLatest, fork, take  } from 'redux-saga/effects';
import { REQUEST_USERS_LIST } from './constants';
import {
  requestError,
  stopLoading,
  requestSuccess,
  requestUsersListSuccess
} from './actions';
import { toast } from "react-toastify";




export function* requestUsersListSaga(action) {
  const options = {
    method: 'get'
  };
  try {
    // const request = yield call(getReferencesList, options);
    // yield put(requestUsersListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}



/**
 * Root saga manages watcher lifecycle
 */
export default function* adminSaga() {
  yield takeLatest(REQUEST_USERS_LIST, requestUsersListSaga);
}
