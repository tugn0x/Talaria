import {REQUEST_FIND_OA,REQUEST_FIND_OA_SUCCESS,REQUEST_CLEAN_IMPORTREFERENCE,REQUEST_ERROR} from './constants';

export function requestFindOA(refData) {
    console.log("FINDOA:",refData)
    return {
      type: REQUEST_FIND_OA,
      refData
    };
  }
  
  export function requestFindOASuccess(result) {
    return {
      type: REQUEST_FIND_OA_SUCCESS,
      result
    };
  }
  
  
  export function cleanImportedreference() {
    return {
      type: REQUEST_CLEAN_IMPORTREFERENCE
    }
  }

  export function requestError(errorMessage) {
    return {
      type: REQUEST_ERROR,
      error: errorMessage
    };
  }
  
