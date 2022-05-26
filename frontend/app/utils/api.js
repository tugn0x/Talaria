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


export const getNotifications = (options) => {
  const page = options.page;
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/notifications?page=${page}`, options)
};

export const getNotification = (options) => {
  const id = options.id;
  const setToRead = options.setToRead;
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/notifications/${id}?setToRead=${setToRead}`, options)
};

export const updateNotificationsAsRead = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/notifications/mark_all_as_read`, options)
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

export const getMyActiveLibrariesOptionList = (options) => {
  //const page = options.page;
  //const query = options.query;
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries/myactive`, options)
};

export const getLibraryOptionList = (options) => {
  options = getOption(options);
  const query = options.query ? options.query : "";
  return request(`${BASE_URL}/api/v1/libraries/option-items?label=name&q=${query}`, options)
};

export const getLabelsOptionList = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/references/labels/option-items?label=name`, options)
};

export const createLabel = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/references/labels`, options)
};

export const updateLabel = (options) => {
  const label_id = options.label_id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/references/labels/${label_id}`, options)
};

export const deleteLabel = (options) => {
  const label_id = options.label_id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/references/labels/${label_id}`, options)
};

export const createGroup = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/references/groups`, options)
};

export const updateGroup = (options) => {
  const group_id = options.group_id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/references/groups/${group_id}`, options)
};

export const deleteGroup = (options) => {
  const group_id = options.group_id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/references/groups/${group_id}`, options)
};

export const getGroupsOptionList = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/references/groups/option-items?label=name`, options)
};

export const getMyLibrary = (options) => {
  const library_id = options.id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries/${library_id}?include=departments,titles`, options)
};

export const requestAccessToLibrary = (options) => {
  const library_id = options.library_id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/library-users`, options)
};
export const updateAccessToLibrary = (options) => {
  const library_id = options.library_id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/library-users/${options.id}`, options)
};

//NB: id in realtà è l'id della relazione library_user
export const deleteAccessToLibrary = (options) => {
  const id = options.body.id
  const library_id = options.body.library_id
  options = getOption(options);

  return request(`${BASE_URL}/api/v1/libraries/${library_id}/library-users/${id}`, options)
}




export const getLibrariesSubjects = (options) => {
  options = getOption(options);
  const query = options.query;
  return request(`${BASE_URL}/api/v1/libraries/subjects/option-items?label=name&q=${query}`, options)
};

// Reference //
export const getReferencesList = (options) => {
  const page = options.page;
  const params = options.query;
  const pageSize = options.pageSize;
  let qstringpar="";
  if(params && params.query && params.query!="") qstringpar+="&q="+params.query;
  if(pageSize) qstringpar+="&pageSize="+pageSize;
  if(params && params.labelIds && params.labelIds.length>0) qstringpar+="&labelIds="+params.labelIds.join(',')+"";
  if(params && params.groupIds && params.groupIds.length>0) qstringpar+="&groupIds="+params.groupIds.join(',')+"";
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/references/my?page=${page}${qstringpar}`, options)
};

export const createReference = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/references`, options)
};

export const getReference = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/references/${options.id}?include=patronddrequests`, options)
};

export const updateReference = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/references/${options.id}`, options)
};

export const removeReferenceLabel = (options) => {
  const id = options.id
  const lid = options.labelId
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/references/${id}/labels/${lid}`, options)
};

export const removeReferenceGroup = (options) => {
  const id = options.id
  const gid = options.groupId
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/references/${id}/groups/${gid}`, options)
};

export const requestApplyLabelsToReferences = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/references/updateSelected`, options)
};

export const requestApplyGroupsToReferences = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/references/updateSelected`, options)
};

export const deleteReference = (options) => {
  const id = options.id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/references/${id}`, options)
};


