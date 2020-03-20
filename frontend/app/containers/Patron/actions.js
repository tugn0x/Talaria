/*
 *
 * Patron actions
 *
 */

import {DEFAULT_ACTION, REQUEST_MY_LIBRARIES, REQUEST_MY_LIBRARIES_SUCCESS,
  REQUEST_GET_LIBRARIES_LIST, REQUEST_GET_LIBRARIES_LIST_SUCCESS, 
  REQUEST_ACCESS_TO_LIBRARIES,
  REQUEST_REFERENCES_LIST, REQUEST_REFERENCES_LIST_SUCCESS, 
  REQUEST_POST_REFERENCES, REQUEST_SUCCESS,
  REQUEST_GET_REFERENCE, REQUEST_GET_REFERENCE_SUCCESS,
  REQUEST_UPDATE_REFERENCES, 
  REQUEST_GET_MY_LIBRARY, REQUEST_GET_MY_LIBRARY_SUCCESS,
  REQUEST_ERROR, STOP_LOADING} from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function requestGetReference(id) {
  return {
    type: REQUEST_GET_REFERENCE,
    id,
  };
}

export function requestGetReferenceSuccess(result) {
  return {
    type: REQUEST_GET_REFERENCE_SUCCESS,
    result,
  };
}

export function requestUpdateReferences(request, id, message) {
  return {
    type: REQUEST_UPDATE_REFERENCES,
    request,
    id,
    message
  };
}

export function requestPostReferences(request, message) {
  return {
    type: REQUEST_POST_REFERENCES,
    request,
    message
  };
}

export function requestReferencesList(page, query) {
  return {
    type: REQUEST_REFERENCES_LIST,
    page,
    query
    
  };
}

export function requestReferencesListSuccess(result) {
  return {
    type: REQUEST_REFERENCES_LIST_SUCCESS,
    result
  };
}


export function requestGetMyLibrary(id) {
  return {
    type: REQUEST_GET_MY_LIBRARY,
    id
  };
}

export function requestGetMyLibrarySuccess(result) {
  return {
    type: REQUEST_GET_MY_LIBRARY_SUCCESS,
    result
  };
}

export function requestMyLibraries(page, query) {
  return {
    type: REQUEST_MY_LIBRARIES,
    page,
    query
  };
}

export function requestMyLibrariesSuccess(result) {
  return {
    type: REQUEST_MY_LIBRARIES_SUCCESS,
    result
  };
}

export function requestGetLibraryList(request) {
  return {
    type: REQUEST_GET_LIBRARIES_LIST,
    request
  };
}

export function requestGetLibraryListSuccess(result) {
  return {
    type: REQUEST_GET_LIBRARIES_LIST_SUCCESS,
    result
  };
}

export function requestAccessToLibrary(request) {
  console.log(request)
  return {
    type: REQUEST_ACCESS_TO_LIBRARIES,
    request: {library_id: request.value}
  };
}

/* export function requestAccessToLibrarySuccess(result) {
  return {
    type: REQUEST_ACCESS_TO_LIBRARIES_SUCCESS,
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
