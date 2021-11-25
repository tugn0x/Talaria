import React, {useEffect} from 'react'
import {useIntl} from 'react-intl'
import makeSelectLibrary, {isLibraryLoading} from '../selectors';
import {requestBorrowingsList,requestLibraryTagsOptionList,requestRemoveDDRequestTag,requestApplyTagsToDDRequests,requestFindUpdateOABorrowingReference,requestChangeStatusBorrowing,requestUpdateBorrowing,requestFindISSNISBN,requestForwardBorrowing} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import BorrowingsList from '../../../components/Library/BorrowingsList';
import messages from './messages'
import confirm from "reactstrap-confirm";

const BorrowingPage = (props) => {
    console.log('BorrowingPage', props)
    const {dispatch, isLoading, match, library, history} = props
    const archive=props.match.path.includes("archive")?1:0;
    const borrowingsList = library.borrowingsList.data
    const pagination = library.borrowingsList.pagination   
    const tagsOptionList=library.tagsOptionList
    const oaloading = library.borrowingsList.oaloading
    const findISSNISBNresults=library.findISSNISBNresults

    const editPath='/library/'+match.params.library_id+"/borrowing/:id/:op?";

    const intl = useIntl()
    
    useEffect(() => {        
        //if(!isLoading) {
            dispatch(requestBorrowingsList(match.params.library_id,null,null,{archived:archive}))            
            dispatch(requestLibraryTagsOptionList(match.params.library_id))
        //}
    }, [])


    
   


    /*async function deleteRequest (id) {
        let conf = await confirm({
             title: intl.formatMessage({id: 'app.global.confirm'}),             
             message: intl.formatMessage({id: 'app.global.deleteMessage'}),
             confirmText: intl.formatMessage({id: 'app.global.yes'}),
             cancelText: intl.formatMessage({id: 'app.global.no'})
         }); //
         if(conf)
             dispatch(requestDeleteRequest(id,intl.formatMessage({id: 'app.global.deletedMessage'})))
     }*/
    
    const applyTagsToDDRequests = (tagIds,reqIds) => { 
        dispatch(requestApplyTagsToDDRequests(match.params.library_id,reqIds,[tagIds],intl.formatMessage({id:'app.containers.BorrowingPage.addedTagToRequest'})))
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

     async function findAndUpdateOABorrowingReference (id,reference_id,data) {         
        dispatch(requestFindUpdateOABorrowingReference(id,match.params.library_id,reference_id,data,intl.formatMessage({id: "app.containers.BorrowingPage.OAfoundAndUpdateMessage"}),intl.formatMessage({id: "app.containers.BorrowingPage.OAnotfoundAndUpdateMessage"})));
     }

     async function findISSNISBNcb (id,data) {                        
         //console.log("findISSNISBNcb:",data)
         dispatch(requestFindISSNISBN(data))
     }

     async function askCancelRequest (id,filter) {
        console.log("DISPATCH askCancelRequest",id);
         let conf = await confirm({
            title: intl.formatMessage({id: 'app.global.confirm'}),
             message: intl.formatMessage({id: "app.requests.askCancelRequestMessage"}),
             confirmText: intl.formatMessage({id: 'app.global.yes'}),
             cancelText: intl.formatMessage({id: 'app.global.no'})
         }); //
         if(conf)
             dispatch(requestChangeStatusBorrowing(id,match.params.library_id,'canceled',null,intl.formatMessage({id: "app.requests.cancelAskedMessage"}),filter))
     } 
     async function forwardRequest (id,filter) {
        console.log("DISPATCH forwardRequest",id);
         let conf = await confirm({
            title: intl.formatMessage({id: 'app.global.confirm'}),
             message: intl.formatMessage({id: "app.requests.forwardRequestMessage"}),
             confirmText: intl.formatMessage({id: 'app.global.yes'}),
             cancelText: intl.formatMessage({id: 'app.global.no'})
         }); //
         //if(conf)
         //    dispatch(requestChangeStatusBorrowing(id,match.params.library_id,'forward',null,intl.formatMessage({id: "app.requests.forwardedMessage"}),filter))
         let data={
            id: id,
            'forward':1,
        }
        if(conf)
            dispatch(requestForwardBorrowing(id,match.params.library_id,data,intl.formatMessage({id: "app.requests.forwardedMessage"}),filter))
     } 

     async function askTrashRequest (id,filter) {
        console.log("DISPATCH askTrashRequest",id);
         let conf = await confirm({
            title: intl.formatMessage({id: 'app.global.confirm'}),
             message: intl.formatMessage({id: "app.requests.askTrashRequestMessage"}),
             confirmText: intl.formatMessage({id: 'app.global.yes'}),
             cancelText: intl.formatMessage({id: 'app.global.no'})
         }); 
         let data={
            id: id,
            'trash_type':1, //todo: define which type (HC, normal...)
        }
        if(conf)
            dispatch(requestUpdateBorrowing(id,match.params.library_id,data,intl.formatMessage({id: "app.requests.trashedMessage"}),filter))
     } 
     

     async function askArchiveRequest (id,filter) {
        console.log("DISPATCH askArchiveRequest",id);
         let conf = await confirm({
            title: intl.formatMessage({id: 'app.global.confirm'}),
             message: intl.formatMessage({id: "app.requests.askArchiveRequestMessage"}),
             confirmText: intl.formatMessage({id: 'app.global.yes'}),
             cancelText: intl.formatMessage({id: 'app.global.no'})
         }); //
         let data={
             id: id,
             'archived':1,
         }
         if(conf)
             dispatch(requestUpdateBorrowing(id,match.params.library_id,data,intl.formatMessage({id: "app.requests.archivedMessage"}),filter))
     } 

     const updateISSNISBNReference=(refdata,borrowingReq,filter)=>{
        let newBorrowing={
            id: borrowingReq.id,
            borrowing_library_id:match.params.library_id,
            'reference': refdata,
        }

        console.log("updateISSNOnBorrowing!",newBorrowing)

        dispatch(requestUpdateBorrowing(borrowingReq.id,match.params.library_id,newBorrowing,intl.formatMessage({id: "app.global.updatedMessage"}),filter))         
     }
          
    return (
        <>
        
            <BorrowingsList 
                sectionTitle={archive==1?messages.headerArchive:messages.header}
                data={borrowingsList}                               
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
                        dispatch(requestBorrowingsList(match.params.library_id,page, pageSize, searchFilter))
                    },
                    searchOnChange: true
                }}                
                removeTagFromRequest={archive==1?undefined:removeTagFromDDRequest}                
                //deleteReference={deleteReference}
                askCancelRequest={askCancelRequest}
                forwardRequest={forwardRequest}
                askTrashRequest={askTrashRequest}
                askArchiveRequest={askArchiveRequest}
                applyTags={archive==1?undefined:applyTagsToDDRequests}
                findAndUpdateOABorrowingReference={findAndUpdateOABorrowingReference}
                oaloading={oaloading}
                findISSNISBNcb={(id,data)=>findISSNISBNcb(id,data)}
                findISSNISBNresults={findISSNISBNresults}
                updateISSNISBNReference={updateISSNISBNReference}                
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

export default compose(withConnect)(BorrowingPage);