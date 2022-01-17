import { call, put, takeLatest } from 'redux-saga/effects';
import { 
          REQUEST_GET_INSTITUTIONS_TYPE_COUNTRY_OPTIONLIST,
          REQUEST_INSTITUTIONSTYPES_OPTIONLIST,
          REQUEST_GET_COUNTRIES_OPTIONLIST,
          REQUEST_LIBRARYSUBJECT_OPTIONLIST,
          REQUEST_POST_PUBLIC_LIBRARY,
          REQUEST_SEARCH_PLACES_BY_TEXT,
          REQUEST_GET_LIBRARY_PROJECTS_OPTIONLIST
} from './constants';
import {
  requestError,
  stopLoading,
  requestSuccess,
  requestGetProjectsOptionListSuccess,
  requestGetInstitutionTypeOptionListSuccess,
  requestGetInstitutionsByTypeByCountryOptionListSuccess,
  requestGetCountriesOptionListSuccess,
  requestLibrarySubjectOptionListSuccess,
  requestSearchPlacesByText,
  requestSearchPlacesByTextSuccess,
  requestSearchPlacesByTextFail,  
  requestGetLibraryListNearToSuccess,
  requestGetlibraryProjectsOptionListSuccess,
  
} from './actions';
import { toast } from "react-toastify";
import { push } from 'connected-react-router';
import {getInstitutionTypesOptionList,  getInstitutionsByTypeByCountryOptionList, getCountriesOptionsList, getProjectsOptionList, getlibraryProjectsOptionList,
        getLibrariesSubjects,createPublicLibrary} from 'utils/api'
import { getPlacesByText } from 'utils/apiExternal';   


export function* requestLibrarySubjectOptionListSaga(action) {
    const options = {
      method: 'get',
      query: action.request ? action.request : ""
    }
    try {
      const request = yield call(getLibrariesSubjects, options);
      yield put(requestLibrarySubjectOptionListSuccess(request));
    } catch(e) {
      yield put(requestError(e.message));
    }
  }

  export function* requestGetCountriesOptionListSaga(action) {
    const options = {
      method: 'get',
      query: action.request
    }
    try {
      
      const request = yield call(getCountriesOptionsList, options);
      yield put(requestGetCountriesOptionListSuccess(request));
    } catch(e) {
      yield put(requestError(e.message));
    }
  }
  
  export function* requestPostPublicLibrarySaga(action) {
    const options = {
      method: 'post',
      body: {...action.request }
      
    };
    try {
      
      const request = yield call(createPublicLibrary, options);
      // yield call(requestGetLibrariesListSaga);
      yield put(push("/"));
      yield call(() => toast.success(action.message))
    } catch(e) {
      yield put(requestError(e.message));
    }
  }

  export function* requestProjectsOptionListSaga(action) {
    const options = {
      method: 'get',
      query: action.request ? action.request : ""
    }
    try {
      const request = yield call(getProjectsOptionList, options);
      yield put(requestGetProjectsOptionListSuccess(request));
    } catch(e) {
      yield put(requestError(e.message));
    }
  }

  export function* requestGetInstitutionsByTypeByCountryOptionListSaga(action) {
    const options = {
       method: 'get',
       query: action.request ? action.request : "",
       countryid: action.countryid,
       institutiontypeid: action.institutiontypeid
     }
     try {
       const request = yield call(getInstitutionsByTypeByCountryOptionList, options);
       yield put(requestGetInstitutionsByTypeByCountryOptionListSuccess(request));
     } catch(e) {
       yield put(requestError(e.message));
     }
   }


export function* requestInstitutionTypeOptionListSaga(action) {
    const options = {
      method: 'get',
      query: action.request ? action.request : ""
    }
    try {
      const request = yield call(getInstitutionTypesOptionList, options);
      yield put(requestGetInstitutionTypeOptionListSuccess(request));
    } catch(e) {
      yield put(requestError(e.message));
    }
  }


export function* findPlacesByText(action) {
    console.log("findPlacesByText:", action);
    const options = {
      method: 'get',    
      search: action.search,    
    }
    try {
      const result = yield call(getPlacesByText, options);
      yield put(requestSearchPlacesByTextSuccess(result));          
    } catch(e) {    
      yield put(requestSearchPlacesByTextFail(e.message));
    }
  }

  export function*  requestGetlibraryProjectsOptionList(action) {
    const options = {
      method: 'get',
      query: action.request ? action.request : ""
    }
    try {
      const request = yield call(getlibraryProjectsOptionList, options);
  
      yield put(requestGetlibraryProjectsOptionListSuccess(request));
    } catch(e) {
      
      
      yield put(requestError(e.message));
    }
  }
  
  
/**
 * Library Registration saga 
 */
export default function* libraryregSaga() {
  yield takeLatest(REQUEST_LIBRARYSUBJECT_OPTIONLIST, requestLibrarySubjectOptionListSaga);
  yield takeLatest(REQUEST_GET_COUNTRIES_OPTIONLIST, requestGetCountriesOptionListSaga);
  yield takeLatest(REQUEST_POST_PUBLIC_LIBRARY, requestPostPublicLibrarySaga);
  yield takeLatest(REQUEST_GET_INSTITUTIONS_TYPE_COUNTRY_OPTIONLIST, requestGetInstitutionsByTypeByCountryOptionListSaga);
  yield takeLatest(REQUEST_INSTITUTIONSTYPES_OPTIONLIST, requestInstitutionTypeOptionListSaga);
  yield takeLatest(REQUEST_SEARCH_PLACES_BY_TEXT,findPlacesByText);
  yield takeLatest(REQUEST_GET_LIBRARY_PROJECTS_OPTIONLIST, requestGetlibraryProjectsOptionList)
}
