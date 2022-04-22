import React, {useEffect} from 'react'
import {useIntl} from 'react-intl'
import makeSelectLibrary, {isLibraryLoading} from '../selectors';
import {requestBorrowingToDeliverList,requestChangeStatusDelivery} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import DeliveryList from '../../../components/Library/DeliveryList';
import messages from './messages'
import confirm from "reactstrap-confirm";

const DeliveryPage = (props) => {
    console.log('DeliveryPage', props)
    const {dispatch, isLoading, match, library, history} = props    
    const borrowingsList = library.borrowingsList.data
    const pagination = library.borrowingsList.pagination       

    const editPath='/library/'+match.params.library_id+"/delivery/:id/:op?";

    const intl = useIntl()
    
    useEffect(() => {        
            dispatch(requestBorrowingToDeliverList(match.params.library_id,1,null,null,{}))                                
    }, [])

     async function setDeskReceivedRequest (id,filter) {
        console.log("DISPATCH setDeskReceivedRequest",id);
         let conf = await confirm({
            title: intl.formatMessage({id: 'app.global.confirm'}),
             message: intl.formatMessage({id: "app.requests.askDeskReceivedMessage"}),
             confirmText: intl.formatMessage({id: 'app.global.yes'}),
             cancelText: intl.formatMessage({id: 'app.global.no'})
         }); 

         if(conf)
             dispatch(requestChangeStatusDelivery(id,match.params.library_id,1,'deskReceived',null,intl.formatMessage({id: "app.requests.setDeskReceivedMessage"}),filter))        
     } 

     async function setDeskNotReceivedRequest (id,filter) {
        console.log("DISPATCH setDeskNotReceivedRequest",id);
         let conf = await confirm({
            title: intl.formatMessage({id: 'app.global.confirm'}),
             message: intl.formatMessage({id: "app.requests.askDeskNotReceivedMessage"}),
             confirmText: intl.formatMessage({id: 'app.global.yes'}),
             cancelText: intl.formatMessage({id: 'app.global.no'})
         }); 

         if(conf)
             dispatch(requestChangeStatusDelivery(id,match.params.library_id,1,'deskNotReceived',null,intl.formatMessage({id: "app.requests.setDeskNotReceivedMessage"}),filter))        
     } 

     async function deliverToUser (id,direct,filter) {
        console.log("DISPATCH deliverToUser")
        let conf = await confirm({
            title: intl.formatMessage({id: 'app.global.confirm'}),
             message: intl.formatMessage({id: "app.requests.askFulfillToPatronMessage"}),
             confirmText: intl.formatMessage({id: 'app.global.yes'}),
             cancelText: intl.formatMessage({id: 'app.global.no'})
         }); 

         let status=(direct?'deliveredToUserDirect':'deliveredToUser');

         //NB: è lo statusChange di laravel che imposterà notfulfill_type=3 (user not taken)
         if(conf)
             dispatch(requestChangeStatusDelivery(id,match.params.library_id,1,status,null,intl.formatMessage({id: "app.requests.fulfilledToPatronMessage"}),filter))        
    }

    async function userNotTaken (id,direct,filter) {
        console.log("DISPATCH userNotTaken")        
         let conf = await confirm({
            title: intl.formatMessage({id: 'app.global.confirm'}),
             message: intl.formatMessage({id: "app.requests.askDeskUserNotTakenMessage"}),
             confirmText: intl.formatMessage({id: 'app.global.yes'}),
             cancelText: intl.formatMessage({id: 'app.global.no'})
         }); 

         let status=(direct?'notDeliveredToUserDirect':'notDeliveredToUser');

         //NB: è lo statusChange di laravel che imposterà notfulfill_type=3 (user not taken)
         if(conf)
             dispatch(requestChangeStatusDelivery(id,match.params.library_id,1,status,null,intl.formatMessage({id: "app.requests.unfilledToPatronMessage"}),filter))                     
    }

    

     
     
          
    return (
        <>
            <div className="alert alert-danger">
                DEBUG: STO FILTRANDO PER delivery_id=1                
            </div>
            <DeliveryList 
                sectionTitle={messages.header}                
                data={borrowingsList}                               
                loading={isLoading}
                pagination={pagination}
                history={history}                                              
                match={match}   
                editPath={editPath}             
                searchOptions={{
                    getSearchList: (page, pageSize, searchFilter ) => {
                        history.push(match.url)
                        searchFilter={...searchFilter,archived:archive}
                        dispatch(requestBorrowingToDeliverList(match.params.library_id,null,page, pageSize, searchFilter))
                    },
                    searchOnChange: true
                }}                
                setDeskReceivedRequest={setDeskReceivedRequest} 
                setDeskNotReceivedRequest={setDeskNotReceivedRequest}                         
                deliverToUser={deliverToUser}
                userNotTaken={userNotTaken}                
            />
          </>  
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

export default compose(withConnect)(DeliveryPage);