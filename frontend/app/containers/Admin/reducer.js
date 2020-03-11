/*
 *
 * Admin reducer
 *
 */
import produce from 'immer';
import {DEFAULT_ACTION, REQUEST_SUCCESS,
  REQUEST_ERROR, STOP_LOADING, REQUEST_USERS_LIST, REQUEST_USERS_LIST_SUCCESS,
  REQUEST_UPDATE_USER, REQUEST_UPDATE_USER_SUCCESS, 
  REQUEST_USER, REQUEST_USER_SUCCESS,
  REQUEST_GET_LIBRARY, REQUEST_GET_LIBRARY_SUCCESS,
  REQUEST_GET_LIBRARIES_LIST, REQUEST_GET_LIBRARIES_LIST_SUCCESS,
  REQUEST_UPDATE_LIBRARY, REQUEST_POST_LIBRARY,
  REQUEST_POST_USER} from "./constants";

export const initialState = {
  loading: false,
  usersList: [],
  user: [],
  error: null,
  pagination: [],
  librariesList: [],
  library: []
};

/* eslint-disable default-case, no-param-reassign */
const AdminReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case REQUEST_USERS_LIST:
        draft.loading = true;
        draft.error = action.error;
        break;
      case REQUEST_USERS_LIST_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.usersList = action.result.data
        draft.pagination = Object.keys(action.result)
          .filter(key => !['data'].includes(key))
          .reduce((obj, key) => {
            obj[key] = action.result[key];
            return obj;
          }, {});
        break;
      case REQUEST_UPDATE_USER:
        draft.loading = true;
        draft.error = action.error;
        break;
      case REQUEST_POST_USER:
        draft.loading = true;
        draft.error = action.error;
        break;
      case REQUEST_USER:
        draft.loading = true;
        draft.error = action.error;
        break;
      case REQUEST_USER_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.user = action.result
        break;
      case REQUEST_POST_LIBRARY:
        draft.loading = true;
        draft.error = action.error;
        break;
      case REQUEST_GET_LIBRARY:
        draft.loading = true;
        draft.error = action.error;
        break;
      case REQUEST_GET_LIBRARY_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.library = action.result
        break;
      case REQUEST_UPDATE_LIBRARY:
        draft.loading = true;
        draft.error = action.error;
        break;
      case REQUEST_GET_LIBRARIES_LIST:
        draft.loading = true;
        draft.error = action.error;
        break;
      case REQUEST_GET_LIBRARIES_LIST_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.librariesList = action.result.data
        /* draft.pagination = Object.keys(action.result)
          .filter(key => !['data'].includes(key))
          .reduce((obj, key) => {
            obj[key] = action.result[key];
            return obj;
          }, {}); */
        break;
      case REQUEST_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
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

export default AdminReducer;
