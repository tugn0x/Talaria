import React, {useEffect, useState} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectLibrary, {isLibraryLoading} from '../selectors';
import {Loader} from 'components';
import PickupForm from '../../../components/Library/PickupForm';

import {requestPickup} from '../actions'


import messages from './messages';
import SectionTitle from 'components/SectionTitle';
import {useIntl} from 'react-intl';

const PickupPage = (props) => {
    console.log('PickupPage', props)
    const {dispatch, isLoading, library,match} = props
    const {params} = match       
    const intl = useIntl();
    const isNew = !params.id || params.id === 'new'           
    const isEdit= params.id>0 && params.op && params.op==='edit' 
    const pickup=library.pickup
    
    
    const [isMounted, setIsMounted] = useState(false);    
    const [pickupData,setPickupData] = useState(null);      
    
    const pickupEditPath='/library/'+params.library_id+"/manage/pickup/:id/:op?";
    

  useEffect(() => {
    //if(!isLoading && !isNew && Object.keys(pickup).length === 0) {
      dispatch(requestPickup(params.library_id, params.id))
    //}
   }, [/*isLoading*/])
    

    return (
        <Loader show={isLoading}>
            <div className="detail">
                <SectionTitle 
                    back={isNew?false:true}
                    title={isNew?messages.headerNew:messages.headerEdit}
                />                 
                {
                (isNew && isMounted) &&                 
                <PickupForm                        
                    submitForm={ (formData) => {dispatch(requestPostNewPickup(match.params.library_id,formData,intl.formatMessage({id: "app.global.createdMessage"})))} }                     
                />                                
                || (isEdit && isMounted && Object.keys(pickup).length>0) && 
                <PickupForm                   
                    submitForm={ (formData) => {dispatch(requestUpdateBorrowing(pickup.id,match.params.library_id,formData,intl.formatMessage({id: "app.global.updatedMessage"})))} } 
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
  
export default compose(withConnect)(PickupPage);