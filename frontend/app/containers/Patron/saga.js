import { call, put, select, takeLatest, fork, take  } from 'redux-saga/effects';
import { REQUEST_MY_LIBRARIES, REQUEST_GET_LIBRARIES_LIST } from './constants';
import {
  requestError,
  stopLoading,
  requestMyLibrariesSuccess,
  requestGetLibraryList
} from './actions';
import { push } from 'connected-react-router';
import { toast } from "react-toastify";
import { getMyLibraries, getLibraryList } from 'utils/api';


export function* requestMyLibrariesSaga() {
  const options = {
    method: 'get'
  };
  try {
    const request = yield call(getMyLibraries, options);
    yield put(requestMyLibrariesSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestGetLibraryListSaga(action) {
  console.log('requestGetLibraryListSaga')
  const options = {
    method: 'get'
  }
  try {
    const request = yield call(getLibraryList, options);
    yield put(requestGetLibraryListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* patronSaga() {
  yield takeLatest(REQUEST_MY_LIBRARIES, requestMyLibrariesSaga);
  yield takeLatest(REQUEST_GET_LIBRARIES_LIST, requestGetLibraryListSaga);
}
