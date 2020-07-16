import { call, put, select, takeLatest, fork, take  } from 'redux-saga/effects';
import { REQUEST_MY_LIBRARIES, REQUEST_GET_LIBRARY_OPTIONLIST, REQUEST_ACCESS_TO_LIBRARIES,REQUEST_UPDATE_ACCESS_TO_LIBRARIES,REQUEST_DELETE_ACCESS_TO_LIBRARIES,  REQUEST_REFERENCES_LIST,
  REQUEST_POST_REFERENCES, REQUEST_UPDATE_REFERENCES, 
  REQUEST_GET_LABELS_OPTIONLIST,REQUEST_GET_GROUPS_OPTIONLIST,
  REQUEST_UPDATE_LABEL, REQUEST_REMOVE_LABEL, REQUEST_POST_LABEL,
  REQUEST_GET_MY_LIBRARY, REQUEST_GET_REFERENCE,REQUEST_REMOVE_REFERENCE_LABEL,REQUEST_REMOVE_REFERENCE_GROUP,REQUEST_APPLY_LABELS_TO_REFERENCES,REQUEST_APPLY_GROUPS_TO_REFERENCES} from './constants';
import {
  requestError,
  stopLoading,
  requestSuccess,
  requestMyLibrariesSuccess,
  requestGetMyLibrarySuccess,
  /* requestGetLibraryList, */
  requestLibraryOptionListSuccess,
  requestLabelsOptionListSuccess,
  requestGroupsOptionListSuccess,
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
          updateLabel,
          createLabel,
          deleteLabel,
          getReference, 
          getLabelsOptionList,
          getGroupsOptionList,
          removeReferenceLabel,
          removeReferenceGroup,
          requestApplyLabelsToReferences,
          requestApplyGroupsToReferences,
        } from 'utils/api';


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

export function* requestLabelsOptionListSaga(action = {}) {
  const options = {
    method: 'get',
  }
  try {
    const request = yield call(getLabelsOptionList, options);
    yield put(requestLabelsOptionListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestGroupsOptionListSaga(action = {}) {
  const options = {
    method: 'get',
  }
  try {
    const request = yield call(getGroupsOptionList, options);
    yield put(requestGroupsOptionListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestRemoveReferenceLabelSaga(action) {
  const options = {
    method: 'delete',
    id: action.id,
    labelId: action.labelId,
  };
  try {
    const request = yield call(removeReferenceLabel, options);
    yield put(requestReferencesList(null, null, action.filter))
   // yield put(push("/patron/references"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestRemoveReferenceGroupSaga(action) {
  const options = {
    method: 'delete',
    id: action.id,
    groupId: action.groupId
  };
  try {
    const request = yield call(removeReferenceGroup, options);
    yield put(requestReferencesList(null, null, action.filter))
   // yield put(push("/patron/references"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestPostLabelSaga(action) {
  const options = {
    method: 'post',
    body: {
      name: action.label_name
    }
    
  };
  try {
    const request = yield call(createLabel, options);
    yield call(requestLabelsOptionListSaga);
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestUpdateLabelSaga(action) {
  const options = {
    method: 'put',
    label_id: action.label_id,
    body: {
      name: action.label_value
    }
    
  };
  try {
    const request = yield call(updateLabel, options);
    yield call(requestLabelsOptionListSaga);
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestRemoveLabelSaga(action) {
  const options = {
    // method: 'delete', 
    label_id: action.label_id,
  };
  try {
    const request = yield call(deleteLabel, options);
    yield call(requestLabelsOptionListSaga);
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}


export function* requestApplyLabelsToReferencesSaga(action) {
  const options = {
    method: 'put',
    body: {
      references: action.refIds,
      labelIds: action.labelIds,
    }
  };
 // console.log("SAGA REQUESTAPPLYLABELS:",action)
  try {
    const request = yield call(requestApplyLabelsToReferences, options);
    yield put(requestReferencesList())
    if(action.labelIds.some(labelId => typeof labelId === 'string' )){
      yield call(requestLabelsOptionListSaga)
    }
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestApplyGroupsToReferencesSaga(action) {
  const options = {
    method: 'put',
    body: {
      references: action.refIds,
      groupIds: action.groupIds,
    }
  };
  try {
    const request = yield call(requestApplyGroupsToReferences, options);
    yield put(requestReferencesList())
    if(action.groupIds.some(groupId => typeof groupId === 'string' )){
      yield call(requestGroupsOptionListSaga)
    }
    yield call(() => toast.success(action.message))
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
    query: action.query ? action.query : null,
    pageSize: action.pageSize ? action.pageSize : null
  };
  try {
   console.log(action)
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
  yield takeLatest(REQUEST_GET_LABELS_OPTIONLIST, requestLabelsOptionListSaga);
  yield takeLatest(REQUEST_GET_GROUPS_OPTIONLIST, requestGroupsOptionListSaga);
  yield takeLatest(REQUEST_GET_MY_LIBRARY, requestGetMyLibrarySaga);
  yield takeLatest(REQUEST_ACCESS_TO_LIBRARIES, requestAccessToLibrarySaga);
  yield takeLatest(REQUEST_UPDATE_LABEL, requestUpdateLabelSaga);
  yield takeLatest(REQUEST_POST_LABEL, requestPostLabelSaga);
  yield takeLatest(REQUEST_REMOVE_LABEL, requestRemoveLabelSaga);
  yield takeLatest(REQUEST_UPDATE_ACCESS_TO_LIBRARIES,requestUpdateAccessToLibrarySaga);
  yield takeLatest(REQUEST_DELETE_ACCESS_TO_LIBRARIES,requestDeleteAccessToLibrarySaga);
  yield takeLatest(REQUEST_REFERENCES_LIST, requestReferencesListSaga);
  yield takeLatest(REQUEST_POST_REFERENCES, requestPostReferencesSaga);
  yield takeLatest(REQUEST_UPDATE_REFERENCES, requestUpdateReferenceSaga);
  yield takeLatest(REQUEST_GET_REFERENCE, requestGetReferenceSaga);
  yield takeLatest(REQUEST_REMOVE_REFERENCE_LABEL,requestRemoveReferenceLabelSaga);
  yield takeLatest(REQUEST_REMOVE_REFERENCE_GROUP,requestRemoveReferenceGroupSaga);
  yield takeLatest(REQUEST_APPLY_LABELS_TO_REFERENCES,requestApplyLabelsToReferencesSaga);
  yield takeLatest(REQUEST_APPLY_GROUPS_TO_REFERENCES,requestApplyGroupsToReferencesSaga);
}

