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
  REQUEST_POST_USER,
  REQUEST_GET_ROLES, REQUEST_GET_ROLES_SUCCESS,
  REQUEST_GET_PROJECT, REQUEST_GET_PROJECT_SUCCESS,
  REQUEST_GET_PROJECTS_LIST, REQUEST_GET_PROJECTS_LIST_SUCCESS,
  REQUEST_UPDATE_PROJECT, REQUEST_POST_PROJECT,
  REQUEST_GET_INSTITUTION_TYPE_LIST_SUCCESS,
  REQUEST_GET_INSTITUTION_TYPE_LIST,
  REQUEST_GET_INSTITUTIONS_LIST,
  REQUEST_GET_INSTITUTIONS_LIST_SUCCESS,
  REQUEST_GET_INSTITUTION, REQUEST_GET_INSTITUTION_SUCCESS,
  REQUEST_INSTITUTIONSTYPES_OPTIONLIST, REQUEST_INSTITUTIONSTYPES_OPTIONLIST_SUCCESS,
  REQUEST_GET_COUNTRIES_OPTIONLIST, REQUEST_GET_COUNTRIES_OPTIONLIST_SUCCESS,
  UPDATE_INSTITUTION
} from "./constants";

export const initialState = {
  loading: false,
  usersList: {
    pagination: {},
    data: [],
  },
  user: [],
  error: null,
  librariesList: {
    pagination: {},
    data: [],
  },
  library: [],
  institutionTypes: {
    pagination: {},
    data: [],
  },
  project: [],
  projectsList: [],
  institutionsList: {
    pagination: {},
    data: [],
  },
  institution: [],
  institutionsOptionList: [],
  countriesOptionList: [],
  roles: [],
  resources: [],
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
        draft.usersList.data = action.result.data
        draft.usersList.pagination = action.result.meta.pagination
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
        draft.user = {
          ...action.result.data,
          roles: action.result.data.roles.data,
          resources: action.result.data.resources.data,
        }
        break;
      case REQUEST_GET_ROLES:
        draft.loading = true;
        draft.error = action.error;
        break;
      case REQUEST_GET_ROLES_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.roles = action.result.data.roles;
        draft.resources = action.result.data.resources;
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
        draft.library = action.result.data
        draft.library.granted_permissions = action.result.data.granted_permissions.data
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
        draft.librariesList.data = action.result.data
        draft.librariesList.pagination = action.result.meta.pagination
        break;
      case REQUEST_GET_INSTITUTION:
        draft.loading = true;
        draft.error = action.error;
        break;
      case REQUEST_GET_INSTITUTION_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.institution = action.result.data
        break;
      case UPDATE_INSTITUTION:
        draft.loading = true;
        draft.error = action.error;
        break;
      case REQUEST_GET_INSTITUTIONS_LIST:
        draft.loading = true;
        draft.error = action.error;
        break;
      case REQUEST_GET_INSTITUTIONS_LIST_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.institutionsList.data = action.result.data
        draft.institutionsList.pagination = action.result.meta.pagination
        break;
      case REQUEST_INSTITUTIONSTYPES_OPTIONLIST:
        draft.error = action.error;
        break;
      case REQUEST_INSTITUTIONSTYPES_OPTIONLIST_SUCCESS:
        draft.error = initialState.error;
        draft.institutionsOptionList = action.result.map(item => { return {value: item.id, label: item.name} } );
        break;

      case REQUEST_GET_COUNTRIES_OPTIONLIST:
        draft.error = action.error;
        break;
      case REQUEST_GET_COUNTRIES_OPTIONLIST_SUCCESS:
        draft.error = initialState.error;
        draft.countriesOptionList = action.result.map(item => { return {value: item.id, label: item.name} } );
        break;

      case REQUEST_GET_INSTITUTION_TYPE_LIST:
        draft.loading = true;
        draft.error = action.error;
        break;
      case REQUEST_GET_INSTITUTION_TYPE_LIST_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.institutionTypes.data = action.result.data;
        draft.institutionTypes.pagination = action.result.meta.pagination;
        break;
      case REQUEST_POST_PROJECT:
        draft.loading = true;
        draft.error = action.error;
        break;
      case REQUEST_GET_PROJECT:
        draft.loading = true;
        draft.error = action.error;
        break;
      case REQUEST_GET_PROJECT_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.project = action.result
        break;
      case REQUEST_UPDATE_PROJECT:
        draft.loading = true;
        draft.error = action.error;
        break;
      case REQUEST_GET_PROJECTS_LIST:
        draft.loading = true;
        draft.error = action.error;
        break;
      case REQUEST_GET_PROJECTS_LIST_SUCCESS:
        draft.loading = false;
        draft.error = initialState.error;
        draft.projectsList = action.result.data
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
