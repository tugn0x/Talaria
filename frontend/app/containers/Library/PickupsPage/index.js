import React, {useEffect} from 'react'
import {useIntl} from 'react-intl'
import makeSelectLibrary, {isLibraryLoading} from '../selectors';
import {requestPickupList} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PickupsList from '../../../components/Library/PickupsList';
import messages from './messages'
import confirm from "reactstrap-confirm";
 
const PickupsPage = (props) => {
    console.log('PickupsPage', props)
    const {dispatch, isLoading, match, library, history} = props    
    const pickupsList = library.pickupsList.data
    const pagination = library.pickupsList.pagination       

    const editPath='/library/'+match.params.library_id+"/delivery/:id/:op?";

    const intl = useIntl()
    
    useEffect(() => {  
            dispatch(requestPickupList(match.params.library_id))                        
    }, [])
     
          
    return (
            <PickupsList 
                sectionTitle={messages.header}
                data={pickupsList}                               
                loading={isLoading}
                pagination={pagination}
                history={history}                
                match={match}   
                editPath={editPath}                                        
                updatePickup={()=>alert("updatePickup()!")}
                deletePickup={()=>alert("deletePickup()!")}
                changePickupStatus={()=>alert("changePickupStatus()!")}
            />        
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

export default compose(withConnect)(PickupsPage);