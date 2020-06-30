import React, {useEffect} from 'react'
import {useIntl} from 'react-intl'
import makeSelectPatron, {isPatronLoading} from '../selectors';
import { requestReferencesList} from '../actions'
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
    useEffect(() => {
        if(!isLoading) {
            dispatch(requestReferencesList())
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
                match={match}
                title={intl.formatMessage(messages.header)}
                searchOptions={{
                    getSearchList: (query) => dispatch(requestReferencesList(null, query)),
                    searchOnChange: true
                }}
                editPath={'/patron/references/reference/:id?'}
                modalComponent={ <ReferencesPage match={match} />}
            />
            
    )
}

const mapStateToProps = createStructuredSelector({
    isLoading: isPatronLoading(),
    patron: makeSelectPatron()
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