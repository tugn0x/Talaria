import React, {useEffect, useState} from 'react'
import {requestGetReference, requestRemoveLabel} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectPatron, {isPatronLoading} from '../selectors';
import {ReferencesForm,Loader} from 'components';
import ReferenceDetail from 'components/Patron/ReferenceDetail';
import ReferenceRequest from 'components/Patron/ReferenceRequest';
import {requestPostReferences,requestUpdateReferences,
        requestMyActiveLibrariesOptionList, requestLabelsOptionList, 
        requestGroupsOptionList, requestApplyLabelsToReferences, 
        requestApplyGroupsToReferences, requestRemoveReferenceLabel,
        requestRemoveReferenceGroup, requestDeleteReference,requestGetLibraryDeliveries,requestPostRequest/*,requestFindReferenceByDOI,requestFindReferenceByPMID*/,cleanImportedreference,requestFindOA} from '../actions'
import messages from './messages';
import confirm from "reactstrap-confirm";
import SectionTitle from 'components/SectionTitle';
import {useIntl} from 'react-intl';
import ErrorMsg from '../../../components/ErrorMsg';


/* TODO 
   - mapping da DOI/PMID: manca la corrispondenza dei campi per le varie tipologie
   di documento ricevuto 
   - find per ISBN ...
*/

