import request from "./request";

const PMID_API_URL='https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi'
                    
const OPENACCESSBUTTON_API_URL='https://api.openaccessbutton.org'

const OPENSTREETMAP_API_URL='https://nominatim.openstreetmap.org'




//Get Metadata using OpenAccessButton API and DOI
export const getReferenceByDOI = (options) => {
    const doi=options.doi
    return request(`${OPENACCESSBUTTON_API_URL}/metadata?id=${doi}`,  {method: 'get'})
};

//Metadata using Pubmed API and PMID
export const getReferenceByPMID = (options) => {
    const pmid=options.pmid
    //return request(`${PMID_API_URL}?db=pubmed&retmax=1&retmode=json&tool=my_tool&email=my_email@example.com&id=${pmid}`,  {method: 'get'})
    return request(`${PMID_API_URL}?db=pubmed&retmax=1&retmode=json&id=${pmid}`,  {method: 'get'})
};

//Find OA and get metadata by DOI/PMID/Title
export const getOA = (options) => {
    let query=options.refData.title?options.refData.title:''; //3

    if(options.refData.pmid) query=options.refData.pmid; //2
    if(options.refData.doi) query=options.refData.doi; //1
    

    return request(`${OPENACCESSBUTTON_API_URL}/find?id=${query}`,  {method: 'get'})
};

export const getPlacesByText = (options) => {
    let query=options.search
    return request(`${OPENSTREETMAP_API_URL}/search?format=json&q=${query}`,  {method: 'get'})
}