/*
 * Library User Page
 *
 *
 *
 */

import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import {fields} from './fields';
import messages from './messages';

/*
import { FormattedMessage } from 'react-intl'; */
import {requestUser, requestUpdateUser} from '../actions'
import {requestGetTitlesOptionList} from '../../Patron/actions'
/* import makeSelectLibrary,{isLibraryLoading} from "../selectors"; */
import { CustomForm } from 'components';
import { titlesSelector } from '../../Patron/selectors';


function UserPage(props) {
  //console.log('User Page', props)
  const intl = useIntl();
  const {library, dispatch, match} = props
  const {params} = match
  const isLoading = library.loading
  const isNew = !params.id || params.id === 'new'
  const user = library.user
  /* const libraryOptionList = patron.libraryOptionList */

  useEffect(() => {
    dispatch(requestGetTitlesOptionList());
    if(!isLoading && !isNew && Object.keys(user).length === 0) {
      dispatch(requestUser(params.library_id, params.id))
    }
   }, [isLoading])

  return (

    <>
    {user && Object.keys(user).length && !isLoading &&
        <CustomForm
          submitCallBack={(formData) => dispatch(requestUpdateUser({
              ...formData,
              library_id: params.library_id,
              id: params.id,
              message: `${intl.formatMessage(messages.statusUpdateMessage)}` })) }
          requestData={{
            status: user.status,
            name: user.user.data.full_name,
            department_id: user.department_id,
            title_id: user.title_id,
            user_referent: user.user_referent,
            user_mat:user.user_mat,
            user_service_phone:user.user_service_phone,
            user_service_email:user.user_service_email
          }}
          // qui si carica la lista della option list. Se vuoi una lista che venga dal back.
          // E nei fields.js in options: del campo metti lo stesso nome della prop quindi department_id
          department_id={library.departmentOptionList}
          title_id={props.titles}
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

const mapStateToProps = createStructuredSelector({
  titles: titlesSelector(),  
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
