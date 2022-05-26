import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the file upload state domain
 */

const fileUploadDomain = state => state.fileupload || initialState;


const fileUploadSelector = () =>
createSelector(
  fileUploadDomain,
    substate => (substate.fileupload)
  );

  

export default fileUploadSelector;
