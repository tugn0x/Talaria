import {
    REQUEST_FIND_REFERENCE_BY_ID,REQUEST_FIND_REFERENCE_BY_ID_SUCCESS,REQUEST_GET_REFERENCE,REQUEST_GET_REFERENCE_SUCCESS
} from './constants'

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
  
  //Find reference metadata by PMID
  export function requestFindReferenceById(id) {
    return {
      type: REQUEST_FIND_REFERENCE_BY_ID,
      id
    };
  }
  
  export function requestFindReferenceByIdSuccess(result) {
    return {
      type: REQUEST_FIND_REFERENCE_BY_ID_SUCCESS,
      result
    };
  }