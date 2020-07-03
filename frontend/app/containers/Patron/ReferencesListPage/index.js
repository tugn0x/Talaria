import React, {useEffect} from 'react'
import {useIntl} from 'react-intl'
import makeSelectPatron, {isPatronLoading,groupsOptionListSelector,labelsOptionListSelector} from '../selectors';
import { requestReferencesList,requestLabelsOptionList,requestGroupsOptionList} from '../actions'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ReferencesPage from '../ReferencesPage';
/* import {SimpleList} from 'components' */
import ReferencesList from 'components/Patron/ReferencesList';
import {columns} from './columns'
import messages from './messages'

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
                        console.log("SEARCH: ",searchFilter); 
                        dispatch(requestReferencesList(null, searchFilter))
                    },
                    searchOnChange: true
                }}
                editPath={'/patron/references/reference/:id?/:edit?'}
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