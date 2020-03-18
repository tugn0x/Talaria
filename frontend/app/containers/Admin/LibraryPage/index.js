/*
 * Library Page
 *
 * 
 *
 */

import React, {useEffect} from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
// import {fields} from './fields';
import messages from './messages';
import {requestGetLibrary, requestUpdateLibrary, requestPostLibrary} from '../actions'
import makeSelectAdmin, {isAdminLoading} from '../selectors';
import {LibraryForm, Loader} from 'components';

function LibraryPage(props) {
    const intl = useIntl();
    const {isLoading, dispatch, admin, match} = props
    const {params} = match
    const isNew = !params.id || params.id === 'new'
    const library = admin.library
    // const librariesList = patron.librariesList
    
    useEffect(() => {
      if(!isLoading && !isNew) {
         dispatch(requestGetLibrary(params.id))
      }
     }, [])
  
     
    return (
      <Loader show={isLoading}>
        {!isNew && 
            <LibraryForm 
              library={library}
              loading={isLoading}
              updateLibrary={(formData) => dispatch(requestUpdateLibrary({...formData, id: params.id}, intl.formatMessage(messages.updateMessage)))}
            /> 
        }
        { isNew && 
            <LibraryForm 
              createLibrary={ (formData) => dispatch(requestPostLibrary(formData, intl.formatMessage(messages.createMessage))) } 
              loading={isLoading}
              titleNewLibrary={intl.formatMessage(messages.titleNewLibrary)}
            /> 
        }  
      </Loader>
    );
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
  
  export default compose(withConnect)(LibraryPage);
  