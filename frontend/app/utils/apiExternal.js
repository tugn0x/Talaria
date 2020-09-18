import request from "./request";

const PMID_API_URL='https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi'
                    
const OPENACCESSBUTTON_API_URL='https://api.openaccessbutton.org'


export const getReferenceByDOI = (options) => {
    const doi=options.doi
    return request(`${OPENACCESSBUTTON_API_URL}/metadata?id=${doi}`,  {method: 'get'})
};

export const getReferenceByPMID = (options) => {
    const pmid=options.pmid
    //return request(`${PMID_API_URL}?db=pubmed&retmax=1&retmode=json&tool=my_tool&email=my_email@example.com&id=${pmid}`,  {method: 'get'})
    return request(`${PMID_API_URL}?db=pubmed&retmax=1&retmode=json&id=${pmid}`,  {method: 'get'})
};