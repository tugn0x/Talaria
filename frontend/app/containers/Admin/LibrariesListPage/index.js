import React, {useEffect} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import {SimpleList} from 'components'
import messages from './messages'
import {columns} from './columns'
import {requestGetLibrariesList /* , requestPostLibrary */ } from '../actions'
import makeSelectAdmin, {isAdminLoading} from '../selectors';
import LibraryPage from '../LibraryPage'

const LibrariesListPage = (props) => {
    console.log('LibrariesListPage', props)
    const {dispatch, isLoading, admin,  match, history} = props
    const intl = useIntl();
    const librariesList = admin.librariesList
    
    useEffect(() => {
        if(!isLoading) {
            dispatch(requestGetLibrariesList())
        }
    }, [])

    

    return (
        <>
            <SimpleList 
                data={librariesList.data}
                columns={columns}
                loading={isLoading}
                pagination={librariesList.pagination}
                history={history}
                messages={messages}
                match={match}
                title={intl.formatMessage(messages.header)}
                searchOptions={{
                    getSearchList: (query) => dispatch(requestGetLibrariesList(null, query)),
                    searchOnChange: true
                }}
                editPath={'/admin/libraries/library/:id?'}
                modalComponent={ <LibraryPage match={match} />}
            />
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    isLoading: isAdminLoading(),
    admin: makeSelectAdmin()
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

export default compose(withConnect)(LibrariesListPage);
