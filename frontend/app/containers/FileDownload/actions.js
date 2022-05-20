import {DOWNLOAD_REQUEST,
  DOWNLOAD_SUCCESS,
  DOWNLOAD_FAILURE, REQUEST_ERROR, REQUEST_CLEAN_FILEDOWNLOAD} from './constants';

export function requestdownloadFile(id,filehash,library_id, status, message,filter) {
  console.log("requestdownloadFile action")
  return {
     type: DOWNLOAD_REQUEST,
     id,
     filehash,
     library_id,
     status,
     message,
     filter
   };
 }

 export function downloadSuccess(result) {
  return {
     type: DOWNLOAD_SUCCESS,
     result
   };
  }

   export function downloadFailure(result) {
    return {
       type:DOWNLOAD_FAILURE,
       result
     };
  }


  export function cleanFileDownload() {
    return {
      type: REQUEST_CLEAN_FILEDOWNLOAD
    }
  }

  export function requestError(errorMessage) {  
    return {
      type: REQUEST_ERROR,
      error: errorMessage
    };
  }

  
