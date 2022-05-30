import { call, put, select, takeLatest, takeEvery,fork, take  } from 'redux-saga/effects';
import { DOWNLOAD_REQUEST} from './constants';
import {  requestError,   downloadSuccess } from './actions';
import { filedownloadRequest} from '../../utils/api';     

export function* downloadFileSaga(action) {
  const options = {
    method: 'get',responseType: 'blob',  headers: {
      'Content-Type': 'application/pdf',
    },
    id: action.id,
    filehash: action.filehash,
    library_id: action.library_id
  };

  try {
    const request = yield call(filedownloadRequest, options);   
     yield put (downloadSuccess(request))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* DownloadFileSaga() {
  yield takeLatest(DOWNLOAD_REQUEST,downloadFileSaga); 
}

