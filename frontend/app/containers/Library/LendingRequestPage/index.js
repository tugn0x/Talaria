import React, {useEffect, useState} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectLibrary, {isLibraryLoading} from '../selectors';
import {ReferenceForm,Loader} from 'components';
import LendingDetail from '../../../components/Library/LendingDetail';

import {requestLibraryTagsOptionList, requestPostNewBorrowing,requestGetBorrowing,requestUpdateBorrowing,requestChangeStatusBorrowing,requestGetLibrariesList,requestChangeLendingArchived, requestChangeStatusLending} from '../actions'

import {requestFindReferenceById} from '../../Reference/actions';

import messages from './messages';
import SectionTitle from 'components/SectionTitle';
import {useIntl} from 'react-intl';
import {parseOpenURL,parsePubmedReference} from '../../../utils/openurl';
import makeSelectReference from '../../Reference/selectors';

const LendingRequestPage = (props) => {
    console.log('LendingRequestPage', props)
    const {dispatch, isLoading, match, library,reference} = props
    const {params} = match       
    const intl = useIntl();
    const isNew = !params.id || params.id === 'new'    
    const isRequest = !isNew && params.id>0        
    const isEdit= params.id>0 && params.op && params.op==='edit' 
    const lending=library.borrowing
    const lendersList=library.libraryOptionList;

    
    ///const tagsOptionList=library.tagsOptionList
    
    const queryString=window.location.search;
    const byOpenUrl=(new URLSearchParams(queryString)).get("byopenurl")
    const byPubmed=( (new URLSearchParams(queryString)).get("sid")=='Entrez:PubMed')?true:false;
    
    const [isMounted, setIsMounted] = useState(false);    
    const [OALink,setOALink] = useState('');
    const [refData,setRefData] = useState(null);      
    const [reqData,setReqData] = useState(null);          

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
                if(oalink!=null && oa_link!="")
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

    const FulfillLendingRequestStatus = (data) => {

        data.lending_status="copyCompleted";
        dispatch(requestChangeStatusLending(data.id, data.lending_library_id, data.lending_status,"",""))
        dispatch(requestChangeLendingArchived(data.id, data.lending_library_id, data.lending_archived,"",""))
    }

    const unFulfillLendingRequestStatus = (data) => {

        data.lending_status="unFilled";
        dispatch(requestChangeStatusLending(data.id, data.lending_library_id, data.lending_status,"",""))
        dispatch(requestChangeLendingArchived(data.id, data.lending_library_id, data.lending_archived,"",""))
    }

    const sendRequestToLender = (lender,filter) => {
        console.log("sendRequestToLender",lender)
        let lid=lender[0]; //DEBUG:prendo solo il primo !!
        
        let extrafields={            
                'lending_library_id': lid            
        }
        dispatch(requestChangeStatusBorrowing(params.id,match.params.library_id,'requested',extrafields,intl.formatMessage({id: "app.requests.requestedMessage"}),filter))    
    }

    const findLender = (options) => {
        console.log("findLender",options)        
        //todo dispatch (filtered by option, cat ...) ...
        dispatch(requestGetLibrariesList())
    }

    return (
        <Loader show={isLoading}>
            <div className="detail">
                <SectionTitle 
                    back={isNew?false:true}
                    title={isNew?messages.headerNew:messages.headerDetail}
                />            
                {(isRequest && !isEdit && Object.keys(lending).length>0) &&                                 
                    <LendingDetail history={props.history} data={lending} FulfillLendingRequestStatus={FulfillLendingRequestStatus} unFulfillLendingRequestStatus={unFulfillLendingRequestStatus} sendRequestToLender={sendRequestToLender} findLender={findLender} lendersList={lendersList} />                      
                ||
                (isNew && isMounted) &&                 
                <ReferenceForm    
                    importReference={refData}
                    createReference={ (formData) => {dispatch(requestPostNewBorrowing(match.params.library_id,formData,intl.formatMessage({id: "app.global.createdMessage"})))} } 
                    onFoundReference={foundReference}                                      
                />                                
                || (isEdit && isMounted && Object.keys(lending).length>0) && 
                <ReferenceForm
                    reference={borrowing.reference.data}                    
                    updateReference={ (formData) => {dispatch(requestUpdateBorrowing(borrowing.id,match.params.library_id,{'reference': formData},intl.formatMessage({id: "app.global.updatedMessage"})))} } 
                    history={props.history}
                    />                
                }            
          
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
  
export default compose(withConnect)(LendingRequestPage);