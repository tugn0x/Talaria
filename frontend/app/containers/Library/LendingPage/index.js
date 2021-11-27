import React, {useEffect} from 'react'
import {useIntl} from 'react-intl'
import makeSelectLibrary, {isLibraryLoading} from '../selectors';
import {requestLendingsList,requestLibraryTagsOptionList,requestApplyLendingTagsToDDRequests, requestRemoveDDRequestTag, requestChangeStatusLending, requestAcceptAllLenderLending, FulfillLendingRequestStatus, unFulfillLendingRequestStatus} from '../actions'
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
    const editPath='/library/'+match.params.library_id+"/lending/:id/:op?";

    const intl = useIntl()
    
    useEffect(() => {  
        //if(isLoading) {
            dispatch(requestLendingsList(match.params.library_id,null,null,{lending_archived:archive, all_lender:allrequests}))            
            dispatch(requestLibraryTagsOptionList(match.params.library_id))
        //}
    }, [])

   
    const applyLendingTagsToDDRequests = (tagIds,reqIds) => { 
        dispatch(requestApplyLendingTagsToDDRequests(match.params.library_id,reqIds,[tagIds],intl.formatMessage({id:'app.containers.LendingPage.addedTagToRequest'})))
     }
    
     async function UpdateLendingRequestStatus (data) {
        if(data.lending_status=='cancelRequested')
        {
            let confcan = await confirm({
            title: intl.formatMessage({id: 'app.global.confirm'}),
            message: intl.formatMessage({id: "app.requests.acceptCancelMessage"}),
            confirmText: intl.formatMessage({id: 'app.global.yes'}),
            cancelText: intl.formatMessage({id: 'app.global.no'})
            }); 
            if(confcan)
                dispatch(requestChangeStatusLending(data.id, match.params.library_id, "canceledAccepted",intl.formatMessage({id:'app.requests.canceledAccepted'}),""))
        }
        else
            dispatch(requestChangeStatusLending(data.id, match.params.library_id, 'willSupply',intl.formatMessage({id:'app.requests.willSupply'}),""))
    }

        
    const UpdateLendingAcceptRequest = (data) => {
       dispatch(requestAcceptAllLenderLending(data.id,match.params.library_id, data.lending_status,intl.formatMessage({id:'app.requests.willSupply'}),""))
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
                sectionTitle={archive==1?messages.headerArchive:(allrequests==1?messages.headerAllRequest:messages.header)}
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
                        searchFilter={...searchFilter,lending_archived:archive,all_lender:allrequests}
                        dispatch(requestLendingsList(match.params.library_id,page, pageSize, searchFilter))
                    },
                    searchOnChange: true
                }}                
                removeTagFromRequest={removeTagFromDDRequest}                
                FulfillLendingRequestStatus={FulfillLendingRequestStatus}
                unFulfillLendingRequestStatus={unFulfillLendingRequestStatus}
                applyTags={applyLendingTagsToDDRequests}
                UpdateLendingRequestStatus={UpdateLendingRequestStatus}
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