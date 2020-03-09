import React, {useEffect, useState} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import UsersListTable from 'components/Admin/UsersListTable'
import {requestUsersList, requestPostUser} from '../actions'
import makeSelectAdmin, {isAdminLoading} from '../selectors';
import queryString from 'query-string'

const UsersListPage = (props) => {
    console.log('UsersListPage', props)
    const {dispatch, isLoading, admin, match, location, history} = props
    const {path} = match
    const {search} = location
    const intl = useIntl();
    const query = queryString.parse(search)

    useEffect(() => {
        if(!isLoading) {
            dispatch(requestUsersList())
        }
    }, [])

    useEffect(() => {
        if(!isLoading && match.params) {
            dispatch(requestUsersList(match.params.page))
        }
    }, [match.params])


    return (
        <UsersListTable
            usersList={admin.usersList}
            pagination={admin.pagination}
            history={history}
            path={path}
            match={match}
            loading={isLoading}
            editPath={'/admin/users/user/:id?'}
            createUser={ (formData) => dispatch(requestPostUser(formData, "User added!!!" )) }
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
