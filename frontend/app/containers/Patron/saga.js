import { call, put, select, takeLatest, fork, take  } from 'redux-saga/effects';
import { REQUEST_MY_LIBRARIES, REQUEST_GET_LIBRARY_OPTIONLIST, REQUEST_ACCESS_TO_LIBRARIES,REQUEST_UPDATE_ACCESS_TO_LIBRARIES,REQUEST_DELETE_ACCESS_TO_LIBRARIES,  REQUEST_REFERENCES_LIST,
  REQUEST_POST_REFERENCES, REQUEST_UPDATE_REFERENCES, 
  REQUEST_GET_MY_LIBRARY, REQUEST_GET_REFERENCE } from './constants';
import {
  requestError,
  stopLoading,
  requestSuccess,
  requestMyLibrariesSuccess,
  requestGetMyLibrarySuccess,
  /* requestGetLibraryList, */
  requestLibraryOptionListSuccess,
  requestReferencesListSuccess,
  requestReferencesList,
  requestGetReferenceSuccess,
} from './actions';
import { push } from 'connected-react-router';
import { toast } from "react-toastify";
import {  getMyLibrary,
          getMyLibraries,
          getLibraryOptionList,
          requestAccessToLibrary,
          deleteAccessToLibrary,
          updateAccessToLibrary,
          getReferencesList,
          createReference,
          updateReference,
          getReference, } from 'utils/api';


export function* requestMyLibrariesSaga(action) {
  const options = {
    method: 'get',
    page: action && action.page ? action.page : '1',
    query: action && action.query ? action.query : ''
  };
  try {
    const request = yield call(getMyLibraries, options);
    yield put(requestMyLibrariesSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestLibraryOptionListSaga(action = {}) {
  const options = {
    method: 'get',
    query: action.query ?  action.query : ""
  }
  try {
    const request = yield call(getLibraryOptionList, options);
    yield put(requestLibraryOptionListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestAccessToLibrarySaga(action) {
  const options = {
    method: 'post',
    body: action.request,
    library_id: action.request.library_id
  };
  try {
    const request = yield call(requestAccessToLibrary, options);
    yield call(requestMyLibrariesSaga);
    yield put(push("/patron/my-libraries"))
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestDeleteAccessToLibrarySaga(action) {
  
  const options = {
    method: 'delete',
    body: {
      id: action.id,
      library_id:action.library_id,
    },
  };

  try {
    const request = yield call(deleteAccessToLibrary, options);
    yield call(requestMyLibrariesSaga);
    yield call(() => toast.success(action.message)) 
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestUpdateAccessToLibrarySaga(action) {
  const options = {
    method: 'put',
    body: action.request,
    id: action.request.id,
    library_id: action.request.library_id
  };
  try {
    const request = yield call(updateAccessToLibrary, options);
    yield call(requestMyLibrariesSaga);
    yield put(push("/patron/my-libraries"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestReferencesListSaga(action) {
  const options = {
    method: 'get',
    page: action.page ? action.page : '1',
    query: action.query ? action.query : ''
  };
  try {
    const request = yield call(getReferencesList, options);
    yield put(requestReferencesListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestPostReferencesSaga(action) {
  const options = {
    method: 'post',
    body: action.request
  };
  try {
    const request = yield call(createReference, options);
    yield put(requestReferencesList())
    yield put(push("/patron/references"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestUpdateReferenceSaga(action) {
  const options = {
    method: 'put',
    body: action.request,
    id: action.id
  };
  try {
    const request = yield call(updateReference, options);
    yield put(requestReferencesList())
    yield put(push("/patron/references"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}



export function* requestGetReferenceSaga(action) {
  const options = {
    method: 'get',
    id: action.id
  };
  try {
    const request = yield call(getReference, options);
    yield put(requestGetReferenceSuccess(request))
    // yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestGetMyLibrarySaga(action) {
  const options = {
    method: 'get',
    id: action.id
  };
  try {
    const request = yield call(getMyLibrary, options);
    yield put(requestGetMyLibrarySuccess(request))
    // yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* patronSaga() {
  yield takeLatest(REQUEST_MY_LIBRARIES, requestMyLibrariesSaga);
  yield takeLatest(REQUEST_GET_LIBRARY_OPTIONLIST, requestLibraryOptionListSaga);
  yield takeLatest(REQUEST_GET_MY_LIBRARY, requestGetMyLibrarySaga);
  yield takeLatest(REQUEST_ACCESS_TO_LIBRARIES, requestAccessToLibrarySaga);
  yield takeLatest(REQUEST_UPDATE_ACCESS_TO_LIBRARIES,requestUpdateAccessToLibrarySaga);
  yield takeLatest(REQUEST_DELETE_ACCESS_TO_LIBRARIES,requestDeleteAccessToLibrarySaga);
  yield takeLatest(REQUEST_REFERENCES_LIST, requestReferencesListSaga);
  yield takeLatest(REQUEST_POST_REFERENCES, requestPostReferencesSaga);
  yield takeLatest(REQUEST_UPDATE_REFERENCES, requestUpdateReferenceSaga);
  yield takeLatest(REQUEST_GET_REFERENCE, requestGetReferenceSaga);
}

