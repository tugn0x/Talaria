import React, {useEffect, useState} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectLibrary, {isLibraryLoading} from '../selectors';
import {Loader} from 'components';
import LendingDetail from '../../../components/Library/LendingDetail';
import {requestLibraryTagsOptionList, requestGetLending, requestChangeStatusLending} from '../actions'
import messages from './messages';
import SectionTitle from 'components/SectionTitle';
import {useIntl} from 'react-intl';
import makeSelectReference from '../../Reference/selectors';

const LendingRequestPage = (props) => {
    console.log('LendingRequestPage', props)
    const {dispatch, isLoading, match, library,reference} = props
    const {params} = match       
    const intl = useIntl();
    const isNew = !params.id || params.id === 'new'    
    const isRequest = !isNew && params.id>0        
    const isEdit= params.id>0 && params.op && params.op==='edit' 
    const lending=library.lending
    const lendersList=library.libraryOptionList;
    const [isMounted, setIsMounted] = useState(false);    
   
 
    useEffect(() => {                
        //setRefData(null)           
        setIsMounted(true)     
        if(props.isLogged){
            dispatch(requestLibraryTagsOptionList(match.params.library_id))
        }        
    }, [])


    useEffect(() => {       
        if(props.isLogged && isRequest){            
            dispatch(requestGetLending(params.id,match.params.library_id));
        }        
    }, [params.id])

    const FulfillLendingRequestStatus = (data) => {
        data.lending_status="copyCompleted";
        dispatch(requestChangeStatusLending(data.id, data.lending_library_id, data.lending_status,intl.formatMessage({id: "app.requests.fulfilledMessage"}),""))
    }

    const unFulfillLendingRequestStatus = (data) => {
        data.lending_status="unFilled";
        dispatch(requestChangeStatusLending(data.id, data.lending_library_id, data.lending_status,intl.formatMessage({id: "app.requests.unFilledMessage"}),""))
    }


    return (
        <Loader show={isLoading}>
            <div className="detail">
                <SectionTitle 
                    back={isNew?false:true}
                    title={isNew?messages.headerNew:messages.headerDetail}
                />            
                {(Object.keys(lending).length>0) &&                                 
                    <LendingDetail history={props.history} data={lending} FulfillLendingRequestStatus={FulfillLendingRequestStatus} unFulfillLendingRequestStatus={unFulfillLendingRequestStatus}  lendersList={lendersList} />                      
                }            
            </div>
        </Loader>
    )
}

const mapStateToProps = createStructuredSelector({
    isLoading: isLibraryLoading(),
    library: makeSelectLibrary(),
    reference: makeSelectReference(),    
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