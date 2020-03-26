import request from "./request";

const BASE_URL = process.env.API_URL;

const apiTokenSingleton = () => {
  let token = null;
  return {
    get: () => {
      return token;
    },
    set: (inputToken) => {
      token = inputToken
    }
  }
};

const apiToken = apiTokenSingleton();

const defaultOption = {
    headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      }),
};

const getOption = (option) => {
    if(apiToken.get()) {
      if(defaultOption.headers.has("Authorization")) {
        defaultOption.headers.set('Authorization', `Bearer ${apiToken.get()}`);
      } else {
        defaultOption.headers.append('Authorization', `Bearer ${apiToken.get()}`);
      }
    }
    option.headers = defaultOption.headers;
    if(option.body) {
        option.body = JSON.stringify(option.body)
    }
    return option
}

export function setToken(token) {
  apiToken.set(token);
}

export const oauthOption = {
    grant_type: process.env.GRANT_TYPE,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
}

export const oauthOptionRefreshToken = {
  grant_type: "refresh_token",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
}

export const getAddress = (coordinate) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coordinate.lat}&lon=${coordinate.lon}`;
  return request(url, {method: 'get'});
}

export const login = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/oauth/token/`, options)
};

export const loginRefresh = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/oauth/token/`, options)
};

export const signup = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/auth/register/`, options)
};

export const submit = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/reports/`, options)
};

export const asyncSubmit = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/reports/async/`, options)
};

export const changePassword = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/auth/change-password/`, options)
};

export const forgotPassword = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/auth/forgot-password/`, options)
}
export const resetPassword = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/auth/reset-password/`, options)
}

export const updateProfile = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/auth/me`, options)
};

export const deleteProfile = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/auth/me`, options)
};

export const getProfile = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/auth/me`, options)
};

export const getPermissions = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/auth/permissions`, options)
};

export const verifySms = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/oauth/verify/`, options)
};

export const newToken = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/oauth/resend-code/`, options)
};

export const socialOauth = (provider, options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/auth/social/${provider}/signup`, options)
};

//--------- PATRON -------------//
// MyLibrary //
export const getMyLibraries = (options) => {
  const page = options.page;
  const query = options.query;
  options = getOption(options);
  //return request(`${BASE_URL}/api/v1/libraries/my`, options)
  return request(`${BASE_URL}/api/v1/libraries/my?page=${page}&q=${query}`, options)
};

export const getLibraryList = (options) => {
  options = getOption(options);
  const query = options.query ? options.query : "";
  return request(`${BASE_URL}/api/v1/libraries/option-items?label=name&q=${query}`, options)
};

export const getMyLibrary = (options) => {
  const library_id = options.id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries/${library_id}`, options)
};

export const requestAccessToLibrary = (options) => {
  const library_id = options.body.library_id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/library-users`, options)
};

// Reference //
export const getReferencesList = (options) => {
  const page = options.page;
  const query = options.query;
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/references/my?page=${page}&q=${query}`, options)
};

export const createReference = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/references`, options)
};

export const getReference = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/references/${options.id}`, options)
};

export const updateReference = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/references/${options.id}`, options)
};

// ---------- LIBRARY ---------- //
export const getLibraryUsersList = (options) => {
  const page = options.page;
  const query = options.query;
  const library_id = options.library_id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/library-users?page=${page}&q=${query}`, options)
};

export const getLibraryUser = (options) => {
  const user_id = options.user_id
  const library_id = options.library_id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/library-users/${user_id}`, options)
};

export const updateLibraryUser = (options) => {
  const id = options.body.id
  const library_id = options.body.library_id
  options = getOption(options);

  return request(`${BASE_URL}/api/v1/libraries/${library_id}/library-users/${id}`, options)
}



//--------- ADMIN -------------//
///////   Users   ////////
export const getUsersList = (options) => {
  const page = options.page;
  const query = options.query;
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/users/users?page=${page}&q=${query}`, options)
};

export const createUser = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/users/users?include=roles,resources`, options)
};

export const getUser = (options) => {
  const user_id = options.id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/users/users/${user_id}?include=roles,resources`, options)
};

export const updateUser = (options) => {
  const user_id = options.body.id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/users/users/${user_id}?include=roles,resources`, options)
};

export const getUsersOptionsList = (options) => {
  options = getOption(options);
  const query = options.query;
  return request(`${BASE_URL}/api/v1/users/option-items?label=full_name&q=${query}`, options)
};

/// Roles and Resources ///
export const getRoles = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/users/roles`, options)
};

// Libraries
export const createLibrary = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries`, options)
};

export const getLibrary = (options) => {
  const library_id = options.id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries/${library_id}?include=granted_permissions`, options)
};

export const updateLibrary = (options) => {
  const library_id = options.body.id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries/${library_id}`, options)
};

export const getLibrariesList = (options) => {
  const page = options.page;
  const query = options.query;
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries/?page=${page}&q=${query}`, options)
};


// Institutions //
export const getInstitutionsList = (options) => {
  const page = options.page;
  const query = options.query;
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/institutions/?page=${page}&q=${query}`, options)
};


export const getInstitution = (options) => {
  const institution_id = options.id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/institutions/${institution_id}`, options)
};

export const updateInstitution = (options) => {
  const institution_id = options.body.id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/institutions/${institution_id}`, options)
};

export const getInstitutionTypesOptionList = (options) => {
  options = getOption(options);
  const query = options.query;
  return request(`${BASE_URL}/api/v1/institutions/option-items?label=name&q=${query}`, options)
};

export const getCountriesOptionsList = (options) => {
  options = getOption(options);
  const query = options.query ? options.query : "";
  return request(`${BASE_URL}/api/v1/commons/countries/option-items?label=name&q=${query}`, options)
};

export const createInstitution = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/institutions`, options)
};

export const getInstituionTypeList = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/institutions/institution-types`, options)
};

// Projects //

export const createProject = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/projects`, options)
};

export const getProject = (options) => {
  const project_id = options.id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/projects/${project_id}`, options)
};

export const updateProject = (options) => {
  const project_id = options.body.id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/projects/${project_id}`, options)
};

export const getProjectsList = (options) => {
  const page = options.page;
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/projects/?page=${page}`, options)
};

/*
|        | GET|HEAD | api/v1/institutions/institution-types                   | api.v1.institutions.index                              | App\Http\Controllers\Institutions\InstitutionTypeController@index         | api,auth:api                                     |
|        | POST     | api/v1/institutions/institution-types                   | api.v1.institutions.store                              | App\Http\Controllers\Institutions\InstitutionTypeController@store         | api,auth:api                                     |
|        | PUT      | api/v1/institutions/institution-types/{id}              | api.v1.institutions.update                             | App\Http\Controllers\Institutions\InstitutionTypeController@update        | api,auth:api                                     |
 */
// export const getIllness = (options) => {
//   options = getOption(options);
//   return request(`${BASE_URL}/api/reports/illnesses/`, options)
// };

// export const getPerceptions = (options) => {
//   options = getOption(options);
//   return request(`${BASE_URL}/api/reports/perceived_smells/`, options)
// };


// export const getNews = (options) => {
//   options = getOption(options);
//   return request(`${BASE_URL}/api/news/`, options)
// };
