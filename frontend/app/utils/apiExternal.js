import request from "./request";

const PMID_API_URL='https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi'
                    
const OPENACCESSBUTTON_API_URL='https://api.openaccessbutton.org'

const OPENSTREETMAP_API_URL='https://nominatim.openstreetmap.org'

const FIND_ISSN_SERVICE_URL='https://issn.org/api'  //sample

const FIND_ISBN_SERVICE_URL='https://sbn.it/api' //sample

const FIND_ISSN_ACNP_URL='https://acnp.bo.it/....' //sample




//Get Metadata using OpenAccessButton API
//ID can be doi,pmid,...
export const getOAReferenceByID = (options) => {
    const id=options.id
    return request(`${OPENACCESSBUTTON_API_URL}/metadata?id=${id}`,  {method: 'get'})
};

//Find OA and get metadata by DOI/PMID/Title
export const getOA = (options) => {
    let query=options.refData.title?options.refData.title:''; //3

    if(options.refData.pmid) query=options.refData.pmid; //2
    if(options.refData.doi) query=options.refData.doi; //1
    

    return request(`${OPENACCESSBUTTON_API_URL}/find?id=${query}`,  {method: 'get'})
};

//Metadata using Pubmed API and PMID
export const getPubmedReferenceByPMID = (options) => {
    const pmid=options.pmid
    //return request(`${PMID_API_URL}?db=pubmed&retmax=1&retmode=json&tool=my_tool&email=my_email@example.com&id=${pmid}`,  {method: 'get'})
    return request(`${PMID_API_URL}?db=pubmed&retmax=1&retmode=json&id=${pmid}`,  {method: 'get'})
};

export const getPlacesByText = (options) => {
    let query=options.search
    return request(`${OPENSTREETMAP_API_URL}/search?format=json&q=${query}`,  {method: 'get'})
}

export const getFindISSN = (options) => {
  console.log("getFindISSN",options)
    const title=options.title
    const year=options.year
    const issn=options.issn
    //return request(`${FIND_ISSN_SERVICE_URL}/xxxx?issn=${issn}&title=${title}&year=${year}`,  {method: 'get'})
    const result = {    
        'data': [
          {'issn': '9999-9999', 'issn_l': '9a9a-9b9b','pub_title': 'debugTitle99' },
          {'issn': '8888-8888', 'pub_title': 'debugTitle88' },
        ]
      }; 
      console.log("getFindISSN results",result);
    return result;  
};

export const getFindISSN_ACNP = (options) => {
    const title=options.title
    const year=options.year
    const issn=options.issn
    //return request(`${FIND_ISSN_ACNP_URL}/xxxx?issn=${issn}&title=${title}&year=${year}`,  {method: 'get'})
    const result = {    
        'data': [
          {'issn': '9999-9999', 'pub_title': 'acnpTitle99' },
          {'issn': '8888-8888', 'pub_title': 'acnpTitle88' },
        ]
      }; 
      console.log("getFindISSN_ACNP results",result);  
    return result;
};

export const getFindISBN = (options) => {
    const booktitle=options.booktitle
    //return request(`${FIND_ISBN_SERVICE_URL}/xxxx?booktitle=${booktitle}`,  {method: 'get'})
    const result = {    
        'data': [
          {'isbn': '999999999999','sbn_docid':'aaaaaaaaaaaaaaa', 'pub_title': 'sbnTitle99' },
          {'isbn': '888888888888','sbn_docid':'bbbbbbbbbbbbbbb', 'pub_title': 'sbnTitle88' },
        ]
      }; 
    console.log("getFindISBN results",result);  
    return result;
};