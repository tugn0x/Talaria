/*
 * Library User Page
 *
 * 
 *
 */

import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import {fields} from './fields';
import messages from './messages';

/* 
import { FormattedMessage } from 'react-intl'; */
import {requestUser, requestUpdateUser} from '../actions'
/* import makeSelectLibrary,{isLibraryLoading} from "../selectors"; */
import { CustomForm } from 'components';


function UserPage(props) {
  console.log('User Page', props)
  const intl = useIntl();
  const {library, dispatch, match} = props
  const {params} = match
  const isLoading = library.loading
  const isNew = !params.id || params.id === 'new'
  const user = library.user
  /* const libraryOptionList = patron.libraryOptionList */
  
  useEffect(() => {
    if(!isLoading && !isNew && Object.keys(user).length === 0) {
      dispatch(requestUser(params.library_id, params.id))
    }
   }, [isLoading])

  return (
    
    <>
     {user && Object.keys(user).length && !isLoading &&
        <CustomForm 
          submitCallBack={(formData) => dispatch(requestUpdateUser({
              status: formData.status, 
              library_id: params.library_id, 
              id: params.id,
              message: `${intl.formatMessage(messages.statusUpdateMessage)}` })) } 
          requestData={{
            /* TODO: trovare il modo di far sceglere il dipartiment/title da una dropdown + gestire status */
            status: user.status.value, 
            name: user.user.data.full_name, 
            department_id: user.department.data.name,
            title_id: user.title.data.name, 
            user_referent: user.user_referent,
            user_mat:user.user_mat,
            user_service_phone:user.user_service_phone,
            user_service_email:user.user_service_email
          }}
          fields={fields}
          title={intl.formatMessage(messages.header)}
          messages={messages}
        />
      }
      {/* !isNew && 
        <MyLibraryForm 
          library={library}
          loading={isLoading}
        /> */
      }
    </>
  );
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

export default compose(withConnect)(UserPage);
