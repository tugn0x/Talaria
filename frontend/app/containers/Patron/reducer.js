/*
 *
 * Patron reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, REQUEST_MY_LIBRARIES, REQUEST_MY_LIBRARIES_SUCCESS,
  REQUEST_GET_LIBRARY_OPTIONLIST, REQUEST_GET_LIBRARY_OPTIONLIST_SUCCESS,
  REQUEST_ACCESS_TO_LIBRARIES,
  REQUEST_UPDATE_ACCESS_TO_LIBRARIES,
  REQUEST_REFERENCES_LIST, REQUEST_REFERENCES_LIST_SUCCESS,
  REQUEST_REQUESTS_LIST, REQUEST_REQUESTS_LIST_SUCCESS,
  REQUEST_POST_REFERENCES, REQUEST_SUCCESS,
  REQUEST_UPDATE_REFERENCES, REQUEST_GET_REFERENCE, REQUEST_GET_REFERENCE_SUCCESS,
  REQUEST_GET_MY_LIBRARY, REQUEST_GET_MY_LIBRARY_SUCCESS,
  REQUEST_GET_LABELS_OPTIONLIST,REQUEST_GET_LABELS_OPTIONLIST_SUCCESS,
  REQUEST_GET_GROUPS_OPTIONLIST,REQUEST_GET_GROUPS_OPTIONLIST_SUCCESS,
  REQUEST_UPDATE_LABEL,
  REQUEST_UPDATE_GROUP,
  REQUEST_REMOVE_LABEL,
  REQUEST_REMOVE_GROUP,
  //REQUEST_REMOVE_REFERENCE_LABEL,REQUEST_REMOVE_REFERENCE_GROUP,
  STOP_LOADING, REQUEST_ERROR } from './constants';

export const initialState = {
  loading: false,
  my_libraries: {
    data: [],
    pagination: {}
  },
  library: {},
  error: null,
  libraryOptionList: [],
  labelsOptionList:[],
  groupsOptionList:[],
  referencesList: {
    data: [],
    pagination: [],
  },
  requestsList: {
    data: [],
    pagination: [],
  },
  reference: {}
};

/* eslint-disable default-case, no-param-reassign */
const PatronReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case REQUEST_GET_REFERENCE:
        draft.loading = true;
        break;
      case REQUEST_GET_REFERENCE_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.reference = action.result.data;
        break;
      case REQUEST_UPDATE_REFERENCES:
        draft.loading = true;
      break;
      case REQUEST_POST_REFERENCES:
        draft.loading = true;
        break;
      case REQUEST_REFERENCES_LIST:
        draft.loading = true;
        break;
      case REQUEST_REFERENCES_LIST_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.referencesList.data = action.result.data;
        draft.referencesList.pagination = action.result.meta.pagination
        break;
      case REQUEST_REQUESTS_LIST:
        draft.loading = true;
        break;
      case REQUEST_REQUESTS_LIST_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.requestsList.data = action.result.data;
        draft.requestsList.pagination = action.result.meta.pagination
        break;  
      case REQUEST_GET_MY_LIBRARY:
        draft.loading = true;
        break;
      case REQUEST_GET_MY_LIBRARY_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.library = action.result.data;
        break;
      case REQUEST_MY_LIBRARIES:
        draft.loading = true;
        draft.error = action.error;
        break;
      case REQUEST_GET_LIBRARY_OPTIONLIST:
        draft.loading = true;
        draft.error = action.error;
        break;
      case REQUEST_GET_LABELS_OPTIONLIST:
        draft.loading = true;
        draft.error = action.error;
        break;
      case REQUEST_GET_GROUPS_OPTIONLIST:
        draft.loading = true;
        draft.error = action.error;
        break;    
      case REQUEST_MY_LIBRARIES_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.my_libraries.data =  action.result.data.map(lib => {
          return { 
            id: lib.id, 
            name: lib.library.data.name,
            library_id: lib.library_id,
            status: lib.status, 
            department_id: lib.department_id,
            department_name: lib.department? lib.department.data.name:'',
            title_id: lib.title_id,
            title_name: lib.title? lib.title.data.name:'',
            user_referent: lib.user_referent,
            user_mat: lib.user_mat,
            user_service_phone: lib.user_service_phone,
            user_service_email: lib.user_service_email,
            preferred: lib.preferred,
            label: lib.label,
            created_at: lib.library.data.created_at  
          } 
        });
        draft.my_libraries.pagination =  action.result.meta.pagination
        break;
      case REQUEST_GET_LIBRARY_OPTIONLIST_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.libraryOptionList = action.result.map(item => { return {value: item.id, label: item.name} } );
        break;
      case REQUEST_GET_LABELS_OPTIONLIST_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.labelsOptionList = action.result.map(item => { return {value: item.id, label: item.name} } );
        break;
      case REQUEST_GET_GROUPS_OPTIONLIST_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.groupsOptionList = action.result.map(item => { return {value: item.id, label: item.name} } );
        break;    
      /*case REQUEST_REMOVE_REFERENCE_LABEL:
        draft.loading = false;
        draft.error = action.error;
        break;
      case REQUEST_REMOVE_REFERENCE_GROUP:
        draft.loading = false;
        draft.error = action.error;
        break;*/
      case REQUEST_ACCESS_TO_LIBRARIES:
        draft.loading = true;
        draft.error = action.error;
        break;
      case REQUEST_UPDATE_ACCESS_TO_LIBRARIES:
          draft.loading = false;
          break;  
      case REQUEST_UPDATE_LABEL:
        draft.loading = true;
        break;
      case REQUEST_REMOVE_LABEL:
        draft.loading = true;
        break;
      case REQUEST_UPDATE_GROUP:
        draft.loading = true;
        break;
      case REQUEST_REMOVE_GROUP:
        draft.loading = true;
        break;
      /* case REQUEST_ACCESS_TO_LIBRARIES_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        // draft.libraryOptionList = action.result.map(item => { return {value: item.id, label: item.name} } );
        break; */
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

export default PatronReducer;
