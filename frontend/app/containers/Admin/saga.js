import { call, put, select, takeLatest, fork, take  } from 'redux-saga/effects';
import { REQUEST_USERS_LIST } from './constants';
import {
  requestError,
  stopLoading,
  requestSuccess,
  requestUsersListSuccess
} from './actions';
import { toast } from "react-toastify";
import {getUsersList} from 'utils/api'



export function* requestUsersListSaga() {
  console.log('requestUsersListSaga')
  console.log('requestUsersListSaga')
  console.log('requestUsersListSaga')
  const options = {
    method: 'get'
  };
  try {
    const request = yield call(getUsersList, options);
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
