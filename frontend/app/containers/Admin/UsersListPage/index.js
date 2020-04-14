import React, {useEffect, useState} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
// import UsersListTable from 'components/Admin/UsersListTable'
import {requestUsersList} from '../actions'
import makeSelectAdmin, {isAdminLoading} from '../selectors';
import messages from './messages';
import {columns} from './columns'
import {SimpleList} from 'components'
import UserPage from '../UserPage'

const UsersListPage = (props) => {
    console.log('UsersListPage', props)
    const {dispatch, isLoading, admin, match, history} = props
   
    const intl = useIntl();
    
    useEffect(() => {
        if(!isLoading) {
           dispatch(requestUsersList());
        }
    }, [])


    return (
        <SimpleList 
            data={admin.usersList.data}
            columns={columns}
            loading={isLoading}
            pagination={admin.usersList.pagination}
            history={history}
            messages={messages}
            match={match}
            title={intl.formatMessage(messages.header)}
            searchOptions={{
                getSearchList: (query) => dispatch(requestUsersList(null, query)),
                searchOnChange: true
            }}
            editPath={'/admin/users/user/:id?'}
            modalComponent={ <UserPage match={match} />}
        />
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

export default compose(withConnect)(UsersListPage);
