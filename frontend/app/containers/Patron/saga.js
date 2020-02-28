import { call, put, select, takeLatest, fork, take  } from 'redux-saga/effects';
import { REQUEST_MY_LIBRARIES, REQUEST_GET_LIBRARIES_LIST, REQUEST_ACCESS_TO_LIBRARIES, REQUEST_REFERENCES_LIST,
  REQUEST_POST_REFERENCES, REQUEST_UPDATE_REFERENCES } from './constants';
import {
  requestError,
  stopLoading,
  requestMyLibrariesSuccess,
  requestGetLibraryList,
  requestGetLibraryListSuccess,
  requestAccessToLibrarySuccess,
  requestReferencesListSuccess,
  requestPostReferencesSuccess
} from './actions';
import { push } from 'connected-react-router';
import { toast } from "react-toastify";
import { getMyLibraries, 
          getLibraryList, 
          requestAccessToLibrary, 
          getReferencesList, 
          createReferences } from 'utils/api';


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
  // console.log('requestGetLibraryListSaga')
  const options = {
    method: 'get',
    query: action.request
  }
  try {
    const request = yield call(getLibraryList, options);
    yield put(requestGetLibraryListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestAccessToLibrarySaga(action) {
  const options = {
    method: 'post',
    body: {
      library_id: action.request.library_id
    }
  }; 
  try {
    const request = yield call(requestAccessToLibrary, options);
    yield call(requestMyLibrariesSaga)
    yield call(toast.success('Libreria Aggiunta'))
   // yield put(requestAccessToLibrarySuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  } 
}

export function* requestReferencesListSaga() {
  const options = {
    method: 'get'
  };
  try {
    const request = yield call(getReferencesList, options);
    yield put(requestReferencesListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestPostReferencesSaga(action) {
  console.log(action)
  const options = {
    method: action.method,
    body: action.request
  };
  try {
    const request = yield call(createReferences, options);
    yield put(requestPostReferencesSuccess());
    if(action.method === 'post'){
      yield call(toast.success('Referenza creata'))
    } else {
      yield call(toast.success('Referenza aggiornata'))
    }
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
  yield takeLatest(REQUEST_ACCESS_TO_LIBRARIES, requestAccessToLibrarySaga);
  yield takeLatest(REQUEST_REFERENCES_LIST, requestReferencesListSaga);
  yield takeLatest(REQUEST_POST_REFERENCES, requestPostReferencesSaga);
}
