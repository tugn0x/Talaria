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
   REQUEST_GET_ROLES, REQUEST_GET_ROLES_SUCCESS,
   REQUEST_GET_PROJECT, REQUEST_GET_PROJECT_SUCCESS,
   REQUEST_GET_PROJECTS_LIST, REQUEST_GET_PROJECTS_LIST_SUCCESS,
   REQUEST_UPDATE_PROJECT, 
   REQUEST_POST_PROJECT,
   REQUEST_GET_INSTITUTIONS_LIST, REQUEST_GET_INSTITUTIONS_LIST_SUCCESS,
   REQUEST_GET_INSTITUTION, REQUEST_GET_INSTITUTION_SUCCESS,
   REQUEST_INSTITUTIONSTYPES_OPTIONLIST, REQUEST_INSTITUTIONSTYPES_OPTIONLIST_SUCCESS,
   REQUEST_GET_INSTITUTION_TYPE_LIST_SUCCESS, REQUEST_GET_INSTITUTION_TYPE_LIST,
   REQUEST_POST_INSTITUTION, UPDATE_INSTITUTION,
   REQUEST_GET_COUNTRIES_OPTIONLIST, REQUEST_GET_COUNTRIES_OPTIONLIST_SUCCESS
} from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function requestUsersList(page, query) {
  return {
    type: REQUEST_USERS_LIST,
    page,
    query
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

export function requestGetRoles() {
  return {
    type: REQUEST_GET_ROLES,
  };
}

export function requestGetRolesSuccess(result) {
  return {
    type: REQUEST_GET_ROLES_SUCCESS,
    result
  };
}

export function requestGetLibrariesList(page = '1', query) {
  return {
    type: REQUEST_GET_LIBRARIES_LIST,
    page,
    query
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

export function requestGetInstitutionsList(page, query) {
  return {
    type: REQUEST_GET_INSTITUTIONS_LIST,
    page,
    query
  };
}

export function requestGetInstitutionsListSuccess(result) {
  return {
    type: REQUEST_GET_INSTITUTIONS_LIST_SUCCESS,
    result
  };
}

export function requestUpdateInstitution(request, message) {
  return {
    type: UPDATE_INSTITUTION,
    request: {
      ...request, 
      institution_type_id: request.institution_type_id.value,
      country_id: request.country_id.value,
      id: request.id
    },
    message
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

export function requestGetInstitutionTypeOptionList(request) {
  return {
    type: REQUEST_INSTITUTIONSTYPES_OPTIONLIST,
    request
  };
}

export function requestGetInstitutionTypeOptionListSuccess(result) {
  return {
    type: REQUEST_INSTITUTIONSTYPES_OPTIONLIST_SUCCESS,
    result
  };
}

export function requestGetCountriesOptionList(request) {
  return {
    type: REQUEST_GET_COUNTRIES_OPTIONLIST,
    request
  };
}

export function requestGetCountriesOptionListSuccess(result) {
  return {
    type: REQUEST_GET_COUNTRIES_OPTIONLIST_SUCCESS,
    result
  };
}

export function requestPostInstitution(request, message) {
  return {
    type: REQUEST_POST_INSTITUTION,
    request: {
      ...request, 
      institution_type_id: request.institution_type_id.value,
      country_id: request.country_id.value
    },
    message
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