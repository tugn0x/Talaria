import React, {useEffect} from 'react'
import {useIntl} from 'react-intl'
import makeSelectLibrary, {isLibraryLoading} from '../selectors';
import {requestLendingsList,requestLibraryTagsOptionList,requestApplyTagsToDDRequests, requestApplyLendingTagsToDDRequests, requestRemoveDDRequestTag, requestChangeStatusLending,requestAcceptAllLenderLendingSaga, requestChangeLendingArchived, requestAcceptAllLenderLending, FulfillLendingRequestStatus, unFulfillLendingRequestStatus} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import LendingList from '../../../components/Library/LendingList';
import messages from './messages'
import confirm from "reactstrap-confirm";

const LendingPage = (props) => {
    console.log('LendingPage', props)
    const {dispatch, isLoading, match, library, history} = props
    const archive=props.match.path.includes("archive")?1:0;
    const lendingList = library.lendingsList.data
    const pagination = library.lendingsList.pagination   
    const tagsOptionList=library.tagsOptionList
    const oaloading = library.lendingsList.oaloading
    const allrequests = props.match.path.includes("allrequests")?1:0;
    //alert(allrequests)
    //alert(archive)
    const editPath='/library/'+match.params.library_id+"/lending/:id/:op?";

    const intl = useIntl()
    
    useEffect(() => {  
        //if(isLoading) {
       
            dispatch(requestLendingsList(match.params.library_id,null,null,{lending_archived:archive, all_lender:allrequests}))            
            dispatch(requestLibraryTagsOptionList(match.params.library_id))
        //}
    }, [])

    //const applyTagsToDDRequests = (tagIds,reqIds) => {
    //    dispatch(requestApplyTagsToDDRequests(match.params.lending_library_id,reqIds,[tagIds],'etichetta applicata'))
    // }

     const applyTagsToDDRequests = (tagIds,reqIds) => { 
        dispatch(requestApplyTagsToDDRequests(match.params.lending_library_id,reqIds,[tagIds],intl.formatMessage({id:'app.containers.BorrowingPage.addedTagToRequest'})))
     }
    
    const applyLendingTagsToDDRequests = (tagIds,reqIds) => { 
        dispatch(requestApplyLendingTagsToDDRequests(match.params.library_id,reqIds,[tagIds],intl.formatMessage({id:'app.containers.BorrowingPage.addedTagToRequest'})))
     }
    
    const UpdateLendingRequestStatus = (data) => {
        
        //alert(match.params.library_id)
        //if (data.lending_status == 'pendingRequest') 
        //    {
                //alert(JSON.stringify(data.lending_status))
                //data.lending_status="requestReceived"
                dispatch(requestChangeStatusLending(data.id, match.params.library_id, data.lending_status,"",""))
               //dispatch(requestAcceptAllLenderLendingSaga(data.id, match.params.library_id, data.lending_status,"",""));
        //    }
    }

    const UpdateLendingArchivedStatus = (data) => {
        dispatch(requestChangeLendingArchived(data.id, match.params.library_id, data.lending_archived,"",""))
    }

    const UpdateLendingAcceptRequest = (data) => {
       //alert('Request Accepted');
       data.lending_status="pendingRequest";
       dispatch(requestAcceptAllLenderLending(data.id,  match.params.library_id, data.lending_status,"",""))
    }
    async function removeTagFromDDRequest (id,tagId, filter) {        
         let conf = await confirm({
             title: intl.formatMessage({id: 'app.global.confirm'}),
             message: intl.formatMessage({id: "app.requests.askRemoveTagMessage"}),
             confirmText: intl.formatMessage({id: 'app.global.yes'}),
             cancelText: intl.formatMessage({id: 'app.global.no'})
         }); //
         if(conf)
         {
             dispatch(requestRemoveDDRequestTag(match.params.library_id,id,tagId,intl.formatMessage({id: "app.global.removedMessage"}), filter))
         }
     }

    return (
        <>
        
            { <LendingList 
                sectionTitle={archive==1?messages.headerArchive:messages.header}
                data={lendingList}                               
                loading={isLoading}
                pagination={pagination}
                history={history}                
                tagsOptionList={tagsOptionList}                
                match={match}   
                editPath={editPath}             
                searchOptions={{
                    getSearchList: (page, pageSize, searchFilter ) => {
                        history.push(match.url)
                        searchFilter={...searchFilter,archived:archive}
                        dispatch(requestLendingsList(match.params.library_id,page, pageSize, searchFilter))
                    },
                    searchOnChange: true
                }}                
                //removeTagFromRequest={archive==1?undefined:removeTagFromDDRequest}                
                //deleteReference={deleteReference}
                removeTagFromRequest={removeTagFromDDRequest}                
                FulfillLendingRequestStatus={FulfillLendingRequestStatus}
                unFulfillLendingRequestStatus={unFulfillLendingRequestStatus}
                //applyTags={archive==1?undefined:applyTagsToDDRequests}
                applyTags={applyLendingTagsToDDRequests}
                UpdateLendingRequestStatus={UpdateLendingRequestStatus}
                UpdateLendingArchivedStatus={UpdateLendingArchivedStatus}
                UpdateLendingAcceptRequest={UpdateLendingAcceptRequest}
                
                oaloading={oaloading}
            /> }
            <h1></h1>
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

export default compose(withConnect)(LendingPage);