import React, {useEffect, useState} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {requestFindOA,cleanImportedreference} from './actions' 
import makeSelectOASearchReference, {isOASearchReferenceLoading} from './selectors';

import OASearchReferenceForm from '../../components/OASearchReferenceForm';
import { set } from 'lodash';


const OASearchReference = (props) => {

const {goToForm,showReference,onFound,onNotFound,onStartSearch, dispatch,isLoading,oasearchreference}=props

const oareference=oasearchreference.oareference;

//const [isMounted, setIsMounted] = useState(false);

//const [refData,setRefData] = useState(null);  
const [found,setFound]=useState(null);

const findReferenceBySearchParams = (query) => {  
  console.log("findReferenceBySearchParams:", query)      
  if(onStartSearch) 
    onStartSearch();

  setFound(null);  

  let data={}
  
  //try DOI
  let doi=query.match(/\b((10\.\d{4,9}\/[-._;()/:A-Z0-9a-z]+))/);
  if(doi!=null)
  {
      console.log("DOI MATCH!",doi[0])
      data.doi=doi[0]
      //dispatch(requestFindReferenceByDOI(doi[0]))            
  }
  else 
  {    
        //else try ISBN ...
        //NOTE: this match doesn't work :()
        let isbn=query.match('/\b(97(8|9))?\d{9}(\d|X)\b/')
        if(isbn!=null)
        {
            console.log("isbn MATCH!",isbn[0])
            data.isbn=isbn[0]     
        }    
        else {
            //try PMID
            let pmid=query.match(/\b(\d{7,})\b/)
            if(pmid!=null)
            {
                console.log("PMID MATCH!",pmid[0])
                data.pmid=pmid[0]                
                //dispatch(requestFindReferenceByPMID(pmid[0]))
                
            }    
        }      
  }
  if(data.pmid==null && data.doi==null && data.isbn==null)
  {
    //base search by title
    data.title=query
  }


  if(data && (data.pmid||data.doi||data.title))
      dispatch(requestFindOA(data))
  else if(data && (data.isbn))      
  {
      console.log("TODO SEARCH BY ISBN:",data.isbn)
      //dispatch(requestFindISBN(data.isbn))...
  }
 
}


const parseAuthors = (authors)=> {
  let text="";

  authors.map( a => { 
      let str=(a.family && a.given)?a.given+" "+a.family:
      (a.firstName && a.lastName)?a.firstName+" "+a.lastName:
      a.fullName?a.fullName:
      a.name?a.name:''

      if(str)
      {
          text+=(text!='')?", ":''
          text+=str;
      }
  })

  return text;
}

const parseFromOAButton = (reference) => {
  let obj={}

  if(reference.metadata && Object.keys(reference.metadata).length>2)
  {
      let metadata=reference.metadata
  
      //default:              
      let pubtype=1
      
      //NOTA: le api di OpenAccessButton gestiscono solo articoli!
      //Specifica metadati: https://dev.api.cottagelabs.com/service/oab/metadata/keys
      if(metadata.crossref_type)
      {
          let tystr=metadata.crossref_type.toString().toLowerCase();
          if(tystr.includes('journal'))
              pubtype=1;
          else if(tystr.includes('book'))
              pubtype=2;    
          /*else if(tystr.includes('thesis'))
              pubtype=3; */
      }
      else            
      {
          //try to guess from fields                
          if(metadata.journal)
              pubtype=1;
          else if(metadata.isbn||metadata.book)    
              pubtype=2;
      }      
      obj={
          pub_title: pubtype==1?metadata.journal:metadata.title?metadata.title:'',
          part_title: pubtype==1?metadata.title:'',
          authors: (!pubtype || pubtype!=1) && metadata.author?parseAuthors(metadata.author):'',
          part_authors: pubtype==1 && metadata.author?parseAuthors(metadata.author):'',
          abstract: metadata.abstract?metadata.abstract:'',
          pubyear: metadata.year,
          volume: metadata.volume?metadata.volume:'',
          issue: metadata.issue?metadata.issue:'',
          pages: metadata.pages?metadata.pages:metadata.page?metadata.page:'', 
          material_type: pubtype,
          issn: metadata.issn?String(metadata.issn):'',
          isbn: metadata.isbn?metadata.isbn:'',
          publisher: metadata.publisher?metadata.publisher:'',
          publishing_place: '',
          doi: metadata.doi?metadata.doi:'',
          pmid: metadata.pmid?metadata.pmid:'',
          oa_link: reference.url && Object.keys(reference.metadata).length>0 && reference.url?reference.url:null
      }      
  }  
      
  return obj;
}
   
    /*Parsing da PUBMED
    const parsePMIDdoi = (ids) => {
        let doi=''
        
        ids.map( articleid => {
            if(articleid.idtype==='doi')
                doi=articleid.value

        })
        return doi;
    }
   
    const parseFromPubmed = (metadata) => {
        let obj={}

        let pubtype=metadata.pubtype?metadata.pubtype.toString().toLowerCase():null;
        
        obj={
            pmid: metadata.uid,
            pub_title: metadata.fulljournalname?metadata.fulljournalname:metadata.booktitle?metadata.booktitle:'',
            part_title: metadata.title,
            part_authors: metadata.authors?parseAuthors(metadata.authors):'',
            abstract: metadata.abstract?metadata.abstract:'',
            volume: metadata.volume?metadata.volume:'',
            issue: metadata.issue?metadata.issue:'',
            pubyear:  metadata.pubdate?metadata.pubdate.match(/\b(\d{4})\b/)[0]:'',
            pages: metadata.pages?metadata.pages:'', 
            material_type: pubtype==null? 0:( pubtype.includes('article')||pubtype.includes('review'))?1:(pubtype.includes('book')||pubtype.includes('biography')||pubtype.includes('diary'))?2:0,
            issn: metadata.issn?metadata.issn:'',
            isbn: metadata.isbn?metadata.isbn:'',
            publisher: metadata.publishername?metadata.publishername:'',
            publishing_place: metadata.publisherlocation?metadata.publisherlocation:'',
            doi: metadata.articleids?parsePMIDdoi(metadata.articleids):'',
        }
        
        return obj;
    }*/

useEffect ( () => {
  if(/*isMounted && */ oareference && oareference.metadata)
  {
      console.log("parsing del ref con i dati presi dall'OAButton API!",oareference);
      //parsing metadati da OA + salvataggio link oa
      
      let newref=parseFromOAButton(oareference)
                 
      if(newref && Object.keys(newref).length>0) 
      {
          setFound(newref)          
          /*if(refData!=null)
          {
              console.log("NOT NEW, so update only oa link")
              //setOALink(newref.oa_link) 
              setRefData({...refData,oa_link:newref.oa_link})                   
              
          }
          else if(refData==null || !refData||Object.keys(refData).length==0||refData===undefined)
          {
              console.log("Isnew, so update refData",newref)                    
      
              setRefData(newref) 
          }
          else
          {
              //console.log("NOT NEW, so update only oa link")
              //setRefData({...refData,oa_link:newref.oa_link})                    
              
              //setOALink(newref.oa_link);
              //if(newref.oa_link!="") 
              //    setRefData({...refData,oa_link:newref.oa_link})                    
          }
          */
          //Clean oareference stored in redux (altrimenti se andavo in nuovo riferimento mi proponeva i dati precedenti)
          //dispatch(cleanImportedreference())
      }
      else 
        setFound({})
      //  if(onNotFound) 
      //    onNotFound();
      
      
      //setRefData({...refData,oa_link:oareference.url})
      //if(oareference.found && oareference.url)
      //    setOALink(oareference.url);
     
  }
  else console.log("OASearchReference NOT MOUNTED")
},[oareference]);

useEffect(() => {
  //clean
  dispatch(cleanImportedreference());

  if(found !=null)
    if(onFound) onFound(found)
  else 
    if(onNotFound) onNotFound();
}, [found])


return (
    <OASearchReferenceForm   
          searchCallBack={ (query) => findReferenceBySearchParams(query)}                                        
          goToForm={goToForm}                    
          isLoading={isLoading}
          oareference={found}            
          showReference={showReference}        
    />           
  
)

}

const mapStateToProps = createStructuredSelector({  
  isLoading: isOASearchReferenceLoading(),
  oasearchreference: makeSelectOASearchReference()
});

function mapDispatchToProps(dispatch) {
  return {
      dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)((OASearchReference));
