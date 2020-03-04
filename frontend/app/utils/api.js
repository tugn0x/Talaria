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


export const getMyLibraries = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries/my`, options)
};

export const getLibraryList = (options) => {
  options = getOption(options);
  const query = options.query ? options.query : "";
  return request(`${BASE_URL}/api/v1/libraries/option-items?label=name&q=${query}`, options)
};

export const requestAccessToLibrary = (options) => {
  const library_id = options.body.library_id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/library-users`, options)
};

export const getReferencesList = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/references/my`, options)
};

export const createReferences = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/references`, options)
};

export const updateReferences = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/references/${options.id}`, options)
};

export const getUsersList = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/users/users`, options)
};

export const createUser = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/users/users`, options)
};

/* 
GET SINGLE USER
export const getUser = (options) => {
  const user_id = options.body.id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/users/users/${user_id}`, options)
}; */

export const updateUser = (options) => {
  const user_id = options.body.id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/users/users/${user_id}`, options)
};

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
