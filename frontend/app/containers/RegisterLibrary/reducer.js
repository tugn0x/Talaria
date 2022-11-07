/*
 *
 * library registration reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  REQUEST_GET_COUNTRIES_OPTIONLIST, REQUEST_GET_COUNTRIES_OPTIONLIST_SUCCESS,
  REQUEST_LIBRARYSUBJECT_OPTIONLIST, REQUEST_LIBRARYSUBJECT_OPTIONLIST_SUCCESS, 
  REQUEST_GET_INSTITUTIONS_TYPE_COUNTRY_OPTIONLIST, REQUEST_GET_INSTITUTIONS_TYPE_COUNTRY_OPTIONLIST_SUCCESS,
  REQUEST_INSTITUTIONSTYPES_OPTIONLIST, REQUEST_INSTITUTIONSTYPES_OPTIONLIST_SUCCESS,
  REQUEST_GET_LIBRARY_PROJECTS_OPTIONLIST, 
  REQUEST_GET_LIBRARY_PROJECTS_OPTIONLIST_SUCCESS,
  REQUEST_GET_LIBRARY_IDENTIFIER_TYPES_OPTIONLIST,
  REQUEST_GET_LIBRARY_IDENTIFIER_TYPES_OPTIONLIST_SUCCESS,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  STOP_LOADING,
  REQUEST_SEARCH_PLACES_BY_TEXT,REQUEST_SEARCH_PLACES_BY_TEXT_SUCCESS,REQUEST_SEARCH_PLACES_BY_TEXT_FAIL
  
} from "./constants";

export const initialState = {
  loading: false,
  error: null,
  institutionsByTypeCountryOptionList: [],
  countriesOptionList: [],
  libraryProjectsOptionList: [],
  identifierTypesOptionList: [],
  librarySubjectOptionList: [],
  places: {},
};

/* eslint-disable default-case, no-param-reassign */
const libregReducer = (state = initialState, action) =>
  produce(state, (draft) => {
switch (action.type) {
case DEFAULT_ACTION:
  break;
case REQUEST_GET_COUNTRIES_OPTIONLIST:
  draft.error = action.error;
  break;
case REQUEST_GET_COUNTRIES_OPTIONLIST_SUCCESS:
  draft.error = initialState.error;
  draft.countriesOptionList = action.result.sort((a, b) => { return (a.id > b.id) ? 1 : -1 }).map(item => { return {value: item.id, label: item.name} } );
  break;
case REQUEST_LIBRARYSUBJECT_OPTIONLIST:
  draft.error = action.error;
  break;
case REQUEST_LIBRARYSUBJECT_OPTIONLIST_SUCCESS:
  draft.error = initialState.error;
  draft.librarySubjectOptionList = action.result.sort((a, b) => { return (a.id > b.id) ? 1 : -1 }).map(item => { return {value: item.id, label: item.name} } );
  break;
case REQUEST_GET_INSTITUTIONS_TYPE_COUNTRY_OPTIONLIST:
  draft.error = action.error;
  break;
case REQUEST_GET_INSTITUTIONS_TYPE_COUNTRY_OPTIONLIST_SUCCESS:
  draft.error = initialState.error;
  draft.institutionsByTypeCountryOptionList = action.result.sort((a, b) => { return (a.id > b.id) ? 1 : -1 }).map(item => { return {value: item.id, label: item.name} } );
  draft.institutionsByTypeCountryOptionList.push({"value":0,"label":"Institution not present"})
  break;


case REQUEST_INSTITUTIONSTYPES_OPTIONLIST:
  draft.error = action.error;
  break;
case REQUEST_INSTITUTIONSTYPES_OPTIONLIST_SUCCESS:
  draft.error = initialState.error;
  draft.institutionsTypesOptionList = action.result.sort((a, b) => { return (a.id > b.id) ? 1 : -1 }).map(item => { return {value: item.id, label: item.name} } );
  break;


case REQUEST_GET_LIBRARY_PROJECTS_OPTIONLIST:
  draft.loading = true;
  draft.error = action.error;
  break;
case REQUEST_GET_LIBRARY_PROJECTS_OPTIONLIST_SUCCESS:
  draft.loading = false;
  draft.error = initialState.error;
  draft.libraryProjectsOptionList = action.result.sort((a, b) => { return (a.id > b.id) ? 1 : -1 }).map(item => { return {value: item.id, label: item.name} } );
  break;


  case REQUEST_GET_LIBRARY_IDENTIFIER_TYPES_OPTIONLIST:
    draft.loading = true;
    draft.error = action.error;
    break;
  case REQUEST_GET_LIBRARY_IDENTIFIER_TYPES_OPTIONLIST_SUCCESS:
    draft.loading = false;
    draft.error = initialState.error;
    draft.identifierTypesOptionList = action.result.sort((a, b) => { return (a.id > b.id) ? 1 : -1 }).map(item => { return {value: item.id, label: item.name} } );
  break;

  case REQUEST_SEARCH_PLACES_BY_TEXT:
    draft.loading=true;
    break;
  case REQUEST_SEARCH_PLACES_BY_TEXT_SUCCESS:
    draft.loading=false;
    draft.places=action.result
    break;  

  case REQUEST_SEARCH_PLACES_BY_TEXT_FAIL:
    draft.loading = false;
    draft.error = initialState.error;          
    draft.places={}
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

export default libregReducer;