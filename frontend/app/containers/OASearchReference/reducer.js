/*
 *
 * Patron reducer
 *
 */
import produce from 'immer';
import { //DEFAULT_ACTION,
  //REQUEST_SUCCESS,
  //STOP_LOADING, 
  REQUEST_ERROR,  
  REQUEST_FIND_OA,
  REQUEST_FIND_OA_SUCCESS,
  REQUEST_CLEAN_IMPORTREFERENCE,
} from './constants';

export const initialState = {
  loading: false,  
  error: null,  
  oareference: {},  
};

/* eslint-disable default-case, no-param-reassign */
const OASearchReferenceReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REQUEST_FIND_OA:
          draft.loading=true;
        break;
      case REQUEST_FIND_OA_SUCCESS:
            draft.loading = false;
            draft.error = initialState.error;
            draft.oareference={};
            draft.oareference = action.result?action.result:{};
            break;  
     
              
        case REQUEST_CLEAN_IMPORTREFERENCE:
          //draft.importedreference={};
          draft.oareference={};
          break;
               
      case REQUEST_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default OASearchReferenceReducer;
