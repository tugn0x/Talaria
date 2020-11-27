import React, {useEffect} from 'react'
import {useIntl} from 'react-intl'
import makeSelectPatron, {isPatronLoading,groupsOptionListSelector,labelsOptionListSelector} from '../selectors';
import { requestReferencesList,requestLabelsOptionList,
        requestGroupsOptionList,requestRemoveReferenceLabel,
        requestRemoveReferenceGroup,requestApplyLabelsToReferences,
        requestApplyGroupsToReferences,
        requestDeleteReference,requestFindUpdateOA} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import ReferencesPage from '../ReferencesPage';
/* import {SimpleList} from 'components' */
import ReferencesList from 'components/Patron/ReferencesList';

import messages from './messages'
import confirm from "reactstrap-confirm";

const ReferencesListPage = (props) => {
    console.log('ReferencesListPage', props)
    const {dispatch, isLoading, match, patron, history} = props
    const referencesList = patron.referencesList.data
    const pagination = patron.referencesList.pagination    
    const oaloading = patron.referencesList.oaloading
    const intl = useIntl()
    const labelsOptionList = patron.labelsOptionList
    const groupsOptionList = patron.groupsOptionList

    useEffect(() => {
        if(!isLoading) {
            dispatch(requestReferencesList())
            dispatch(requestLabelsOptionList())
            dispatch(requestGroupsOptionList())
        }
    }, [])

    useEffect(() => {
        console.log("oaloading UE:",oaloading)        
    }, [oaloading])



    async function removeLabelFromReference (id,labelId, filter) {
       //console.log("DISPATCH removeLabelFromReference",id,labelId);
        let conf = await confirm({
            title: intl.formatMessage({id: 'app.global.confirm'}),
            message: intl.formatMessage(messages.askRemoveLabelMessage),
            confirmText: intl.formatMessage({id: 'app.global.yes'}),
            cancelText: intl.formatMessage({id: 'app.global.no'})
        }); //
        if(conf)
            dispatch(requestRemoveReferenceLabel(id,labelId,intl.formatMessage(messages.removedMessage), filter))
    }

    async function removeGroupFromReference (id,groupId, filter) {
        //console.log("DISPATCH removeGroupFromReference",id,groupId);
        let conf = await confirm({
            title: intl.formatMessage({id: 'app.global.confirm'}),
            message: intl.formatMessage(messages.askRemoveGroupMessage),
            confirmText: intl.formatMessage({id: 'app.global.yes'}),
            cancelText: intl.formatMessage({id: 'app.global.no'})
        }); //
         if(conf)
             dispatch(requestRemoveReferenceGroup(id,groupId,intl.formatMessage(messages.removedMessage), filter))
     }

     const applyLabelsToReferences = (labelIds,refIds) => {
        //Dati di test per provare la API
        /*  let TESTlabelIds= [7,5,'ciaoooo'];
         let TESTrefIds=[48,46,44]; */
        dispatch(requestApplyLabelsToReferences(refIds,[labelIds],intl.formatMessage(messages.addedMessage)))
     }

     const applyGroupsToReferences = (groupIds,refIds) => {
        //Dati di test per provare la API
        /*  let TESTgroupIds= [14,15,'testgroup'];
         let TESTrefIds=[48,46,44]; */
        dispatch(requestApplyGroupsToReferences(refIds,[groupIds],intl.formatMessage(messages.addedMessage)))
    }

    async function deleteReference (id,filter) {
        console.log("DISPATCH deleteReference",id);
         let conf = await confirm({
            title: intl.formatMessage({id: 'app.global.confirm'}),
            message: intl.formatMessage({id: 'app.global.deleteMessage'}),
            confirmText: intl.formatMessage({id: 'app.global.yes'}),
            cancelText: intl.formatMessage({id: 'app.global.no'})
         }); //
         if(conf)
             dispatch(requestDeleteReference(id,intl.formatMessage(messages.removedMessage),filter))
     }

     async function findAndUpdateOA (id,title) {
        console.log("FIND and update OA:"+id,title)
        dispatch(requestFindUpdateOA(id,title,intl.formatMessage(messages.OAfoundAndUpdateMessage),intl.formatMessage(messages.OAnotfoundAndUpdateMessage)));
     }

    return (
        <>
        
            <ReferencesList 
                data={referencesList}
               // columns={columns}
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
                        dispatch(requestReferencesList(page, pageSize, searchFilter))
                    },
                    searchOnChange: true
                }}
                //editPath={'/patron/references/:id?/:edit?'}
                removeLabelFromReference={removeLabelFromReference}
                removeGroupFromReference={removeGroupFromReference}
                deleteReference={deleteReference}
                applyLabels={applyLabelsToReferences}
                applyGroups={applyGroupsToReferences}
                findAndUpdateOA={findAndUpdateOA}
                oaloading={oaloading}
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

export default compose(withConnect)(ReferencesListPage);