const ReferencesPage = (props) => {
    //console.log('ReferencesPage', props)
    const {dispatch, isLoading, match, patron} = props
    const {params} = match
    const reference = patron.reference 
    //const importedreference=patron.importedreference
    const intl = useIntl();
    const isNew = !params.id || params.id === 'new'
    const isRequest = params.id && params.op=="request"
    const labelsOptionList = patron.labelsOptionList;
    const groupsOptionList = patron.groupsOptionList;
    const libraryOptionList= patron.libraryOptionList;
    const deliveryOptionList= patron.deliveryOptionList;
    const [isMounted, setIsMounted] = useState(false);
    const oareference=patron.oareference;
    const [OALink,setOALink] = useState('');
    const [refData,setRefData] = useState(null);  
    /*const [refData,setRefData] = useState(() => {
        if(!reference || Object.keys(reference).length==0)
            return null;
        else return {...reference}    
        
    })*/      

    const parseAuthors = (authors)=> {
        let text="";

        authors.map( a => { 
            let str=(a.family && a.given)?a.given+" "+a.family:
            (a.firstName && a.lastName)?a.firstName+" "+a.lastName:''

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

        if(reference.metadata && Object.keys(reference.metadata).length>0)
        {
            let metadata=reference.metadata
        
            //default:              
            let pubtype=1
            
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
                pages: metadata.page?metadata.page:'', 
                material_type: pubtype,
                issn: metadata.issn?metadata.issn:'',
                isbn: metadata.isbn?metadata.isbn:'',
                publisher: metadata.publisher?metadata.publisher:'',
                publishing_place: '',
                doi: metadata.doi?metadata.doi:'',
                pmid: metadata.pmid?metadata.pmid:'',
                oa_link: reference.found && Object.keys(reference.metadata).length>0 && reference.url?reference.url:null
            }
        }
            
        return obj;
    }

    //Parsing da PUBMED
    /*
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


    useEffect(() => {        
      //  if(isNew)    
      //      setRefData(null)  
        setIsMounted(true)        
    }, [])
   
    useEffect(() => {
        if(reference && Object.keys(reference).length>0 )
            setRefData({...reference})       
    }, [reference])


    useEffect(() => {
        if(!isNew && !isLoading){
           dispatch(requestGetReference(params.id));
        }
        if(!isLoading){
            dispatch(requestLabelsOptionList());
            dispatch(requestGroupsOptionList());
        }
        
    }, [params.id])

    useEffect(() => {
       if(isRequest && !isLoading)
           dispatch(requestMyActiveLibrariesOptionList())
    }, [isRequest])

    useEffect(() => {        
          if(isNew)    
              setRefData(null)          
      }, [isNew])

  /* useEffect( () => {
        if(importedreference && Object.keys(importedreference).length>0)
        {
        console.log("PARSING importedreference",importedreference)
                    //mapping data
                    
                    let newref={}

                    if(importedreference.fromDOI && Object.keys(importedreference.fromDOI).length>0)
                        newref=parseFromOAButton(importedreference.fromDOI);
                    else if(importedreference.fromPMID && Object.keys(importedreference.fromPMID).length>0)
                        newref=parseFromPubmed(importedreference.fromPMID);
                        
                    setRefData(newref) 

                    //Clean importedreference (altrimenti se andavo in nuovo riferimento mi proponeva i dati precedenti)
                    dispatch(cleanImportedreference())
        }
        
    }, [importedreference])*/

    /*useEffect ( () => {
        if(importedreference && Object.keys(importedreference).length>0)
            dispatch(requestFindOA(importedreference))
    },[importedreference]);*/

    /*useEffect ( () => {
       if(reference && Object.keys(reference).length>0)
            dispatch(requestFindOA(reference))    

    },[reference]);*/

    useEffect ( () => {
        console.log("REFDATA:",refData)
        console.log("coming from OAApi: isNew:",isNew)        
        console.log("REFERENCE:",reference)
        if(isMounted && oareference && oareference.find)
        {
            console.log("parsing del ref con i dati presi dall'OAButton API!",oareference);
            //parsing metadati da OA + salvataggio link oa
            
            let newref=parseFromOAButton(oareference)
                       
            if(newref)            
            {
                if(refData!=null /*&& reference && Object.keys(reference).length>0*/)
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
                //Clean oareference stored in redux (altrimenti se andavo in nuovo riferimento mi proponeva i dati precedenti)
                //dispatch(cleanImportedreference())
            }
            
            //setRefData({...refData,oa_link:oareference.url})
            //if(oareference.found && oareference.url)
            //    setOALink(oareference.url);
           
        }
    },[oareference]);

    async function deleteReference (id) {
        let conf = await confirm({
             title: intl.formatMessage({id: 'app.global.confirm'}),
             // message: intl.formatMessage(messages.askRemoveLabelMessage),
             message: intl.formatMessage({id: 'app.global.deleteMessage'}),
             confirmText: intl.formatMessage({id: 'app.global.yes'}),
             cancelText: intl.formatMessage({id: 'app.global.no'})
         }); //
         if(conf)
             dispatch(requestDeleteReference(id,intl.formatMessage({id: 'app.global.removedMessage'})))
     }
    
    const applyLabelsToReferences = (labelIds,refIds) => {
        dispatch(requestApplyLabelsToReferences(refIds,[labelIds],'etichetta applicata', true))
     }
    const applyGroupsToReferences = (labelIds,refIds) => {
        dispatch(requestApplyGroupsToReferences(refIds,[labelIds],'etichetta applicata', true))
     }

     const libraryOnChange = (lib) => {
        dispatch(requestGetLibraryDeliveries(lib.id));
     }

    
     const submitReferenceRequest = (data) => {
         dispatch(requestPostRequest(data,"Request added"))
     }

     const canRequest = (ref) => {
        return (ref.active_patronrequests==0)
     }

     
     const canEdit = (ref) => {
         if(ref)
            return (ref.patronrequests==0)
         return false;   
    }

    const findReferenceBySearchParams = (query) => {
        console.log("findReferenceBySearchParams:", query)        
        let data={}

        //base search by title
        data.title=query

        //try DOI
        let doi=query.match(/\b((10\.\d{4,9}\/[-._;()/:A-Z0-9a-z]+))/);
        if(doi!=null)
        {
            console.log("DOI MATCH!",doi[0])
            data.doi=doi[0]
            //dispatch(requestFindReferenceByDOI(doi[0]))            
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
            //else try ISBN ...

        }

        if(data && (data.pmid||data.doi||data.title))
            dispatch(requestFindOA(data))
            

    }

    const findOA = (data) => {
        console.log("chiamo openaccessbutton");
        if(data && Object.keys(data).length>0 && (data.title!=""||data.doi!=""))
            dispatch(requestFindOA(data));
    }

    
    
    return (
        <Loader show={isLoading}>
            {isNew && isMounted && (
                <ReferencesForm 
                    messages={messages}
                    importReference={refData}
                    createReference={ (formData) => dispatch(requestPostReferences(formData, intl.formatMessage(messages.referenceAdded))) } 
                    findReference={ (query) => findReferenceBySearchParams(query)}
                    labelsOptionList={labelsOptionList}
                    groupsOptionList={groupsOptionList}
                    /*findOA={ (formData) => findOA({title: formData.pub_title, doi:formData.doi,pmid:formData.pmid}) }
                    OALink={OALink}*/
                />
                )
            }
            {!isNew && isMounted && refData && ( 
                params.op && params.op=="edit" &&
                    (canEdit(refData/*reference*/) && <ReferencesForm 
                        messages={messages}
                        reference={refData/*reference*/}
                        labelsOptionList={labelsOptionList}
                        groupsOptionList={groupsOptionList}
                        applyLabels={applyLabelsToReferences}
                        applyGroups={applyGroupsToReferences}
                        deleteReference={(id) => deleteReference(id)}
                        removeLabel={(id, labelId) => dispatch(requestRemoveReferenceLabel(id,labelId, 'removeLabel' ))}
                        removeGroup={(id, groupId) => dispatch(requestRemoveReferenceGroup(id,groupId,'removeGroup'))}
                        updateReference={ (formData) => dispatch(requestUpdateReferences(formData, params.id, intl.formatMessage(messages.referenceUpdate))) } 
                        /*findOA={ (formData) => findOA({title: formData.pub_title, doi:formData.doi,pmid:formData.pmid}) }
                        OALink={OALink}*/
                        history={props.history}
                        />
                        || 
                        <ErrorMsg cssclass="alert-danger" message="ERROR: can't edit this reference"/>)
                ||
                isRequest && isMounted && refData &&
                    /*(canRequest(reference) &&*/ <ReferenceRequest
                        messages={messages}
                        reference={refData/*reference*/} 
                        libraryOptionList={libraryOptionList}
                        deliveryOptionList={deliveryOptionList}
                        libraryOnChange={libraryOnChange}
                        submitCallBack={submitReferenceRequest}
                        history={props.history}
                        /*
                          findOA={ (formData) => findOA({title: formData.pub_title, doi:formData.doi,pmid:formData.pmid}) }
                          OALink={OALink}
                        */
                    /> /*
                        || 
                    <ErrorMsg message="ERROR: can't request this reference"/>
                    )*/
                ||
                isMounted && refData && <div className="detail">
                        <SectionTitle 
                            back={true}
                            title={messages.headerDetail}
                        />                        
                        <ReferenceDetail 
                            messages={messages}
                            reference={refData/*reference*/} 
                            deleteReference={(id) => deleteReference(id)}
                        />
                    </div>
                )
            }
        </Loader>
    )
}

const mapStateToProps = createStructuredSelector({
    isLoading: isPatronLoading(),
    patron: makeSelectPatron()
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
  
export default compose(withConnect)((ReferencesPage));