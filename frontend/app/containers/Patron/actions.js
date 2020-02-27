/*
 *
 * Patron actions
 *
 */

import {DEFAULT_ACTION, REQUEST_MY_LIBRARIES, REQUEST_MY_LIBRARIES_SUCCESS,
  REQUEST_GET_LIBRARIES_LIST, REQUEST_GET_LIBRARIES_LIST_SUCCESS, 
  REQUEST_ACCESS_TO_LIBRARIES, REQUEST_ACCESS_TO_LIBRARIES_SUCCESS, 
  REQUEST_REFERENCES_LIST, REQUEST_REFERENCES_LIST_SUCCESS, 
  REQUEST_POST_REFERENCES, REQUEST_POST_REFERENCES_SUCCESS, REQUEST_ERROR, STOP_LOADING} from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}


export function requestPostReferences(request) {
  return {
    type: REQUEST_POST_REFERENCES,
    request
  };
}

export function requestPostReferencesSuccess(result) {
  return {
    type: REQUEST_POST_REFERENCES_SUCCESS,
    result
  };
}

export function requestReferencesList() {
  return {
    type: REQUEST_REFERENCES_LIST,
  };
}

export function requestReferencesListSuccess(result) {
  return {
    type: REQUEST_REFERENCES_LIST_SUCCESS,
    result
  };
}

export function requestMyLibraries() {
  return {
    type: REQUEST_MY_LIBRARIES,
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
  return {
    type: REQUEST_ACCESS_TO_LIBRARIES,
    request: {library_id: request[0].value}
  };
}

export function requestAccessToLibrarySuccess(result) {
  return {
    type: REQUEST_ACCESS_TO_LIBRARIES_SUCCESS,
    result
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
