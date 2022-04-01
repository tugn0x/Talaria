import React, {useEffect, useState} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectLibrary, {isLibraryLoading} from '../selectors';
import {ReferenceForm,Loader} from 'components';
import BorrowingDetail from '../../../components/Library/BorrowingDetail';

import {requestLibraryTagsOptionList, requestPostNewBorrowing,requestGetBorrowing,requestUpdateBorrowing,requestChangeStatusBorrowing,requestGetLibrariesList} from '../actions'

import {requestFindReferenceById} from '../../Reference/actions';

import messages from './messages';
import SectionTitle from 'components/SectionTitle';
import {useIntl} from 'react-intl';
import {parseOpenURL,parsePubmedReference} from '../../../utils/openurl';
import makeSelectReference from '../../Reference/selectors';

const BorrowingRequestPage = (props) => {
    console.log('BorrowingRequestPage', props)
    const {dispatch, isLoading, match, library,reference} = props
    const {params} = match       
    const intl = useIntl();
    const isNew = !params.id || params.id === 'new'    
    const isRequest = !isNew && params.id>0        
    const isEdit= params.id>0 && params.op && params.op==='edit' 
    const isRequesting=params.op && params.op==='request'
    const isDelivering=params.op && params.op==='deliver'
    const borrowing=library.borrowing
    const lendersList=library.libraryOptionList;
    //const tagsOptionList=library.tagsOptionList
    
    const queryString=window.location.search;
    const byOpenUrl=(new URLSearchParams(queryString)).get("byopenurl")
    const byPubmed=( (new URLSearchParams(queryString)).get("sid")=='Entrez:PubMed')?true:false;
    
    const [isMounted, setIsMounted] = useState(false);    
    const [OALink,setOALink] = useState('');
    const [refData,setRefData] = useState(null);      
    const [reqData,setReqData] = useState(null);     
    
    const requestDetailPath='/library/'+params.library_id+"/borrowing/:id/:op?";
    

    useEffect(() => {                
        //setRefData(null)           
        setIsMounted(true)     
        if(props.isLogged){
            dispatch(requestLibraryTagsOptionList(match.params.library_id))
        }        
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
                if(oalink && oalink!=null && oalink!="")
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
        if(props.isLogged && isRequest && !isNew){            
            dispatch(requestGetBorrowing(params.id,match.params.library_id));
        }        
        
    }, [params.id])

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

    const sendRequestToLender = (requestfields,filter) => {
        
        console.log("CALL sendRequestToLender",requestfields)
        dispatch(requestChangeStatusBorrowing(params.id,match.params.library_id,'requested',requestfields,intl.formatMessage({id: "app.requests.requestedMessage"}),filter))    
    }

    const findLender = (options) => {
        console.log("findLender",options)        
        //todo dispatch (filtered by option, cat ...) ...
        dispatch(requestGetLibrariesList(1,null,'profile_type',2)) //filtered by lender only
    }

    const directUnfillCallback=(requestfields,filter=null) => {
        console.log("Direct Unfill to patron",requestfields)
        dispatch(requestChangeStatusBorrowing(params.id,match.params.library_id,'notDeliveredToUserDirect',requestfields,intl.formatMessage({id: "app.requests.unfilledToPatronMessage"}),filter))            
    }
    
    const unfillCallback=(requestfields,filter=null) => {
        console.log("Unfill to patron",requestfields)
        dispatch(requestChangeStatusBorrowing(params.id,match.params.library_id,'notDeliveredToUser',requestfields,intl.formatMessage({id: "app.requests.unfilledToPatronMessage"}),filter))            
    }

    const directFulfillCallback=(requestfields) => {console.log("Direct fulfill to patron",requestfields)}

    const fulfillCallback=(requestfields,filter) => {
        console.log("Fulfill to patron",requestfields)
        dispatch(requestChangeStatusBorrowing(params.id,match.params.library_id,'deliveredToUser',requestfields,intl.formatMessage({id: "app.requests.fulfilledToPatronMessage"}),filter))            
    
    }
 
    const deliverCallback=(requestfields,filter) => {
        console.log("Deliver to desk",requestfields)
        let st=""

        if(requestfields.desk_delivery_format=='2') //2=paper
            st="deliveringToDesk" 

        else if(requestfields.desk_delivery_format=='1') //file to print
            st="deskReceived"

        
        dispatch(requestChangeStatusBorrowing(params.id,match.params.library_id,st,requestfields,intl.formatMessage({id: "app.requests.deliveredToDeskMessage"}),filter))                 
    }

    return (
        <Loader show={isLoading}>
            <div className="detail">
                <SectionTitle 
                    back={isNew?false:true}
                    title={isNew?messages.headerNew:messages.headerDetail}
                />                 
                {(isRequest && !isEdit && Object.keys(borrowing).length>0) &&                                 
                    <BorrowingDetail requestDetailPath={requestDetailPath} history={props.history} data={borrowing} sendRequestToLender={sendRequestToLender} findLender={findLender} lendersList={lendersList} isDelivering={isDelivering} isRequesting={isRequesting} directUnfillCallback={directUnfillCallback} unfillCallback={unfillCallback} directFulfillCallback={directFulfillCallback} fulfillCallback={fulfillCallback} deliverCallback={deliverCallback}/>                      
                ||
                (isNew && isMounted) &&                 
                <ReferenceForm    
                    importReference={refData}
                    createReference={ (formData) => {dispatch(requestPostNewBorrowing(match.params.library_id,formData,intl.formatMessage({id: "app.global.createdMessage"})))} } 
                    onFoundReference={foundReference}                                      
                />                                
                || (isEdit && isMounted && Object.keys(borrowing).length>0) && 
                <ReferenceForm
                    reference={borrowing.reference.data}                    
                    updateReference={ (formData) => {dispatch(requestUpdateBorrowing(borrowing.id,match.params.library_id,{'reference': formData},intl.formatMessage({id: "app.global.updatedMessage"})))} } 
                    history={props.history}
                    />                
                }            
            {/*!isNew && isMounted && refData && ( 
                params.op && params.op=="edit" &&
                    (canEdit(refData) && <ReferenceForm                         
                        reference={refData}
                        labelsOptionList={labelsOptionList}
                        groupsOptionList={groupsOptionList}
                        applyLabels={applyLabelsToReferences}
                        applyGroups={applyGroupsToReferences}
                        deleteReference={(id) => deleteReference(id)}
                        removeLabel={(labelId)=> removeLabelFromReference(refData.id,labelId)}
                        removeGroup={(groupId)=> removeGroupFromReference(refData.id,groupId)}
                        updateReference={ (formData) => dispatch(requestUpdateReferences(formData, params.id, intl.formatMessage(messages.referenceUpdate))) }                         
                        history={props.history}
                        />
                        || 
                        <ErrorMsg cssclass="alert-danger" message="ERROR: can't edit this reference"/>)
                ||
                isRequest && isMounted && refData &&
                    <ReferenceRequest
                        messages={messages}
                        reference={refData} 
                        libraryOptionList={libraryOptionList}
                        deliveryOptionList={deliveryOptionList}
                        libraryOnChange={libraryOnChange}
                        submitCallBack={submitReferenceRequest}
                        history={props.history}                       
                    /> 
                ||
                isMounted && refData && <div className="detail">
                        <SectionTitle 
                            back={true}
                            title={messages.headerDetail}
                        />                        
                        <ReferenceDetail                             
                            reference={refData} 
                            deleteReference={(id) => deleteReference(id)}
                        />
                    </div>
                )
            */}
            </div>
        </Loader>
    )
}

const mapStateToProps = createStructuredSelector({
    isLoading: isLibraryLoading(),
    library: makeSelectLibrary(),
    reference: makeSelectReference(),    
    /*isRefLoading: isReferenceLoading()*/
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
  
export default compose(withConnect)(BorrowingRequestPage);