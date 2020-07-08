import React, {useEffect} from 'react'
import {useIntl} from 'react-intl'
import makeSelectPatron, {isPatronLoading,groupsOptionListSelector,labelsOptionListSelector} from '../selectors';
import { requestReferencesList,requestLabelsOptionList,requestGroupsOptionList,requestRemoveReferenceLabel,requestRemoveReferenceGroup} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ReferencesPage from '../ReferencesPage';
/* import {SimpleList} from 'components' */
import ReferencesList from 'components/Patron/ReferencesList';
import {columns} from './columns'
import messages from './messages'
import confirm from "reactstrap-confirm";

const ReferencesListPage = (props) => {
    console.log('ReferencesListPage', props)
    const {dispatch, isLoading, match, patron} = props
    const referencesList = patron.referencesList.data
    const pagination = patron.referencesList.pagination
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

    async function removeLabelFromReference (id,labelId) {
       //console.log("DISPATCH removeLabelFromReference",id,labelId);
        let conf = await confirm({
            title: intl.formatMessage(messages.confirm),
            message: intl.formatMessage(messages.askRemoveLabelMessage),
            confirmText: intl.formatMessage(messages.yes),
            cancelText: intl.formatMessage(messages.no)
        }); //
        if(conf)
            dispatch(requestRemoveReferenceLabel(id,labelId,intl.formatMessage(messages.removedMessage)))
    }

    async function removeGroupFromReference (id,groupId) {
        //console.log("DISPATCH removeGroupFromReference",id,groupId);
        let conf = await confirm({
            title: intl.formatMessage(messages.confirm),
            message: intl.formatMessage(messages.askRemoveGroupMessage),
            confirmText: intl.formatMessage(messages.yes),
            cancelText: intl.formatMessage(messages.no)
        }); //
         if(conf)
             dispatch(requestRemoveReferenceGroup(id,groupId,intl.formatMessage(messages.removedMessage)))
     }

    return (
            <ReferencesList 
                data={referencesList}
                columns={columns}
                loading={isLoading}
                pagination={pagination}
                history={history}
                messages={messages}
                labelsOptionList={labelsOptionList}
                groupsOptionList={groupsOptionList}
                match={match}
                title={intl.formatMessage(messages.header)}
                searchOptions={{
                    getSearchList: (searchFilter) => {
                        dispatch(requestReferencesList(null, searchFilter))
                    },
                    searchOnChange: true
                }}
                editPath={'/patron/references/reference/:id?/:edit?'}
                removeLabelFromReference={removeLabelFromReference}
                removeGroupFromReference={removeGroupFromReference}
                modalComponent={ <ReferencesPage match={match} />}
            />
            
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