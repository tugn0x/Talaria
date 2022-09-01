import React, {useEffect, useState} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectPatron, {isPatronLoading} from '../selectors';
import {ReferenceForm,Loader} from 'components';
import ReferenceDetail from 'components/Patron/ReferenceDetail';
import ReferenceRequest from 'components/Patron/ReferenceRequest';
import {requestPostReferences,requestUpdateReferences,
        requestMyActiveLibrariesOptionList, requestLabelsOptionList, 
        requestGroupsOptionList, requestApplyLabelsToReferences, 
        requestApplyGroupsToReferences, requestRemoveReferenceLabel,
        requestRemoveReferenceGroup, requestDeleteReference,requestGetLibraryDeliveries,requestPostRequest,
        requestRemoveLabel} from '../actions'
import messages from './messages';
import confirm from "reactstrap-confirm";
import SectionTitle from 'components/SectionTitle';
import {useIntl} from 'react-intl';
import ErrorMsg from '../../../components/ErrorMsg';
import {parseOpenURL,parsePubmedReference} from '../../../utils/openurl';
import makeSelectReference, { isReferenceLoading } from '../../Reference/selectors';
import {requestGetReference,requestFindReferenceById} from '../../Reference/actions';

/* TODO 
   - find per ISBN ...
*/

