import React, {useEffect} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import {requestUpdateUser, requestPostUser, requestUser} from '../actions'
import makeSelectAdmin, {isAdminLoading} from '../selectors';
import UserForm from 'components/Admin/UserForm/Loadable'
import messages from 'utils/globalMessages'
import {Loader} from 'components'

const UserPage = (props) => {
    console.log('UserPage', props)
    const {dispatch, isLoading, admin, match} = props
    const {params} = match
    const intl = useIntl();
    const isNew = !params.id || params.id === 'new'

    useEffect(() => {
        if(!isNew && !isLoading){
            dispatch(requestUser(params.id))
        }
    }, [params.id])
    
    return (
        <Loader show={isLoading}>
            {!isNew &&
                <UserForm
                    updateUser={(formData) => dispatch(requestUpdateUser({...formData, id: params.id }, intl.formatMessage(messages.userUpdateSuccess)))}
                    user={admin.user}
                />
            }
            {isNew &&
                <UserForm
                   createUser={ (formData) => dispatch(requestPostUser(formData, intl.formatMessage(messages.userCreateSuccess) )) } />
            }
        </Loader>
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

export default compose(withConnect)(UserPage);