// ---------- PATRON REQUEST -----//
export const getRequestsList = (options) => {
  const page = options.page;
  const params = options.query;
  const pageSize = options.pageSize;
  
  let qstringpar="";
  if(params && params.query && params.query!="") qstringpar+="&q="+params.query;
  if(pageSize) qstringpar+="&pageSize="+pageSize;
  if(params && params.labelIds && params.labelIds.length>0) qstringpar+="&labelIds="+params.labelIds.join(',')+"";
  if(params && params.groupIds && params.groupIds.length>0) qstringpar+="&groupIds="+params.groupIds.join(',')+"";
  if(params && !params.archived)
    qstringpar+="&archived=0";
  else if(params && params.archived>=0) 
    qstringpar+="&archived="+params.archived;
  //else qstringpar+="&archived=0";

  options = getOption(options);
  return request(`${BASE_URL}/api/v1/patronrequests/my?page=${page}${qstringpar}`, options)
};

export const getPatronRequest = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/patronrequests/${options.id}`, options)
};

export const createPatronRequest = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/patronrequests`, options)
};

export const updatePatronRequest = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/patronrequests/${options.id}`, options)
};

export const changeStatusPatronRequest = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/patronrequests/${options.id}/changestatus`, options)
};




// ---------- LIBRARY ---------- //
export const getLibraryUsersList = (options) => {
  const page = options.page;
  const query = options.query;
  const library_id = options.library_id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/library-users?page=${page}&q=${query}`, options)
};

//NB: user_id in realtà è l'id della relazione library_user
export const getLibraryUser = (options) => {
  const user_id = options.user_id
  const library_id = options.library_id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/library-users/${user_id}`, options)
};

//NB: id in realtà è l'id della relazione library_user
export const updateLibraryUser = (options) => {
  const id = options.body.id
  const library_id = options.body.library_id
  options = getOption(options);

  return request(`${BASE_URL}/api/v1/libraries/${library_id}/library-users/${id}`, options)
}

//NB: id in realtà è l'id della relazione library_user
export const deleteLibraryUser = (options) => {
  const id = options.body.id
  const library_id = options.body.library_id
  options = getOption(options);

  return request(`${BASE_URL}/api/v1/libraries/${library_id}/library-users/${id}`, options)
}

export const getLibraryTagsOptionList = (options) => {
  options = getOption(options);
  const library_id = options.library_id
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/tags/option-items?label=name`, options)
};

//BORROWING
export const getBorrowingsList = (options) => {
  const library_id = options.library_id
  const page = options.page;
  const params = options.query;
  const pageSize = options.pageSize;
  let qstringpar="";
  if(params && params.query && params.query!="") qstringpar+="&q="+params.query;
  if(pageSize) qstringpar+="&pageSize="+pageSize;
  if(params && params.labelIds && params.labelIds.length>0) qstringpar+="&tagIds="+params.labelIds.join(',')+"";  
  if(params && !params.archived)
    qstringpar+="&archived=0";
  else if(params && params.archived>=0) 
    qstringpar+="&archived="+params.archived;
  
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/borrowings?page=${page}${qstringpar}`, options)
};

export const requestApplyTagsToBorrowingRequests = (options) => {             
  options = getOption(options);
  const library_id = options.library_id
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/borrowings/updateSelected`, options)
};

export const requestApplyTagsToLendingRequests = (options) => {             
  options = getOption(options);
  const library_id = options.library_id
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/lendings/updateSelected`, options)
};

export const removeDDRequestTag = (options) => {
  const id = options.id
  const tid = options.tagId
  const library_id = options.library_id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/requests/${id}/tags/${tid}`, options)
};


export const createLibraryTag = (options) => {
  options = getOption(options);
  const library_id = options.library_id
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/tags`, options)
};

export const updateLibraryTag = (options) => {
  const tag_id = options.tag_id
  options = getOption(options);
  const library_id = options.library_id
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/tags/${tag_id}`, options)
};

export const deleteLibraryTag = (options) => {
  const tag_id = options.tag_id
  options = getOption(options);
  const library_id = options.library_id
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/tags/${tag_id}`, options)
};