const ReferencesPage = (props) => {
    console.log('ReferencesPage', props)
    const {dispatch, isLoading,isReferenceLoading, match, patron,reference} = props
    const {params} = match    
    const intl = useIntl();
    const isNew = !params.id || params.id === 'new'
    const isRequest = params.id && params.op=="request"    
    const labelsOptionList = patron.labelsOptionList;
    const groupsOptionList = patron.groupsOptionList;
    const libraryOptionList= patron.libraryOptionList;
    const deliveryOptionList= patron.deliveryOptionList;
    
    const queryString=window.location.search;
    const byOpenUrl=(new URLSearchParams(queryString)).get("byopenurl")
    const byPubmed=( (new URLSearchParams(queryString)).get("sid")=='Entrez:PubMed')?true:false;
    
    const [isMounted, setIsMounted] = useState(false);    
    const [OALink,setOALink] = useState('');
    const [refData,setRefData] = useState(null);      

    useEffect(() => {                
        setRefData(null)     
        setIsMounted(true)             
    }, [])

    //import by OpenURL
    useEffect(() => {
        if(byOpenUrl && byOpenUrl!="" && queryString!="")        
        {
            if(byPubmed)
            {
                //get pmid from url and call OAbutton API to get metadata from pmid
                let id=(new URLSearchParams(queryString)).get("id").replace('pmid:','');
                dispatch(requestFindReferenceById(id));                
            }        
            else
            {
                console.log("PARSING OPENURL",queryString)
                let newref=parseOpenURL(queryString);                

                //add extra fields
                let oalink=(new URLSearchParams(queryString)).get("oa_link");
                if(oalink!=null && oalink!="")
                    newref["oa_link"]=decodeURIComponent(oalink);

                setRefData({...newref});  
                
            }
        }
    }, [byOpenUrl])
   
    useEffect(() => {        
        if(isNew && byPubmed && reference && Object.keys(reference).length>0)        
        {
            //PROBLEMA: i campi restituiti da pubmed non sono uguali a 
            //quelli di refdata quindi occorre mapping ....           
            //mentre quelli dell'openurl sono praticamente gli stessi
            
            //parsePubmed data
            console.log("PARSING PUBMED",reference)
            let pubmedref=parsePubmedReference(reference)
            setRefData({...pubmedref})       
        }
        else 
        if(!isNew && reference && Object.keys(reference).length>0 )
            setRefData({...reference})       
    }, [reference])


    useEffect(() => {
        if(props.isLogged && !isNew && !isReferenceLoading){
           dispatch(requestGetReference(params.id));
        }
        if(props.isLogged && !isLoading){
            dispatch(requestLabelsOptionList());
            dispatch(requestGroupsOptionList());
        }
        
    }, [params.id])

    useEffect(() => {
       if(props.isLogged && isRequest && !isLoading)
           dispatch(requestMyActiveLibrariesOptionList())
    }, [isRequest])

    const foundReference = (newref) => {
        console.log("foundReference:",newref)
        if(isMounted && newref)
        {
                if(refData!=null)
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
        }
    }


    async function deleteReference (id) {
        let conf = await confirm({
             title: intl.formatMessage({id: 'app.global.confirm'}),             
             message: intl.formatMessage({id: 'app.global.deleteMessage'}),
             confirmText: intl.formatMessage({id: 'app.global.yes'}),
             cancelText: intl.formatMessage({id: 'app.global.no'})
         }); //
         if(conf)
             dispatch(requestDeleteReference(id,intl.formatMessage({id: 'app.global.deletedMessage'})))
     }
     
    const applyLabelsToReferences = (labelIds,refIds) => {
        dispatch(requestApplyLabelsToReferences(refIds,[labelIds],intl.formatMessage({id:'app.containers.ReferencePage.addedLabelToReference'}), true))
     }
    const applyGroupsToReferences = (labelIds,refIds) => {
        dispatch(requestApplyGroupsToReferences(refIds,[labelIds],intl.formatMessage({id:'app.containers.ReferencePage.addedGroupToReference'}), true))
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

    

    async function removeLabelFromReference (id,labelId, filter) {
        //console.log("DISPATCH removeLabelFromReference",id,labelId);
         let conf = await confirm({
             title: intl.formatMessage({id: 'app.global.confirm'}),
             message: intl.formatMessage({id: "app.references.askRemoveLabelMessage"}),
             confirmText: intl.formatMessage({id: 'app.global.yes'}),
             cancelText: intl.formatMessage({id: 'app.global.no'})
         }); //
         if(conf)
             dispatch(requestRemoveReferenceLabel(id,labelId,intl.formatMessage({id: "app.global.deletedMessage"}), filter))
     }
 
     async function removeGroupFromReference (id,groupId, filter) {
         //console.log("DISPATCH removeGroupFromReference",id,groupId);
         let conf = await confirm({
             title: intl.formatMessage({id: 'app.global.confirm'}),
             message: intl.formatMessage({id: "app.references.askRemoveGroupMessage"}),
             confirmText: intl.formatMessage({id: 'app.global.yes'}),
             cancelText: intl.formatMessage({id: 'app.global.no'})
         }); //
          if(conf)
              dispatch(requestRemoveReferenceGroup(id,groupId,intl.formatMessage({id: "app.global.deletedMessage"}), filter))
      }

    
    
    return (
        <Loader show={isReferenceLoading}>
            {isNew && isMounted && (
                <>
                    <SectionTitle 
                    back={false}
                    title={messages.headerNew}
                    />  
                    <ReferenceForm
                        clearButton={(isNew||byOpenUrl||byPubmed)?true:false}
                        importReference={refData}
                        createReference={ (formData) => dispatch(requestPostReferences(formData, intl.formatMessage(messages.referenceAdded))) } 
                        onFoundReference={foundReference}
                        labelsOptionList={labelsOptionList}
                        groupsOptionList={groupsOptionList}
                        /*findOA={ (formData) => findOA({title: formData.pub_title, doi:formData.doi,pmid:formData.pmid}) }
                        OALink={OALink}*/
                    />
                </>
                )
            }
            {!isNew && isMounted && refData && ( 
                params.op && params.op=="edit" &&
                    (canEdit(refData/*reference*/) && 
                    <>                     
                    <SectionTitle 
                        back={false}
                        title={messages.headerEdit}
                    /> 
                    <ReferenceForm 
                        clearButton={(isNew||byOpenUrl||byPubmed)?true:false}
                        reference={refData/*reference*/}
                        labelsOptionList={labelsOptionList}
                        groupsOptionList={groupsOptionList}
                        applyLabels={applyLabelsToReferences}
                        applyGroups={applyGroupsToReferences}
                        deleteReference={(id) => deleteReference(id)}
                        removeLabel={(labelId)=> removeLabelFromReference(refData.id,labelId)}
                        removeGroup={(groupId)=> removeGroupFromReference(refData.id,groupId)}
                        updateReference={ (formData) => dispatch(requestUpdateReferences(formData, params.id, intl.formatMessage(messages.referenceUpdate))) } 
                        /*findOA={ (formData) => findOA({title: formData.pub_title, doi:formData.doi,pmid:formData.pmid}) }
                        OALink={OALink}*/
                        history={props.history}
                        />
                    </>
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
    patron: makeSelectPatron(),
    isReferenceLoading: isReferenceLoading(),
    reference: makeSelectReference()
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