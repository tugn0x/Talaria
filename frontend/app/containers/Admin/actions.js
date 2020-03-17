/*
 *
 * Admin actions
 *
 */

import {DEFAULT_ACTION, REQUEST_SUCCESS,
   REQUEST_ERROR, STOP_LOADING, REQUEST_USERS_LIST, REQUEST_USERS_LIST_SUCCESS,
   REQUEST_UPDATE_USER, REQUEST_UPDATE_USER_SUCCESS,
   REQUEST_USER, REQUEST_USER_SUCCESS,
   REQUEST_GET_LIBRARY, REQUEST_GET_LIBRARY_SUCCESS,
   REQUEST_GET_LIBRARIES_LIST, REQUEST_GET_LIBRARIES_LIST_SUCCESS,
   REQUEST_UPDATE_LIBRARY, /* REQUEST_UPDATE_LIBRARY_SUCCESS, */
   REQUEST_POST_LIBRARY, REQUEST_POST_LIBRARY_SUCCESS,
   REQUEST_POST_USER, REQUEST_POST_USER_SUCCESS,
   REQUEST_GET_INSTITUTION_TYPE_LIST_SUCCESS, REQUEST_GET_INSTITUTION_TYPE_LIST, 
   REQUEST_GET_PROJECT, REQUEST_GET_PROJECT_SUCCESS,
   REQUEST_GET_PROJECTS_LIST, REQUEST_GET_PROJECTS_LIST_SUCCESS,
   REQUEST_UPDATE_PROJECT, 
   REQUEST_POST_PROJECT,
} from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function requestUsersList(page) {
  return {
    type: REQUEST_USERS_LIST,
    page
  };
}

export function requestUsersListSuccess(result) {
  return {
    type: REQUEST_USERS_LIST_SUCCESS,
    result
  };
}


export function requestUser(id) {
  return {
    type: REQUEST_USER,
    id
  };
}

export function requestUserSuccess(result) {
  return {
    type: REQUEST_USER_SUCCESS,
    result
  };
}

export function requestPostUser(request, message) {
  return {
    type: REQUEST_POST_USER,
    request,
    message
  };
}

export function requestUpdateUser(request, message) {
  return {
    type: REQUEST_UPDATE_USER,
    request,
    message
  };
}

export function requestUpdateUserSuccess(result) {
  return {
    type: REQUEST_UPDATE_USER_SUCCESS,
    result
  };
}

export function requestGetLibrariesList(page) {
  return {
    type: REQUEST_GET_LIBRARIES_LIST,
    page
  };
}

export function requestGetLibrariesListSuccess(result) {
  return {
    type: REQUEST_GET_LIBRARIES_LIST_SUCCESS,
    result
  };
}

export function requestPostLibrary(request, message) {
  return {
    type: REQUEST_POST_LIBRARY,
    request,
    message
  };
}

export function requestGetLibrary(id) {
  return {
    type: REQUEST_GET_LIBRARY,
    id
  };
}

export function requestGetLibrarySuccess(result) {
  return {
    type: REQUEST_GET_LIBRARY_SUCCESS,
    result
  };
}

export function requestUpdateLibrary(request, message) {
  return {
    type: REQUEST_UPDATE_PROJECT,
    request,
    message
  };
}

export function requestGetProjectsList(page) {
  return {
    type: REQUEST_GET_PROJECTS_LIST,
    page
  };
}

export function requestGetProjectsListSuccess(result) {
  return {
    type: REQUEST_GET_PROJECTS_LIST_SUCCESS,
    result
  };
}

export function requestPostProject(request, message) {
  return {
    type: REQUEST_POST_PROJECT,
    request,
    message
  };
}

export function requestGetProject(id) {
  return {
    type: REQUEST_GET_PROJECT,
    id
  };
}

export function requestGetProjectSuccess(result) {
  return {
    type: REQUEST_GET_PROJECT_SUCCESS,
    result
  };
}

export function requestUpdateProject(request, message) {
  return {
    type: REQUEST_UPDATE_PROJECT,
    request,
    message
  };
}

/* export function requestUpdateLibrarySuccess(result) {
  return {
    type: REQUEST_UPDATE_LIBRARY_SUCCESS,
    result
  };
} */

export function requestSuccess() {
  return {
    type: REQUEST_SUCCESS,
  };
}

export function requestError(errorMessage) {
  return {
    type: REQUEST_ERROR,
    error: errorMessage
  };
}

export function stopLoading() {
  return {
    type: STOP_LOADING,
    // request: request
  };
}

export function requestGetInstitutionTypeList(page) {
  console.log('requestGetInstitutionTypeList PASSO DA QUI?')
  return {
    type: REQUEST_GET_INSTITUTION_TYPE_LIST,
    page
  };
}
export function requestGetInstitutionTypeListSuccess(result) {
  return {
    type: REQUEST_GET_INSTITUTION_TYPE_LIST_SUCCESS,
    result
  };
}
