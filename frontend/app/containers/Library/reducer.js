/*
 *
 * Library reducer
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
  REQUEST_POST_USER,
  REQUEST_BORROWINGS_LIST,REQUEST_BORROWINGS_LIST_SUCCESS,REQUEST_LENDINGS_LIST,REQUEST_LENDINGS_LIST_SUCCESS,
  REQUEST_GET_LIBRARY_TAGS_OPTIONLIST,REQUEST_GET_LIBRARY_TAGS_OPTIONLIST_SUCCESS, REQUEST_POST_NEW_BORROWING,
  REQUEST_GET_BORROWING,REQUEST_GET_BORROWING_SUCCESS, REQUEST_UPDATE_BORROWING, REQUEST_UPDATE_BORROWING_SUCCESS,
  REQUEST_FIND_UPDATE_BORROWING_OA,REQUEST_FIND_UPDATE_BORROWING_OA_FAIL,REQUEST_FIND_UPDATE_BORROWING_OA_SUCCESS,
  REQUEST_CHANGE_STATUS_BORROWING, 
  REQUEST_ACCEPT_ALLLENDER,
  REQUEST_GET_ISSN_ISBN,
  REQUEST_GET_ISSN_ISBN_SUCCESS,
  REQUEST_GET_ISSN_ISBN_FAIL  
} from "./constants";

export const initialState = {
  loading: false,
  library: {},
  departmentOptionList: [],
  titleOptionList: [],
  usersList: {
    data: [],
    pagination: {}
  },
  borrowingsList: {
    data: [],
    pagination: {},
    oaloading: [],
  },
  borrowing: {},
  lending: {},
  tagsOptionList:[],
  lendingsList: {
    data: [],
    pagination: {}
  },
  findISSNISBNresults: {
    loading:false,
    data: [],    
  },
  libraryOptionList: {
    loading: false,
    data:[],
    pagination: {}
  },
  error: null,
  user: {}
};

/* eslint-disable default-case, no-param-reassign */
const libraryReducer = (state = initialState, action) =>
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
        draft.usersList.data = action.result.data.map(data => {
          return {
              created_at: data.created_at,
              library_name: data.library.data.name,
              user_name: data.user.data.full_name,
              id: data.id,
              user_id: data.user.data.id,
              status: data.status,
              department_id: data.department_id,
              department_name: data.department ?data.department.data.name:'',
              title_id: data.title_id,
              title_name: data.title? data.title.data.name:'',
              user_referent: data.user_referent,
              user_mat: data.user_mat,
              user_service_phone: data.user_service_phone,
              user_service_email: data.user_service_email,
            }
        })
        draft.usersList.pagination = action.result.meta.pagination
        break;
      case REQUEST_UPDATE_USER:
        draft.loading = true;
        draft.error = action.error;
        break;
      case REQUEST_UPDATE_USER_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.user = action.result.data
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
        draft.error = action.error;
        draft.user = action.result.data
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
        draft.library = action.result.data;
        draft.library.granted_permissions = action.result.data.granted_permissions ? action.result.data.granted_permissions.data : []
        draft.departmentOptionList = action.result.data.departments? action.result.data.departments.data.map(dep => {
            return {value: dep.id, label: dep.name}
        }):[]
        draft.titleOptionList = action.result.data.titles? action.result.data.titles.data.map(tit => {
          return {value: tit.id, label: tit.name}
        }):[]
        break;
      case REQUEST_UPDATE_LIBRARY:
        draft.loading = true;
        draft.error = action.error;
        break;
       case REQUEST_GET_LIBRARIES_LIST:
        draft.libraryOptionList.loading=true
        draft.error = action.error;
        break;
      case REQUEST_GET_LIBRARIES_LIST_SUCCESS:
        draft.libraryOptionList.loading = false;
        draft.error = initialState.error;
        draft.libraryOptionList = action.result
        break;

        case REQUEST_GET_LIBRARY_TAGS_OPTIONLIST:
          draft.loading = true;
          draft.error = action.error;
          break;
        case REQUEST_GET_LIBRARY_TAGS_OPTIONLIST_SUCCESS:
            draft.loading = false;
            draft.error = initialState.error;
            draft.tagsOptionList = action.result.map(item => { return {value: item.id, label: item.name} } );
            break;  

      case REQUEST_BORROWINGS_LIST:
        draft.loading = true;
        break;
      case REQUEST_BORROWINGS_LIST_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.borrowingsList.data = action.result.data;
        draft.borrowingsList.pagination = action.result.meta.pagination
        break;

      case REQUEST_POST_NEW_BORROWING:
        //draft.loading=true;
        break;   
        
      case REQUEST_GET_BORROWING:
          draft.loading = true;
          draft.borrowing={};
          break;  
      case REQUEST_GET_BORROWING_SUCCESS:
            draft.loading = false;
            draft.error = initialState.error;            
            draft.borrowing = action.result.data;
            break; 

      case REQUEST_UPDATE_BORROWING:
        draft.loading = true;
        draft.borrowing={};
        break;              
        
      case REQUEST_UPDATE_BORROWING_SUCCESS: 
            draft.loading = false;
            draft.error = initialState.error;            
            draft.borrowing = action.result.data;
      break;    
      
      case REQUEST_FIND_UPDATE_BORROWING_OA:        
        draft.borrowingsList.oaloading.push(action.id)
        break;    
      case REQUEST_FIND_UPDATE_BORROWING_OA_SUCCESS:
          draft.borrowingsList.oaloading = action.result?draft.borrowingsList.oaloading.filter(function(e) { return e !== action.result }):null  
          break;      
      case REQUEST_FIND_UPDATE_BORROWING_OA_FAIL:
        draft.borrowingsList.oaloading = action.result?draft.borrowingsList.oaloading.filter(function(e) { return e !== action.result }):null
        break;          
      case REQUEST_LENDINGS_LIST:
        draft.loading = true;
        break;
      case REQUEST_LENDINGS_LIST_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.lendingsList.data = action.result.data;
        draft.lendingsList.pagination = action.result.meta.pagination
        break;  

      case REQUEST_GET_ISSN_ISBN:
        draft.error = initialState.error;    
        draft.findISSNISBNresults.loading=true;  
        draft.findISSNISBNresults.data=[]
        break;

      case REQUEST_GET_ISSN_ISBN_SUCCESS:
          draft.findISSNISBNresults.loading=false;  
          draft.error = initialState.error;       
          draft.findISSNISBNresults.data=action.result.data
          break;  

      case REQUEST_GET_ISSN_ISBN_FAIL:
        draft.findISSNISBNresults.loading=false;  
        draft.error=action.result
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

export default libraryReducer;
