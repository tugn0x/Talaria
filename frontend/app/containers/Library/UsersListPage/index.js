import React, {useEffect} from 'react'

import { connect } from 'react-redux';
import { compose } from 'redux';
import {requestUsersList} from '../actions'
import {useIntl} from 'react-intl';
import messages from 'containers/Admin/UsersListPage/messages'
import {columns} from './columns'
import {SimpleList} from 'components'
import UserPage from '../UserPage'

const UsersListPage = (props) => {
    console.log('UsersListPage', props)
    const {dispatch, isLoading, library, match} = props
    const library_id = library.library.id
    const usersList = library.usersList.data
    const pagination = library.usersList.pagination
    const intl = useIntl()
    useEffect(() => {
        if(!isLoading && library_id) {
            dispatch(requestUsersList(library_id))
        }
    }, [library_id])

    return (
        <SimpleList 
            data={usersList}
            columns={columns}
            loading={isLoading}
            pagination={pagination}
            history={history}
            messages={messages}
            match={match}
            // title={library.library.name}
            title={intl.formatMessage(messages.header)}
            searchOptions={{
                getSearchList: (query) => dispatch(requestUsersList(library_id, null, query))
            }}
            editPath={`/library/${library_id}/patrons/patron/:id?`}
            // modalComponent={ <UserPage match={match} />}
        />
    )
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    null,
    mapDispatchToProps,
);

export default compose(withConnect)(UsersListPage);