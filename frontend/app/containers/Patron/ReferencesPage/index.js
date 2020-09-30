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
        requestRemoveReferenceGroup, requestDeleteReference,requestGetLibraryDeliveries,requestPostRequest,requestFindReferenceByDOI,requestFindReferenceByPMID,cleanImportedreference} from '../actions'
import messages from './messages';
import confirm from "reactstrap-confirm";
import SectionTitle from 'components/SectionTitle';
import {useIntl} from 'react-intl';
import ErrorMsg from '../../../components/ErrorMsg';

/* TODO DA RIVEDERE IN BASE A MAPPING CAMPI */

const ReferencesPage = (props) => {
    console.log('ReferencesPage', props)
    const {dispatch, isLoading, match, patron} = props
    const {params} = match
    const reference = patron.reference 
    const importedreference=patron.importedreference
    const intl = useIntl();
    const isNew = !params.id || params.id === 'new'
    const isRequest = params.id && params.op=="request"
    const labelsOptionList = patron.labelsOptionList;
    const groupsOptionList = patron.groupsOptionList;
    const libraryOptionList= patron.libraryOptionList;
    const deliveryOptionList= patron.deliveryOptionList;
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const [refData,setRefData] = useState(null);

    const parseFromDOI = (metadata) => {
        let obj={}

        obj={
            pub_title: metadata.journal,
            part_title: metadata.title,
            volume: metadata.volume,
            issue: metadata.issue,
            //pubyear: metadata.pubdate.match(/\d{4}/)[0],
            authors: (metadata.author && metadata.author.length>0 && metadata.author[0] && metadata.author[0].sequence=="first")?metadata.author[0].family+" "+metadata.author[0].given:'',
            //TODO: ciclare su tutti gli "additional" e concatenarli nel campo last_author
            //last_author: (importedreference.author && importedreference.author.length>1 && importedreference.author[1] && importedreference.author[0].sequence=="additional")?importedreference.author[1].family+" "+importedreference.author[1].given:'',
            material_type: 1,
        }

        return obj;
    }

    const parsePMIDAuthors = (authors)=> {
        let text="";

        authors.map( a => { 
            text+=(text!='')?", "+a.name:a.name;
        })

        return text;
    }

    const parsePMIDdoi = (ids) => {
        let doi=''
        
        ids.map( articleid => {
            if(articleid.idtype==='doi')
                doi=articleid.value

        })
        return doi;
    }

    const parseFromPMID = (metadata) => {
        let obj={}

        let pubtype=metadata.pubtype?metadata.pubtype.toString().toLowerCase():null;
        
        obj={
            pmid: metadata.uid,
            pub_title: metadata.fulljournalname?metadata.fulljournalname:metadata.booktitle?metadata.booktitle:'',
            part_title: metadata.title,
            part_authors: metadata.authors?parsePMIDAuthors(metadata.authors):'',
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
    }

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

    useEffect( () => {
        if(importedreference && Object.keys(importedreference).length>0)
        {
        console.log("PARSING importedreference",importedreference)
                    //mapping data
                    
                    let newref={}

                    if(importedreference.fromDOI && Object.keys(importedreference.fromDOI).length>0)
                        newref=parseFromDOI(importedreference.fromDOI);
                    else if(importedreference.fromPMID && Object.keys(importedreference.fromPMID).length>0)
                        newref=parseFromPMID(importedreference.fromPMID);
                        
                    setRefData(newref) 

                    //Clean importedreference (altrimenti se andavo in nuovo riferimento mi proponeva i dati precedenti)
                    dispatch(cleanImportedreference())

                    //+ modificare redux in modo da creare importreference={ fromDoi: {}, fromPMID:{} }
        }
        
    }, [importedreference])

    async function deleteReference (id) {
        let conf = await confirm({
             title: intl.formatMessage({id: 'app.global.confirm'}),
             // message: intl.formatMessage(messages.askRemoveLabelMessage),
             message: "Remove Reference",
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
        return (ref.patronrequests==0)
    }

    const findReferenceBySearchParams = (query) => {
        console.log("findReferenceBySearchParams:", query)
        let doi=query.match(/\b((10\.\d{4,9}\/[-._;()/:A-Z0-9a-z]+))/);
        if(doi!=null)
        {
            console.log("DOI MATCH!",doi[0])
            dispatch(requestFindReferenceByDOI(doi[0]))
        }
        
        let pmid=query.match(/\b(\d{7,})\b/)
        if(pmid!=null)
        {
            console.log("PMID MATCH!",pmid[0])
            dispatch(requestFindReferenceByPMID(pmid[0]))
        }
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
                />
                )
            }
            {!isNew && ( 
                params.op && params.op=="edit" &&
                    (canEdit(reference) && <ReferencesForm 
                        messages={messages}
                        reference={reference}
                        labelsOptionList={labelsOptionList}
                        groupsOptionList={groupsOptionList}
                        applyLabels={applyLabelsToReferences}
                        applyGroups={applyGroupsToReferences}
                        deleteReference={(id) => deleteReference(id)}
                        removeLabel={(id, labelId) => dispatch(requestRemoveReferenceLabel(id,labelId, 'removeLabel' ))}
                        removeGroup={(id, groupId) => dispatch(requestRemoveReferenceGroup(id,groupId,'removeGroup'))}
                        updateReference={ (formData) => dispatch(requestUpdateReferences(formData, params.id, intl.formatMessage(messages.referenceUpdate))) } 
                        history={props.history}
                        />
                        || 
                        <ErrorMsg message="ERROR: can't edit this reference"/>)
                ||
                isRequest && isMounted &&
                    /*(canRequest(reference) &&*/ <ReferenceRequest
                        messages={messages}
                        reference={reference} 
                        libraryOptionList={libraryOptionList}
                        deliveryOptionList={deliveryOptionList}
                        libraryOnChange={libraryOnChange}
                        submitCallBack={submitReferenceRequest}
                        history={props.history}
                    /> /*
                        || 
                    <ErrorMsg message="ERROR: can't request this reference"/>
                    )*/
                ||
                    <div className="detail">
                        <SectionTitle 
                            back={true}
                            title={messages.headerDetail}
                        />
                        <ReferenceDetail 
                            messages={messages}
                            reference={reference} 
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