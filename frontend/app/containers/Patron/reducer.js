/*
 *
 * Patron reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, REQUEST_MY_LIBRARIES, REQUEST_MY_LIBRARIES_SUCCESS, STOP_LOADING, REQUEST_ERROR } from './constants';

export const initialState = {
  loading: false,
  my_libraries: [],
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const PatronReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case REQUEST_MY_LIBRARIES:
        draft.loading = true;
        draft.error = initialState.error;
        break;
      case REQUEST_MY_LIBRARIES_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.my_libraries = action.result;
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
