import { call, put, takeLatest } from 'redux-saga/effects';
import { REQUEST_USERS_LIST, REQUEST_UPDATE_USER,
          REQUEST_POST_USER, REQUEST_USER, REQUEST_GET_LIBRARY,
          REQUEST_USERS_OPTIONLIST,
          REQUEST_GET_ROLES,
          REQUEST_GET_LIBRARIES_LIST,
          REQUEST_UPDATE_LIBRARY,
          REQUEST_DELETE_LIBRARY,
          REQUEST_POST_LIBRARY,
          REQUEST_GET_INSTITUTION_TYPE_LIST,
          REQUEST_GET_PROJECT,
          REQUEST_GET_PROJECTS_LIST,
          REQUEST_GET_PROJECTS_OPTIONLIST,
          REQUEST_UPDATE_PROJECT,
          REQUEST_POST_PROJECT,
          REQUEST_GET_INSTITUTIONS_LIST,
          REQUEST_GET_INSTITUTION,
          REQUEST_GET_INSTITUTIONS_OPTIONLIST,
          REQUEST_GET_INSTITUTIONS_TYPE_COUNTRY_OPTIONLIST,
          REQUEST_INSTITUTIONSTYPES_OPTIONLIST,
          REQUEST_POST_INSTITUTION,
          REQUEST_GET_COUNTRIES_OPTIONLIST,
          UPDATE_INSTITUTION,
          REQUEST_LIBRARYSUBJECT_OPTIONLIST,
          REQUEST_POST_PUBLIC_LIBRARY,
          REQUEST_SEARCH_PLACES_BY_TEXT,
          REQUEST_GET_LIBRARY_LIST,
          REQUEST_GET_LIBRARY_PROJECTS_OPTIONLIST,
          REQUEST_STATUS_CHANGE_LIBRARY,
          REQUEST_STATUS_CHANGE_INSTITUTION,
          REQUEST_DELETE_INSTITUTION

} from './constants';
import {
  requestError,
  stopLoading,
  requestSuccess,
  requestUsersListSuccess,
  requestUserSuccess,
  requestUsersOptionListSuccess,
  requestGetLibrarySuccess,
  requestGetLibrariesListSuccess,
  requestGetInstitutionTypeListSuccess,
  requestGetProjectSuccess,
  requestGetProjectsListSuccess,
  requestGetProjectsOptionListSuccess,
  requestGetInstitutionsListSuccess,
  requestGetInstitutionTypeOptionListSuccess,
  requestGetInstitutionsOptionListSuccess,
  requestGetInstitutionsByTypeByCountryOptionListSuccess,
  requestGetCountriesOptionListSuccess,
  requestGetInstitutionSuccess,
  requestGetRolesSuccess,
  requestLibrarySubjectOptionListSuccess,
  requestSearchPlacesByTextSuccess,
  requestSearchPlacesByTextFail,  
  requestGetLibraryListNearToSuccess,
  requestGetlibraryProjectsOptionListSuccess,
  
} from './actions';
import { toast } from "react-toastify";
import { push } from 'connected-react-router';
import {getUsersList, updateUser, createUser, getUsersOptionsList,
        getRoles, getUser,
        createLibrary, getInstituionTypeList, 
        getInstitutionTypesOptionList,  
        /*getInstitutionsOptionList,*/
        getCountriesOptionsList,
        getProject, getProjectsList, updateProject,getProjectsOptionList, getlibraryProjectsOptionList,
        createProject, getLibrariesSubjects,createPublicLibrary,
        getLibrariesListNearTo} from 'utils/api'

import {admin_getLibrariesList,admin_deleteLibrary,admin_statusChangeLibrary,
  admin_getInstitutionsList,admin_getInstitution, admin_createInstitution,admin_updateInstitution,admin_deleteInstitution,admin_statusChangeInstitution,admin_getInstitutionsByTypeByCountryOptionList,
  admin_getLibrary, admin_updateLibrary} from 'utils/apiAdmin'

