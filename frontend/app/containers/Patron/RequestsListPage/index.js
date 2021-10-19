import React, {useEffect} from 'react'
import {useIntl} from 'react-intl'
import makeSelectPatron, {isPatronLoading,groupsOptionListSelector,labelsOptionListSelector} from '../selectors';
import { requestRequestsList,requestLabelsOptionList,requestGroupsOptionList,requestRemoveReferenceLabel,requestRemoveReferenceGroup,requestApplyLabelsToReferences,requestApplyGroupsToReferences,requestArchiveRequest,requestChangeStatusRequest} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import RequestsList from 'components/Patron/RequestsList';
import confirm from "reactstrap-confirm";
import messages from './messages.js';

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


    
    async function archiveRequest (id,filter) {
        console.log("DISPATCH archiveRequest",id);
         let conf = await confirm({
            title: intl.formatMessage({id: 'app.global.confirm'}),
             message: intl.formatMessage({id: "app.requests.askArchiveRequestMessage"}),
             confirmText: intl.formatMessage({id: 'app.global.yes'}),
             cancelText: intl.formatMessage({id: 'app.global.no'})
         }); //
         if(conf)
             dispatch(requestArchiveRequest(id,intl.formatMessage({id: "app.requests.archivedMessage"}),filter))
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
             dispatch(requestChangeStatusRequest(id,'canceled',intl.formatMessage({id: "app.requests.canceledMessage"}),filter))
     } 

     async function acceptCost (id,filter) {
        dispatch(requestChangeStatusRequest(id,'costAccepted',intl.formatMessage({id: "app.requests.costAcceptedMessage"}),filter))
     }

     async function denyCost (id,filter) {
        dispatch(requestChangeStatusRequest(id,'costNotAccepted',intl.formatMessage({id: "app.requests.costDeniedMessage"}),filter))
     }


    return (
        <>
        
            <RequestsList 
                sectionTitle={archive==1?messages.headerArchive:messages.header}
                data={requestsList}
                loading={isLoading}
                pagination={pagination}
                history={history}
                labelsOptionList={labelsOptionList}
                groupsOptionList={groupsOptionList}
                match={match}                
                searchOptions={{
                    getSearchList: (page, pageSize, searchFilter ) => {
                        history.push(match.path)
                        dispatch(requestRequestsList(page, pageSize, {...searchFilter,archived:archive}))
                    },
                    searchOnChange: true
                }}
                /*editPath={'/patron/requests/:id?/:edit?'}*/
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