import {UPLOAD_REQUEST,UPLOAD_SUCCESS, UPLOAD_PROGRESS} from './constants';

  export function requestuploadFile(id,lending_library_id,selectedFile, originalfilename, status, message,filter) {
    return {
       type: UPLOAD_REQUEST,
       id,
       lending_library_id,
       selectedFile,
       payload: originalfilename,
       status,
       message,
       filter
     };
   }
   
   export function uploadProgress(id,lending_library_id,file, progress, status, message,filter) {
     return {
       type: UPLOAD_PROGRESS,
       id,
       lending_library_id,
       file,
       progress,
       status,
       message,
       filter
     };
   }
   
   export function uploadSuccess(result) {
    return {
       type: UPLOAD_SUCCESS,
       result
     };
  
     
  
      
   }
   
   export function uploadFailure(id,lending_library_id,file, status, message,filter) {
     return {
       type: UPLOAD_FAILURE,
       id,
       lending_library_id,
       file,
       status,
       message,
       filter
     };
   }
  
