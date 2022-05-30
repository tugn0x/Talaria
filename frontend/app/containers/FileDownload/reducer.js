/*
 *
 * File Upload Download Reducer
 *
 */
import produce from 'immer';
import { 
  DOWNLOAD_REQUEST,
  DOWNLOAD_SUCCESS,
  DOWNLOAD_FAILURE,
  REQUEST_CLEAN_FILEDOWNLOAD
} from './constants';

export const initialState = {
  loading: false,  
  error: null,  
  filedownload: {},  
};

/* eslint-disable default-case, no-param-reassign */
const filedownloadreducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DOWNLOAD_REQUEST:
          draft.loading=true;
        break;
      case DOWNLOAD_SUCCESS:
            draft.loading = false;
            draft.error = initialState.error;
            draft.filedownload={};
            draft.filedownload = action.result?action.result:{};
        break;  
      case DOWNLOAD_FAILURE:
          draft.loading = false;
          draft.error = action.error;
        break;
        case REQUEST_CLEAN_FILEDOWNLOAD:
          draft.filedownload={};
          break;
    }
  });

export default filedownloadreducer;