export const createNewBorrowing = (options) => {
  options = getOption(options);
  const library_id = options.borrowing_library_id
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/borrowings`, options)
};

export const getBorrowingRequest = (options) => {
  options = getOption(options);
  const library_id = options.library_id
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/borrowings/${options.id}`+"?include=tracking", options)
};


export const updateBorrowing = (options) => {
  options = getOption(options);
  const library_id = options.borrowing_library_id
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/borrowings/${options.id}`, options)
};

export const changeStatusBorrowingRequest = (options) => {
  options = getOption(options);
  const library_id = options.borrowing_library_id
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/borrowings/${options.id}/changestatus`, options)
};
 
//DELIVERY
export const getBorrowingToDeliverList = (options) => {
  const library_id = options.library_id  
  const page = options.page;
  const params = options.filter;
  const pageSize = options.pageSize;
  let qstringpar="&toDeliver=1";
  if(params && params.query && params.query!="") qstringpar+="&q="+params.query;
  if(pageSize) qstringpar+="&pageSize="+pageSize;
  if(params && params.desksIds && params.desksIds.length>0) qstringpar+="&deliveryIds="+params.desksIds.join(',')+"";  
   
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/borrowings?page=${page}${qstringpar}`, options)
};

 
//LENDING

export const getLendingsList = (options) => {

  var library_id = options.library_id
  const page = options.page;
  const params = options.query;
  const pageSize = options.pageSize;
  
  let qstringpar="";
  if(params && params.query && params.query!="") qstringpar+="&q="+params.query;
  if(pageSize) qstringpar+="&pageSize="+pageSize;
  if(params && params.labelIds && params.labelIds.length>0) qstringpar+="&tagIds="+params.labelIds.join(',')+""; 
  if(params && params.all_lender>0) qstringpar+="&all_lender="+ params.all_lender;
  else if(params && !params.lending_archived) { qstringpar+="&lending_archived=0"; }
  else if(params && params.lending_archived>=0) 
    qstringpar+="&lending_archived="+params.lending_archived;
  options = getOption(options);

   return request(`${BASE_URL}/api/v1/libraries/${library_id}/lendings?page=${page}${qstringpar}`, options)
  };

  export const getLendingRequest = (options) => {
    options = getOption(options);
    const lending_library_id = options.library_id
    return request(`${BASE_URL}/api/v1/libraries/${lending_library_id}/lendings/${options.id}`, options)
  };
  
export const changeStatusLendingRequest = (options) => {
  options = getOption(options);
  const library_id = options.lending_library_id
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/lendings/${options.id}/changestatus`, options)
  };
  
  export const changeLendingArchivedRequest = (options) => {
  options = getOption(options);
  const library_id = options.lending_library_id
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/lendings/${options.id}/changelendingarchived`, options)
  };
  
  export const acceptallLenderLendingRequest = (options) => {
  options = getOption(options);
  const library_id = options.lending_library_id
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/lendings/${options.id}/acceptallLenderLending`, options)
  };

/// POST PUBLIC LIBRARY
export const createPublicLibrary = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries/public?include=granted_permissions,institution,country,departments`, options)
};

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
  return request(`${BASE_URL}/api/v1/libraries?include=granted_permissions,institution,country,departments`, options)
};

export const getLibrary = (options) => {
  const library_id = options.id
  options = getOption(options);
  const extra=(options.includes)?','+options.includes:''
  const fullincludes='granted_permissions'+extra;

  return request(`${BASE_URL}/api/v1/libraries/${library_id}?include=${fullincludes}`, options)
};

export const updateLibrary = (options) => {
  const library_id = options.body.id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries/${library_id}?include=granted_permissions,institution,country,departments`, options)
};

