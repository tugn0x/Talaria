import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mapPage state domain
 */

const fileDownloadDomain = state => state.filedownload || initialState;


const fileDownloadSelector = () =>
createSelector(
    fileDownloadDomain,
    substate => (substate.filedownload)
  );

  

export default fileDownloadSelector;
