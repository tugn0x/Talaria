/*
 * My Library Page
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
import { FormattedMessage } from 'react-intl';
import {requestGetLibraryList, requestAccessToLibrary, requestGetMyLibrary} from '../actions'
import makeSelectPatron, {isPatronLoading} from '../selectors';
import {CustomForm, MyLibraryForm} from 'components';


function MyLibraryPage(props) {
  const intl = useIntl();
  const {isLoading, dispatch, patron, match} = props
  const {params} = match
  const isNew = !params.id || params.id === 'new'
  const library = patron.library
  const librariesList = patron.librariesList
  
  useEffect(() => {
    if(!isLoading && !isNew) {
      dispatch(requestGetMyLibrary(params.id))
    }else if(!isLoading && isNew){
      dispatch(requestGetLibraryList())
    }
    // console.log(isNew)
   }, [])

   
  return (
    <>
      {!isNew && 
        <MyLibraryForm 
          library={library}
          loading={isLoading}
        />
      }
      {isNew &&
        <MyLibraryForm 
          librariesList={librariesList}
          requestAccessToLibrary={(formData) =>  dispatch(requestAccessToLibrary(formData.library_selected))}
          fields={fields}
          messages={messages} 
          searchCustomSelect={(input) => dispatch(requestGetLibraryList(input))}
        /> 
      } 
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: isPatronLoading(),
  patron: makeSelectPatron()
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

export default compose(withConnect)((MyLibraryPage));
