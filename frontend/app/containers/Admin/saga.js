import { call, put, takeLatest } from 'redux-saga/effects';
import { REQUEST_USERS_LIST, REQUEST_UPDATE_USER,
          REQUEST_POST_USER, REQUEST_USER, REQUEST_GET_LIBRARY,
          REQUEST_GET_LIBRARIES_LIST,
          REQUEST_UPDATE_LIBRARY,
          REQUEST_POST_LIBRARY,
          REQUEST_GET_INSTITUTION_TYPE_LIST,
          REQUEST_GET_PROJECT,
          REQUEST_GET_PROJECTS_LIST,
          REQUEST_UPDATE_PROJECT,
          REQUEST_POST_PROJECT,

} from './constants';
import {
  requestError,
  stopLoading,
  requestSuccess,
  requestUsersListSuccess,
  requestUserSuccess,
  requestGetLibrarySuccess,
  requestGetLibrariesListSuccess,
  requestGetInstitutionTypeListSuccess,
  requestGetProjectSuccess,
  requestGetProjectsListSuccess,
} from './actions';
import { toast } from "react-toastify";
import { push } from 'connected-react-router';
import {getUsersList, updateUser, createUser,
        getUser, getLibrary, getLibrariesList, updateLibrary,
        createLibrary, getInstituionTypeList,
        getProject, getProjectsList, updateProject,
        createProject} from 'utils/api'
import moment from 'moment';

export function* requestUserSaga(action) {
  const options = {
    method: 'get',
    id: action.id
  };
  try {
   const request = yield call(getUser, options);
   yield put(requestUserSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}


export function* requestUsersListSaga(action = {}) {
  const options = {
    method: 'get',
    page: action.page ? action.page : '1'
  };
  try {
    const request = yield call(getUsersList, options);
    yield put(requestUsersListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestUpdateUserSaga(action) {
  const options = {
    method: 'put',
    body: {...action.request, privacy_policy_accepted: moment().format('YYYY-MM-DD hh:mm:ss')}
  };
  try {
    const request = yield call(updateUser, options);
    yield call(requestUsersListSaga);
    yield put(push("/admin/users"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestPostUserSaga(action) {
  const options = {
    method: 'post',
    body: {...action.request, privacy_policy_accepted: moment().format('YYYY-MM-DD hh:mm:ss') }
  };
  try {
    const request = yield call(createUser, options);
    yield call(requestUsersListSaga);
    yield put(push("/admin/users"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}


export function* requestPostLibrarySaga(action) {
  const options = {
    method: 'post',
    body: {...action.request }
  };
  try {
    const request = yield call(createLibrary, options);
    yield call(requestGetLibrariesListSaga);
    yield put(push("/admin/libraries"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestGetLibrarySaga(action) {
  const options = {
    method: 'get',
    id: action.id
  };
  try {
   const request = yield call(getLibrary, options);
   yield put(requestGetLibrarySuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestUpdateLibrarySaga(action) {
  const options = {
    method: 'put',
    body: action.request
  };
  try {
    const request = yield call(updateLibrary, options);
    yield call(requestGetLibrariesListSaga);
    yield put(push("/admin/libraries"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestGetLibrariesListSaga(action = {}) {
  const options = {
    method: 'get',
    page: action.page ? action.page : '1'
  };
  try {
    const request = yield call(getLibrariesList, options);
    yield put(requestGetLibrariesListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestGetInstitutionTypeListSaga(action = {}) {
  const options = {
    method: 'get',
    page: action.page ? action.page : '1'
  };
  try {
    const request = yield call(getInstituionTypeList, options);
    yield put(requestGetInstitutionTypeListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestPostProjectSaga(action) {
  const options = {
    method: 'post',
    body: {...action.request }
  };
  try {
    const request = yield call(createProject, options);
    yield call(requestGetProjectsListSaga);
    yield put(push("/admin/projects"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestGetProjectSaga(action) {
  const options = {
    method: 'get',
    id: action.id
  };
  try {
   const request = yield call(getProject, options);
   yield put(requestGetProjectSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestUpdateProjectSaga(action) {
  const options = {
    method: 'put',
    body: action.request
  };
  try {
    const request = yield call(updateProject, options);
    yield call(requestGetProjectsListSaga);
    yield put(push("/admin/projects"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestGetProjectsListSaga(action = {}) {
  const options = {
    method: 'get',
    page: action.page ? action.page : '1'
  };
  try {
    const request = yield call(getProjectsList, options);
    yield put(requestGetProjectsListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* adminSaga() {
  yield takeLatest(REQUEST_USERS_LIST, requestUsersListSaga);
  yield takeLatest(REQUEST_UPDATE_USER, requestUpdateUserSaga);
  yield takeLatest(REQUEST_POST_USER, requestPostUserSaga);
  yield takeLatest(REQUEST_USER, requestUserSaga);
  yield takeLatest(REQUEST_GET_LIBRARY, requestGetLibrarySaga);
  yield takeLatest(REQUEST_GET_LIBRARIES_LIST, requestGetLibrariesListSaga);
  yield takeLatest(REQUEST_UPDATE_LIBRARY, requestUpdateLibrarySaga);
  yield takeLatest(REQUEST_POST_LIBRARY, requestPostLibrarySaga);
  yield takeLatest(REQUEST_GET_INSTITUTION_TYPE_LIST, requestGetInstitutionTypeListSaga);
}
