import { call, put, select, takeLatest, fork, take  } from 'redux-saga/effects';
import { REQUEST_MY_LIBRARIES } from './constants';
import {
  requestError,
  stopLoading,
  requestMyLibrariesSuccess,
  // requestMyLibraries,
} from './actions';
import { push } from 'connected-react-router';
import { toast } from "react-toastify";
import { getMyLibraries } from 'utils/api';


export function* requestMyLibrariesSaga() {
  console.log('SAGA requestMyLibrariesSaga')
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


/**
 * Root saga manages watcher lifecycle
 */
export default function* authSaga() {
  yield takeLatest(REQUEST_MY_LIBRARIES, requestMyLibrariesSaga);
}
