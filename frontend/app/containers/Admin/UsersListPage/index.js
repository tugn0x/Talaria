import React, {useEffect, useState} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import UsersListTable from 'components/Admin/UsersListTable'
import {requestUsersList} from '../actions'
import makeSelectAdmin, {isAdminLoading} from '../selectors';
// import messages from 'utils/globalMessages';

const UsersListPage = (props) => {
    console.log('UsersListPage', props)
    const {dispatch, isLoading, admin, match, history} = props
   
    const intl = useIntl();
   

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
            usersList={admin.usersList.data}
            pagination={admin.usersList.pagination}
            history={history}
            match={match}
            loading={isLoading}
            editPath={'/admin/users/user/:id?'}
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