export const deleteLibrary = (options) => {
  const library_id = options.id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries/${library_id}`, options)
};


export const getLibrariesList = (options) => {
  const page = options.page;
  const query = options.query;
  const filterBy = options.filterBy;
  const filterVal = options.filterVal;  

  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries/?page=${page}&q=${query}&filterBy=${filterBy}&filterVal=${filterVal}`, options)
};

export const getLibrariesListNearTo = (options) => {
  const pos = options.pos;
  const lat=pos.lat
  const lon=pos.lon
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries/nearto?lat=${lat}&lon=${lon}`, options)
};

export const getLibraryDeliveries = (options) => {
  const library_id = options.id
  const pageSize=options.pageSize
  const page=options.page
  options = getOption(options);
  
  let qstringpar="";

  if(pageSize) qstringpar+="pageSize="+pageSize;
  if(page) qstringpar+=(qstringpar!=""?'&':'')+"page="+page;

  if(qstringpar!="") qstringpar="?"+qstringpar
  
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/deliveries${qstringpar}`, options)
};

export const getLibraryDelivery = (options) => {
  const library_id = options.id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/deliveries/${delivery_id}`, options)
};

export const getLibraryDeliveriesOptionList = (options) => {
  options = getOption(options);
  const library_id = options.library_id
  return request(`${BASE_URL}/api/v1/libraries/${library_id}/deliveries/option-items?label=name`, options)
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
  return request(`${BASE_URL}/api/v1/institutions/${institution_id}?include=granted_permissions`, options)
};

export const updateInstitution = (options) => {
  const institution_id = options.body.id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/institutions/${institution_id}?include=granted_permissions`, options)
};

export const getInstitutionTypesOptionList = (options) => {
  options = getOption(options);
  const query = options.query;
  return request(`${BASE_URL}/api/v1/institutions/institution-types/option-items?label=name&q=${query}`, options)
};

export const getInstitutionsOptionList = (options) => {
  options = getOption(options);
  const query = options.query;
  return request(`${BASE_URL}/api/v1/institutions/option-items?label=name&q=${query}`, options)
};

export const getInstitutionsByTypeByCountryOptionList = (options) => {
  options = getOption(options);
  const query = options.query;
  const countryid = options.countryid;
  const institutiontypeid = options.institutiontypeid;
  console.log(`${BASE_URL}/api/v1/institutions/option-items/?label=name&country_id=${countryid}&institution_type_id=${institutiontypeid}`)
  return request(`${BASE_URL}/api/v1/institutions/option-items/?label=name&country_id=${countryid}&institution_type_id=${institutiontypeid}`, options)
};

export const getCountriesOptionsList = (options) => {
  options = getOption(options);
  const query = options.query ? options.query : "";
  return request(`${BASE_URL}/api/v1/commons/countries/option-items?label=name&q=${query}`, options)
};

export const createInstitution = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/institutions?include=granted_permissions`, options)
};

export const getInstituionTypeList = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/institutions/institution-types`, options)
};

// Projects //

export const createProject = (options) => {
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/projects?include=granted_permissions`, options)
};

export const getProject = (options) => {
  const project_id = options.id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/projects/${project_id}?include=granted_permissions`, options)
};

export const updateProject = (options) => {
  const project_id = options.body.id
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/projects/${project_id}?include=granted_permissions`, options)
};

export const getProjectsList = (options) => {
  const page = options.page;
  options = getOption(options);
  return request(`${BASE_URL}/api/v1/projects/?page=${page}`, options)
};
export const getProjectsOptionList = (options) => {
  options = getOption(options);
  const query = options.query;
  return request(`${BASE_URL}/api/v1/projects/option-items?label=name&q=${query}`, options)
};


export const getlibraryProjectsOptionList = (options) => {
  options = getOption(options);
  const query = options.query;
  return request(`${BASE_URL}/api/v1/projects/option-items?label=name&q=${query}`, options)
  //return request(`${BASE_URL}/api/v1/projects/option-items`, options)
}


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