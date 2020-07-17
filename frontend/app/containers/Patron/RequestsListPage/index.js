import React, {useEffect} from 'react'
import {useIntl} from 'react-intl'
import makeSelectPatron, {isPatronLoading,groupsOptionListSelector,labelsOptionListSelector} from '../selectors';
import { requestRequestsList,requestLabelsOptionList,requestGroupsOptionList,requestRemoveReferenceLabel,requestRemoveReferenceGroup,requestApplyLabelsToReferences,requestApplyGroupsToReferences} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
//import RequestsPage from '../RequestsPage';
import RequestsList from 'components/Patron/RequestsList';
import messages from './messages'
import confirm from "reactstrap-confirm";

const RequestsListPage = (props) => {
    console.log('RequestsListPage', props)
    const {dispatch, isLoading, match, patron, history} = props
    const requestsList = patron.requestsList.data
    const pagination = patron.requestsList.pagination
    const intl = useIntl()
    const labelsOptionList = patron.labelsOptionList
    const groupsOptionList = patron.groupsOptionList

    useEffect(() => {
        if(!isLoading) {
            dispatch(requestRequestsList())
            dispatch(requestLabelsOptionList())
            dispatch(requestGroupsOptionList())
        }
    }, [])


    async function removeLabelFromReference (id,labelId, filter) {
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
                        dispatch(requestRequestsList(page, pageSize, searchFilter))
                    },
                    searchOnChange: true
                }}
                editPath={'/patron/requests/request/:id?/:edit?'}
                removeLabelFromReference={removeLabelFromReference}
                removeGroupFromReference={removeGroupFromReference}
                applyLabels={applyLabelsToReferences}
                applyGroups={applyGroupsToReferences}
                // modalComponent={ <ReferencesPage match={match} />}
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