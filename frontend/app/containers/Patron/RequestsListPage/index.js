import React, {useEffect} from 'react'
import {useIntl} from 'react-intl'
import makeSelectPatron, {isPatronLoading,groupsOptionListSelector,labelsOptionListSelector} from '../selectors';
import { requestRequestsList,requestLabelsOptionList,requestGroupsOptionList,requestRemoveReferenceLabel,requestRemoveReferenceGroup,requestApplyLabelsToReferences,requestApplyGroupsToReferences,requestArchiveRequest,requestChangeStatusRequest} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import RequestsList from 'components/Patron/RequestsList';
import messages from './messages'
import confirm from "reactstrap-confirm";

const RequestsListPage = (props) => {
    console.log('RequestsListPage', props)
    const {dispatch, isLoading, match, patron, history} = props
    const archive=props.match.path.includes("archive")?1:0;
    const requestsList = patron.requestsList.data
    const pagination = patron.requestsList.pagination
    const intl = useIntl()
    const labelsOptionList = patron.labelsOptionList
    const groupsOptionList = patron.groupsOptionList

    useEffect(() => {
        if(!isLoading) {
            dispatch(requestRequestsList(null,null,{archived: archive}))
            dispatch(requestLabelsOptionList())
            dispatch(requestGroupsOptionList())
        }
    }, [])


   /* async function removeLabelFromReference (id,labelId, filter) {
        let conf = await confirm({
            title: intl.formatMessage(messages.confirm),
            message: intl.formatMessage(messages.askRemoveLabelMessage),
            confirmText: intl.formatMessage(messages.yes),
            cancelText: intl.formatMessage(messages.no)
        }); 
        if(conf)
            dispatch(requestRemoveReferenceLabel(id,labelId,intl.formatMessage(messages.removedMessage), filter))
    }

    async function removeGroupFromReference (id,groupId, filter) {
        let conf = await confirm({
            title: intl.formatMessage(messages.confirm),
            message: intl.formatMessage(messages.askRemoveGroupMessage),
            confirmText: intl.formatMessage(messages.yes),
            cancelText: intl.formatMessage(messages.no)
        }); 
         if(conf)
             dispatch(requestRemoveReferenceGroup(id,groupId,intl.formatMessage(messages.removedMessage), filter))
     }

     const applyLabelsToReferences = (labelIds,refIds) => {
        dispatch(requestApplyLabelsToReferences(refIds,[labelIds],intl.formatMessage(messages.addedMessage)))
     }

     const applyGroupsToReferences = (groupIds,refIds) => {
        dispatch(requestApplyGroupsToReferences(refIds,[groupIds],intl.formatMessage(messages.addedMessage)))
    }*/

    async function archiveRequest (id,filter) {
        console.log("DISPATCH archiveRequest",id);
         let conf = await confirm({
             title: intl.formatMessage(messages.confirm),
             message: intl.formatMessage(messages.askArchiveRequestMessage),
             confirmText: intl.formatMessage(messages.yes),
             cancelText: intl.formatMessage(messages.no)
         }); //
         if(conf)
             dispatch(requestArchiveRequest(id,intl.formatMessage(messages.archivedMessage),filter))
     }

     async function askCancelRequest (id,filter) {
        console.log("DISPATCH askCancelRequest",id);
         let conf = await confirm({
             title: intl.formatMessage(messages.confirm),
             message: intl.formatMessage(messages.askCancelRequestMessage),
             confirmText: intl.formatMessage(messages.yes),
             cancelText: intl.formatMessage(messages.no)
         }); //
         if(conf)
             dispatch(requestChangeStatusRequest(id,'userAskCancel',intl.formatMessage(messages.canceledMessage),filter))
     } 

     async function acceptCost (id,filter) {
        dispatch(requestChangeStatusRequest(id,'costAccepted',intl.formatMessage(messages.costAcceptedMessage),filter))
     }

     async function denyCost (id,filter) {
        dispatch(requestChangeStatusRequest(id,'costNotAccepted',intl.formatMessage(messages.costDeniedMessage),filter))
     }


    return (
        <>
        
            <RequestsList 
                data={requestsList}
                loading={isLoading}
                pagination={pagination}
                history={history}
                messages={messages}
                labelsOptionList={labelsOptionList}
                groupsOptionList={groupsOptionList}
                match={match}
                title={intl.formatMessage(messages.header)}
                searchOptions={{
                    getSearchList: (page, pageSize, searchFilter ) => {
                        history.push(match.path)
                        dispatch(requestRequestsList(page, pageSize, {...searchFilter,archived:archive}))
                    },
                    searchOnChange: true
                }}
                editPath={'/patron/requests/:id?/:edit?'}
                archiveRequest={archiveRequest}
                askCancelRequest={askCancelRequest}
                acceptCost={acceptCost}
                denyCost={denyCost}
             />
          </>  
    )
}

const mapStateToProps = createStructuredSelector({
    isLoading: isPatronLoading(),
    patron: makeSelectPatron(),
    labelsOptionList: labelsOptionListSelector(),
    groupsOptionList: groupsOptionListSelector()
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

export default compose(withConnect)(RequestsListPage);