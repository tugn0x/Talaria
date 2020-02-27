/*
 *
 * Patron reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, REQUEST_MY_LIBRARIES, REQUEST_MY_LIBRARIES_SUCCESS,
  REQUEST_GET_LIBRARIES_LIST, REQUEST_GET_LIBRARIES_LIST_SUCCESS, 
  REQUEST_ACCESS_TO_LIBRARIES, REQUEST_ACCESS_TO_LIBRARIES_SUCCESS, 
  REQUEST_REFERENCES_LIST, REQUEST_REFERENCES_LIST_SUCCESS, 
  REQUEST_POST_REFERENCES, REQUEST_POST_REFERENCES_SUCCESS, STOP_LOADING, REQUEST_ERROR } from './constants';

export const initialState = {
  loading: false,
  my_libraries: [],
  error: null,
  librariesList: [],
  referencesList: []
};

/* eslint-disable default-case, no-param-reassign */
const PatronReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case REQUEST_POST_REFERENCES:
        draft.loading = true;
        break;
      case REQUEST_POST_REFERENCES_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        break;
      case REQUEST_REFERENCES_LIST:
        draft.loading = true;
        break;
      case REQUEST_REFERENCES_LIST_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.referencesList = action.result.data;
        break;
      case REQUEST_MY_LIBRARIES:
        draft.loading = true;
        break;
      case REQUEST_GET_LIBRARIES_LIST:
        draft.loading = true;
        draft.error = initialState.error;
        break;
      case REQUEST_MY_LIBRARIES_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.my_libraries =  action.result.data.map(lib => {return { id: lib.library.id, name: lib.library.name, status: lib.status } } );
        break;
      case REQUEST_GET_LIBRARIES_LIST_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.librariesList = action.result.map(item => { return {value: item.id, label: item.name} } );
        break;
      case REQUEST_ACCESS_TO_LIBRARIES:
        draft.loading = true;
        draft.error = initialState.error;
        break;
      case REQUEST_ACCESS_TO_LIBRARIES_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        // draft.librariesList = action.result.map(item => { return {value: item.id, label: item.name} } );
        break;
      case STOP_LOADING:
        draft.loading = false;
        break;
      case REQUEST_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default PatronReducer;
