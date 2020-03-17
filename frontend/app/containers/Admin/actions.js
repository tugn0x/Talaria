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
   REQUEST_GET_INSTITUTIONS_LIST, REQUEST_GET_INSTITUTIONS_LIST_SUCCESS,
   REQUEST_GET_INSTITUTION, REQUEST_GET_INSTITUTION_SUCCESS,
   REQUEST_GET_INSTITUTIONS_SELECT_LIST, REQUEST_GET_INSTITUTIONS_SELECT_LIST_SUCCESS,
   REQUEST_GET_INSTITUTION_TYPE_LIST_SUCCESS, REQUEST_GET_INSTITUTION_TYPE_LIST,
   REQUEST_POST_INSTITUTION, 
   REQUEST_GET_COUNTRIES_SELECT_LIST, REQUEST_GET_COUNTRIES_SELECT_LIST_SUCCESS
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
    type: REQUEST_UPDATE_LIBRARY,
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

export function requestGetInstitutionsList(page = '1') {
  return {
    type: REQUEST_GET_INSTITUTIONS_LIST,
    page
  };
}

export function requestGetInstitutionsListSuccess(result) {
  return {
    type: REQUEST_GET_INSTITUTIONS_LIST_SUCCESS,
    result
  };
}

export function requestGetInstitution(id) {
  return {
    type: REQUEST_GET_INSTITUTION,
    id
  };
}

export function requestGetInstitutionSuccess(result) {
  return {
    type: REQUEST_GET_INSTITUTION_SUCCESS,
    result
  };
}

export function requestGetInstitutionsSelectList(request) {
  return {
    type: REQUEST_GET_INSTITUTIONS_SELECT_LIST,
    request
  };
}

export function requestGetInstitutionsSelectListSuccess(result) {
  return {
    type: REQUEST_GET_INSTITUTIONS_SELECT_LIST_SUCCESS,
    result
  };
}

export function requestGetCountriesSelectList(request) {
  return {
    type: REQUEST_GET_COUNTRIES_SELECT_LIST,
    request
  };
}

export function requestGetCountriesSelectListSuccess(result) {
  return {
    type: REQUEST_GET_COUNTRIES_SELECT_LIST_SUCCESS,
    result
  };
}

export function requestPostInstitution(request) {
  return {
    type: REQUEST_POST_INSTITUTION,
    request: {
      ...request, 
      institution_type_id: request.institution_type_id.value}
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
