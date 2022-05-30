import { call, put, select, takeLatest, takeEvery,fork, take  } from 'redux-saga/effects';
import { UPLOAD_REQUEST} from './constants';
import {  requestError,   uploadSuccess } from './actions';
import { fileuploadRequest} from '../../utils/api';     

export function* uploadRequestWatcherSaga() {    
  yield takeEvery(UPLOAD_REQUEST, 
    function*(action) { 
      const file = action.payload; 
      yield call(uploadFileSaga, file);    
    });
 }

export function* uploadFileSaga(action) {
  const options = {
    method: 'post',
    body: {'filename': action.selectedFile, 'uploadFile': action.payload, enctype:'multipart/form-data'},
    id: action.id,
    lending_library_id: action.lending_library_id
  };

  try {
    const request = yield call(fileuploadRequest, options);   
    yield put (uploadSuccess(request))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* UploadFileSaga() {
  yield takeLatest(UPLOAD_REQUEST,uploadFileSaga); 
}