import { getPlacesByText } from 'utils/apiExternal';   

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
    page: action.page ? action.page : '1',
    query: action.query ? action.query : ''
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
    body: action.request
  };
  try {
    const request = yield call(updateUser, options);
    yield put(requestSuccess());
    yield put(push("/admin/users"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestPostUserSaga(action) {
  const options = {
    method: 'post',
    body: action.request
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

export function* requestUsersOptionListSaga(action) {
  const options = {
    method: 'get',
    query: action.request ? action.request : ""
  }
  try {
    const request = yield call(getUsersOptionsList, options);
    yield put(requestUsersOptionListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestGetRolesSaga() {
  const options = {
    method: 'get'
  };
  try {
   const request = yield call(getRoles, options);
   yield put(requestGetRolesSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestPostLibrarySaga(action) {
  console.log(action)
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

export function* requestPostPublicLibrarySaga(action) {
  const options = {
    method: 'post',
    body: {...action.request }
    
  };
  try {
    
    const request = yield call(createPublicLibrary, options);
    // yield call(requestGetLibrariesListSaga);
    yield put(push("/"));
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
   const request = yield call(admin_getLibrary, options);
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
    const request = yield call(admin_updateLibrary, options);
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
    page: action.page ? action.page : '1',
    pageSize: action.pageSize ? action.pageSize : null,
    /* implement library list filtering
    query: action.query ? action.query : '',
    filterBy: action.filterBy ? action.filterBy : '',
    filterVal: action.filterBy ? action.filterVal : '',*/
  };
  try {
    const request = yield call(admin_getLibrariesList, options);
    yield put(requestGetLibrariesListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestDeleteLibrarySaga(action) {
  const options = {
    method: 'delete',
    id: action.id
  };
  try {
    const request = yield call(admin_deleteLibrary, options);
    yield call(requestGetLibrariesListSaga);
    yield put(push("/admin/libraries"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestStatusChangeLibrarySaga(action) {  
  const options = {
    method: 'put',
    body: {'status': action.status},
    library_id: action.library_id,    
  };
  try {
    const request = yield call(admin_statusChangeLibrary, options);
    yield call(requestGetLibrariesListSaga);
    yield put(push("/admin/libraries"));
    yield call(() => toast.success(action.message))
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

export function* requestGetInstitutionsListSaga(action = {}) {
  const options = {
    method: 'get',
    page: action.page ? action.page : '1',
    pageSize: action.pageSize ? action.pageSize : null,
    /* implement library list filtering
    query: action.query ? action.query : '',
    filterBy: action.filterBy ? action.filterBy : '',
    filterVal: action.filterBy ? action.filterVal : '',*/
  };
  try {
    const request = yield call(admin_getInstitutionsList, options);
    yield put(requestGetInstitutionsListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestStatusChangeInstitutionSaga(action) {  
  const options = {
    method: 'put',
    body: {'status': action.status},
    institution_id: action.institution_id,    
  };
  try {
    const request = yield call(admin_statusChangeInstitution, options);
    yield call(requestGetInstitutionsListSaga);
    yield put(push("/admin/institutions"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestGetInstitutionSaga(action) {
  const options = {
    method: 'get',
    id: action.id
  };
  try {
   const request = yield call(admin_getInstitution, options);
   yield put(requestGetInstitutionSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestDeleteInstitutionSaga(action) {
  const options = {
    method: 'delete',
    id: action.id
  };
  try {
    const request = yield call(admin_deleteInstitution, options);
    yield call(requestGetInstitutionsListSaga);
    yield put(push("/admin/institutions"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

/*export function* requestInstitutionsOptionListSaga(action) {
  const options = {
    method: 'get',
    query: action.request ? action.request : ""
  
  }
  try {
    const request = yield call(getInstitutionsOptionList, options);
    yield put(requestGetInstitutionsOptionListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}*/




export function* requestGetInstitutionsByTypeByCountryOptionListSaga(action) {
 const options = {
    method: 'get',
    query: action.request ? action.request : "",
    countryid: action.countryid,
    institutiontypeid: action.institutiontypeid
  }
  try {
    const request = yield call(admin_getInstitutionsByTypeByCountryOptionList, options);
    yield put(requestGetInstitutionsByTypeByCountryOptionListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestInstitutionTypeOptionListSaga(action) {
  const options = {
    method: 'get',
    query: action.request ? action.request : ""
  }
  try {
    const request = yield call(getInstitutionTypesOptionList, options);
    yield put(requestGetInstitutionTypeOptionListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestUpdateInstitutionSaga(action) {
  const options = {
    method: 'put',
    body: action.request
  };
  try {
    // console.log(action)
    const request = yield call(admin_updateInstitution, options);
    yield call(requestGetInstitutionsListSaga);
    yield put(push("/admin/institutions"));
    yield call(() => toast.success(action.message))
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestGetCountriesOptionListSaga(action) {
  const options = {
    method: 'get',
    query: action.request
  }
  try {
    const request = yield call(getCountriesOptionsList, options);
    yield put(requestGetCountriesOptionListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestLibrarySubjectOptionListSaga(action) {
  const options = {
    method: 'get',
    query: action.request ? action.request : ""
  }
  try {
    const request = yield call(getLibrariesSubjects, options);
    yield put(requestLibrarySubjectOptionListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function* requestPostInstitutionSaga(action) {
  const options = {
    method: 'post',
    body: {...action.request}
  };

  try {
    const request = yield call(admin_createInstitution, options);
    yield call(requestGetInstitutionsListSaga)
    yield put(push("/admin/institutions"))
    yield call(() => toast.success(action.message))
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

export function* requestProjectsOptionListSaga(action) {
  const options = {
    method: 'get',
    query: action.request ? action.request : ""
  }
  try {
    const request = yield call(getProjectsOptionList, options);
    yield put(requestGetProjectsOptionListSuccess(request));
  } catch(e) {
    yield put(requestError(e.message));
  }
}

export function*  requestGetlibraryProjectsOptionList(action) {
  const options = {
    method: 'get',
    query: action.request ? action.request : ""
  }
  try {
    const request = yield call(getlibraryProjectsOptionList, options);

    yield put(requestGetlibraryProjectsOptionListSuccess(request));
  } catch(e) {
    
    
    yield put(requestError(e.message));
  }
}



export function* findPlacesByText(action) {
  console.log("findPlacesByText:", action);
  const options = {
    method: 'get',    
    search: action.search,    
  }
  try {
    const result = yield call(getPlacesByText, options);
    yield put(requestSearchPlacesByTextSuccess(result));          
  } catch(e) {    
    yield put(requestSearchPlacesByTextFail(e.message));
  }
}

export function* requestLibraryListNearToSaga(action = {}) {
  console.log("SAGA-requestLibraryListNearToSaga",action)
  const options = {
    method: 'get',
    pos: action.pos ?  action.pos : ""
  }
  try {
    const request = yield call(getLibrariesListNearTo, options);
    yield put(requestGetLibraryListNearToSuccess(request));
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
  yield takeLatest(REQUEST_USERS_OPTIONLIST, requestUsersOptionListSaga);
  yield takeLatest(REQUEST_GET_ROLES, requestGetRolesSaga);
  yield takeLatest(REQUEST_GET_LIBRARY, requestGetLibrarySaga);
  yield takeLatest(REQUEST_GET_LIBRARIES_LIST, requestGetLibrariesListSaga);
  yield takeLatest(REQUEST_DELETE_LIBRARY, requestDeleteLibrarySaga);
  yield takeLatest(REQUEST_STATUS_CHANGE_LIBRARY,requestStatusChangeLibrarySaga);
  yield takeLatest(REQUEST_UPDATE_LIBRARY, requestUpdateLibrarySaga);
  yield takeLatest(REQUEST_POST_LIBRARY, requestPostLibrarySaga);
  yield takeLatest(REQUEST_POST_PUBLIC_LIBRARY, requestPostPublicLibrarySaga);
  yield takeLatest(REQUEST_GET_INSTITUTION_TYPE_LIST, requestGetInstitutionTypeListSaga);
  yield takeLatest(REQUEST_GET_PROJECT, requestGetProjectSaga);
  yield takeLatest(REQUEST_GET_PROJECTS_LIST, requestGetProjectsListSaga);
  yield takeLatest(REQUEST_GET_PROJECTS_OPTIONLIST, requestProjectsOptionListSaga);

  yield takeLatest(REQUEST_GET_LIBRARY_PROJECTS_OPTIONLIST, requestGetlibraryProjectsOptionList)

  yield takeLatest(REQUEST_UPDATE_PROJECT, requestUpdateProjectSaga);
  yield takeLatest(REQUEST_POST_PROJECT, requestPostProjectSaga);
  yield takeLatest(REQUEST_GET_INSTITUTIONS_LIST, requestGetInstitutionsListSaga);
  yield takeLatest(REQUEST_STATUS_CHANGE_INSTITUTION,requestStatusChangeInstitutionSaga);
  yield takeLatest(REQUEST_DELETE_INSTITUTION, requestDeleteInstitutionSaga);
  yield takeLatest(REQUEST_INSTITUTIONSTYPES_OPTIONLIST, requestInstitutionTypeOptionListSaga);
  
  
  //yield takeLatest(REQUEST_GET_INSTITUTIONS_OPTIONLIST, requestInstitutionsOptionListSaga);


  yield takeLatest(REQUEST_GET_INSTITUTIONS_TYPE_COUNTRY_OPTIONLIST, requestGetInstitutionsByTypeByCountryOptionListSaga);

  yield takeLatest(REQUEST_LIBRARYSUBJECT_OPTIONLIST, requestLibrarySubjectOptionListSaga);
  yield takeLatest(REQUEST_GET_INSTITUTION, requestGetInstitutionSaga);
  yield takeLatest(REQUEST_POST_INSTITUTION, requestPostInstitutionSaga);
  yield takeLatest(REQUEST_GET_COUNTRIES_OPTIONLIST, requestGetCountriesOptionListSaga);
  yield takeLatest(UPDATE_INSTITUTION, requestUpdateInstitutionSaga);
  yield takeLatest(REQUEST_SEARCH_PLACES_BY_TEXT,findPlacesByText);
  yield takeLatest(REQUEST_GET_LIBRARY_LIST, requestLibraryListNearToSaga);
}
