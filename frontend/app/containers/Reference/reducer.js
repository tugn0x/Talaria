/*
 *
 * Patron reducer
 *
 */
import produce from 'immer';
import {
  REQUEST_GET_REFERENCE,
  REQUEST_GET_REFERENCE_SUCCESS,   
  REQUEST_FIND_REFERENCE_BY_ID,
  REQUEST_FIND_REFERENCE_BY_ID_SUCCESS,  
} from './constants';

export const initialState = {
  loading: false,
  error: null,
  reference: {}
};

/* eslint-disable default-case, no-param-reassign */
const ReferenceReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
case REQUEST_GET_REFERENCE:
    draft.loading = true;
  break;  

  case REQUEST_GET_REFERENCE_SUCCESS:
    draft.loading = false;
    draft.error = initialState.error;
    draft.reference = action.result.data;
    break;     

    case REQUEST_FIND_REFERENCE_BY_ID:
      draft.loading=true;
    break;
      
    case REQUEST_FIND_REFERENCE_BY_ID_SUCCESS:
      draft.loading = false;
      draft.error = initialState.error;
      draft.reference={};
      draft.reference = action.result?action.result:{};
      break;
    }
});

export default ReferenceReducer;