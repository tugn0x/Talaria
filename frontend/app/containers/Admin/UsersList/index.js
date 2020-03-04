import React, {useEffect, useState} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import UsersListTable from 'components/Admin/UsersListTable'
import {requestUsersList, requestUpdateUser, requestPostUser} from '../actions'
import makeSelectAdmin, {isAdminLoading} from '../selectors';
import Loader from "components/Form/Loader";
import UserForm from 'components/Admin/UserForm/Loadable'

const UsersList = (props) => {
    console.log('UsersList', props)
    const {dispatch, isLoading, admin, match, location} = props
    const [isNew, setIsNew] = useState(location.pathname.includes('new'))
    const [currentUser, setCurrentUser] = useState({})
    const intl = useIntl();
    
    useEffect(() => {
        if(!isLoading) {
            dispatch(requestUsersList())
        }
    }, [])
    
    useEffect(() => {
        if(!isNew && match.params.id){
            setCurrentUser(admin.usersList.filter(user => user.id === parseInt(match.params.id))[0])
        }
    }, [admin.usersList]) 

    useEffect(() => {
        setIsNew(location.pathname.includes('new'))
    }, [location.pathname])

    return (
        <>
            {isNew &&
                <UserForm 
                    loading={isLoading} 
                    createUser={ (formData) => dispatch(requestPostUser(formData, "User added!!!" )) } />
            || !isNew && match.params.id && 
                <UserForm 
                    updateUser={(formData) => dispatch(requestUpdateUser({...formData, id: match.params.id }, intl.formatMessage({ id: 'app.containers.ProfilePage.updateMessage' })))}
                    user={currentUser}
                    loading={isLoading}
                />
            ||  
                <UsersListTable 
                    usersList={admin.usersList} 
                    match={match} 
                    loading={isLoading}
                    createUser={ (formData) => dispatch(requestPostUser(formData, "User added!!!" )) }
                />    
            }
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
  
export default compose(withConnect)(UsersList);