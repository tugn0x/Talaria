import {DEFAULT_ACTION, 
    REQUEST_POST_PUBLIC_LIBRARY,
    REQUEST_GET_PROJECTS_OPTIONLIST, REQUEST_GET_PROJECTS_OPTIONLIST_SUCCESS,
    REQUEST_GET_INSTITUTIONS_TYPE_COUNTRY_OPTIONLIST, REQUEST_GET_INSTITUTIONS_TYPE_COUNTRY_OPTIONLIST_SUCCESS,
    REQUEST_INSTITUTIONSTYPES_OPTIONLIST, REQUEST_INSTITUTIONSTYPES_OPTIONLIST_SUCCESS,
    REQUEST_GET_LIBRARY_PROJECTS_OPTIONLIST, REQUEST_GET_LIBRARY_PROJECTS_OPTIONLIST_SUCCESS,

    REQUEST_GET_LIBRARY_IDENTIFIER_TYPES_OPTIONLIST, REQUEST_GET_LIBRARY_IDENTIFIER_TYPES_OPTIONLIST_SUCCESS,
    REQUEST_SEARCH_PLACES_BY_TEXT, REQUEST_SEARCH_PLACES_BY_TEXT_SUCCESS, REQUEST_SEARCH_PLACES_BY_TEXT_FAIL,
    REQUEST_ERROR
 } from "./constants";

 import {   REQUEST_GET_COUNTRIES_OPTIONLIST, REQUEST_GET_COUNTRIES_OPTIONLIST_SUCCESS,
  REQUEST_LIBRARYSUBJECT_OPTIONLIST, REQUEST_LIBRARYSUBJECT_OPTIONLIST_SUCCESS} from '../Library/constants';
 
 export function defaultAction() {
   return {
     type: DEFAULT_ACTION,
   };
 }

//search for a place in the map for the library registration
export function requestSearchPlacesByText(search) {
  return {
    type: REQUEST_SEARCH_PLACES_BY_TEXT,
    search
  };
}

export function requestSearchPlacesByTextSuccess(result) {
  return {
    
    type: REQUEST_SEARCH_PLACES_BY_TEXT_SUCCESS,
    result
  };
}

export function requestSearchPlacesByTextFail(error) {
  return {
    type: REQUEST_SEARCH_PLACES_BY_TEXT_FAIL,
    error
  };
}

export function requestGetCountriesOptionList(request) {
  return {
      type: REQUEST_GET_COUNTRIES_OPTIONLIST,
      request
    };
  }
  
  export function requestGetCountriesOptionListSuccess(result) {
    return {
      type: REQUEST_GET_COUNTRIES_OPTIONLIST_SUCCESS,
      result
    };
  }

  export function requestLibrarySubjectOptionList(request) {
    return {
      type: REQUEST_LIBRARYSUBJECT_OPTIONLIST,
      request
    };
  }
  
  export function requestLibrarySubjectOptionListSuccess(result) {
    return {
      type: REQUEST_LIBRARYSUBJECT_OPTIONLIST_SUCCESS,
      result
    };
  }

  export function requestPostPublicLibrary(request, message) {
    return {
      type: REQUEST_POST_PUBLIC_LIBRARY,
      request,
      message
    };
  }

  export function requestGetProjectsOptionList(request) {
    return {
      type: REQUEST_GET_PROJECTS_OPTIONLIST,
      request
    };
  }
  
  export function requestGetProjectsOptionListSuccess(result) {
    return {
      type: REQUEST_GET_PROJECTS_OPTIONLIST_SUCCESS,
      result
    };
  }

  export function requestGetInstitutionsByTypeByCountryOptionList(request, countryid, institutiontypeid) {
    return {
      type: REQUEST_GET_INSTITUTIONS_TYPE_COUNTRY_OPTIONLIST,
      request,
      countryid,
      institutiontypeid
    };
  }
  
  export function requestGetInstitutionsByTypeByCountryOptionListSuccess(result) {
    return {
      type: REQUEST_GET_INSTITUTIONS_TYPE_COUNTRY_OPTIONLIST_SUCCESS,
      result
    };
  }

  export function requestGetInstitutionTypeOptionList(request) {
    return {
      type: REQUEST_INSTITUTIONSTYPES_OPTIONLIST,
      request
    };
  }
  
  export function requestGetInstitutionTypeOptionListSuccess(result) {
    return {
      type: REQUEST_INSTITUTIONSTYPES_OPTIONLIST_SUCCESS,
      result
    };
  }

export function requestGetlibraryProjectsOptionList(request)
{
  return {
      type: REQUEST_GET_LIBRARY_PROJECTS_OPTIONLIST,
      request
  };
}

export function requestGetlibraryProjectsOptionListSuccess(result)
{
return {
      type: REQUEST_GET_LIBRARY_PROJECTS_OPTIONLIST_SUCCESS,
      result
  };
}

export function requestGetlibraryidentifierTypesOptionList(request)
{
  return {
      type: REQUEST_GET_LIBRARY_IDENTIFIER_TYPES_OPTIONLIST,
      request
  };
}

export function requestGetlibraryidentifierTypesOptionListSuccess(result)
{
return {
      type: REQUEST_GET_LIBRARY_IDENTIFIER_TYPES_OPTIONLIST_SUCCESS,
      result
  };
}


export function requestSuccess() {
  return {
    type: REQUEST_SUCCESS,
  };
}

export function requestError(errorMessage) {
  return {
    
    type: REQUEST_ERROR,
    error: errorMessage
  };
}

export function stopLoading() {
  return {
    type: STOP_LOADING,
    // request: request
  };
}