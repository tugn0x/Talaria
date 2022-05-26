/*
 *
 * File Upload Download Reducer
 *
 */
import produce from 'immer';
import { 
  UPLOAD_REQUEST,
  UPLOAD_PROGRESS,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE
} from './constants';

export const initialState = {
  loading: false,  
  error: null,  
  fileupload: {},  
};

/* eslint-disable default-case, no-param-reassign */
const fileuploadreducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case UPLOAD_PROGRESS:
        draft.loading = false;
        draft.error = initialState.error;

    case UPLOAD_REQUEST:
        draft.loading = false;
        draft.error = initialState.error;
        break;

    case UPLOAD_SUCCESS:
    draft.loading = false;
        draft.error = initialState.error;
        draft.fileupload  = action.result;        
        break;  
        
    case UPLOAD_FAILURE:
        draft.loading = true;
        draft.error = initialState.error;
        break;
    }
  });

export default fileuploadreducer;