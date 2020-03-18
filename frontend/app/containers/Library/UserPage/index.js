/*
 * User Page
 *
 * 
 *
 */

import React, {useEffect} from 'react';
import { createStructuredSelector } from 'reselect';
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
  /* const librariesList = patron.librariesList */
  
  useEffect(() => {
    if(!isLoading && !isNew && Object.keys(user).length === 0) {
      dispatch(requestUser(params.library_id, params.id))
    }
   }, [isLoading])

   
  return (
    <>
     {user && Object.keys(user).length && !isLoading &&
        <>
          <CustomForm 
            submitCallBack={(formData) => dispatch(requestUpdateUser({
                status: Number(formData.status), 
                library_id: params.library_id, 
                id: params.id,
                message: `${intl.formatMessage(messages.statusUpdateMessage)}` })) } 
            updateFormData={{status: user.status, name: user.user.data.full_name}}
            fields={fields}
            title={intl.formatMessage(messages.header)}
            messages={messages}
          />
        </>
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

const mapStateToProps = createStructuredSelector({
  /*isLibraryLoading: isLibraryLoading(),
   patron: makeSelectPatron() */
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
