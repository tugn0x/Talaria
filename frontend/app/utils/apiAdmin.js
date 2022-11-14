import request from "./request";

import {BASE_URL,getOption} from './api';

const BASE_ADMIN_URL=BASE_URL+"/api/v1/admin";


// Libraries //
export const admin_getLibrariesList = (options) => {
    const page = options.page;
    const pageSize=options.pageSize
    const query = options.query;
    const filterBy = options.filterBy;
    const filterVal = options.filterVal;  

    let qstringpar="";    
    if(pageSize) qstringpar+="&pageSize="+pageSize;
    //if(params && params.labelIds && params.labelIds.length>0) qstringpar+="&tagIds="+params.labelIds.join(',')+"";      
    /*if(query) qstringpar+="&q="+query;
    if(filterBy) qstringpar+="&filterBy="+filterBy;
    if(filterVal) qstringpar+="&filterVal="+filterVal;*/
      
    options = getOption(options);

    return request(`${BASE_ADMIN_URL}/libraries/?page=${page}${qstringpar}`, options)
  };

export const admin_deleteLibrary = (options) => {
    const library_id = options.id
    options = getOption(options);
    return request(`${BASE_ADMIN_URL}/libraries/${library_id}`, options)
  };
  

export const admin_statusChangeLibrary = (options) => {
  const library_id = options.library_id
  
  options = getOption(options);  
  return request(`${BASE_ADMIN_URL}/libraries/${library_id}/changestatus`, options) 
}

export const admin_getLibrary = (options) => {
  const library_id = options.id
  options = getOption(options);
  const extra=(options.includes)?','+options.includes:''
  const fullincludes='granted_permissions'+extra;

  return request(`${BASE_ADMIN_URL}/libraries/${library_id}?include=${fullincludes}`, options)
};

export const admin_updateLibrary = (options) => {
  const library_id = options.body.id
  options = getOption(options);
  return request(`${BASE_ADMIN_URL}/libraries/${library_id}?include=granted_permissions,institution,country,departments`, options)
};

// Institutions //
export const admin_getInstitutionsList = (options) => {
  const page = options.page;
  const pageSize=options.pageSize
  const query = options.query;
  const filterBy = options.filterBy;
  const filterVal = options.filterVal;  

  let qstringpar="";    
  if(pageSize) qstringpar+="&pageSize="+pageSize;
  options = getOption(options);

  return request(`${BASE_ADMIN_URL}/institutions/?page=${page}&q=${qstringpar}`, options)
};

export const admin_updateInstitution = (options) => {
  const institution_id = options.body.id
  options = getOption(options);
  return request(`${BASE_ADMIN_URL}/institutions/${institution_id}?include=granted_permissions`, options)
};

export const admin_createInstitution = (options) => {
  options = getOption(options);
  return request(`${BASE_ADMIN_URL}/institutions`, options)
};

export const admin_statusChangeInstitution = (options) => {
  const institution_id = options.institution_id
  
  options = getOption(options);  
  return request(`${BASE_ADMIN_URL}/institutions/${institution_id}/changestatus`, options) 
}


export const admin_deleteInstitution = (options) => {
  const institution_id = options.id
  options = getOption(options);
  return request(`${BASE_ADMIN_URL}/institutions/${institution_id}`, options)
};

export const admin_getInstitutionsByTypeByCountryOptionList = (options) => {
  options = getOption(options);
  const query = options.query;
  const countryid = options.countryid;
  const institutiontypeid = options.institutiontypeid;  
  return request(`${BASE_ADMIN_URL}/institutions/option-items/?label=name&country_id=${countryid}&institution_type_id=${institutiontypeid}`, options)
};

export const admin_getInstitution = (options) => {
  const institution_id = options.id
  options = getOption(options);
  return request(`${BASE_ADMIN_URL}/institutions/${institution_id}`, options)
};


export const admin_updateInstitutionType = (options) => {
  const institution_type_id = options.body.id
  options = getOption(options);
  return request(`${BASE_ADMIN_URL}/institutions/institution-types/${institution_type_id}`, options)
};

export const admin_createInstitutionType = (options) => {
  options = getOption(options);
  return request(`${BASE_ADMIN_URL}/institutions/institution-types`, options)
};


export const admin_deleteInstitutionType = (options) => {
  const institution_type_id = options.id
  options = getOption(options);
  return request(`${BASE_ADMIN_URL}/institutions/institution-types/${institution_type_id}`, options)
};



  

