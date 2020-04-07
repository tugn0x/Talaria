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
// import { FormattedMessage } from 'react-intl';
import {requestLibraryOptionList, requestAccessToLibrary, requestGetMyLibrary} from '../actions'
import makeSelectPatron, {isPatronLoading} from '../selectors';
import {MyLibraryForm} from 'components';


function MyLibraryPage(props) {
  const intl = useIntl();
  const {isLoading, dispatch, patron, match} = props
  const {params} = match
  const isNew = !params.id || params.id === 'new'
  const library = patron.library
  const libraryOptionList = patron.libraryOptionList
  
  useEffect(() => {
    if(!isLoading && !isNew) {
      dispatch(requestGetMyLibrary(params.id))
    }else if(!isLoading && isNew){
      dispatch(requestLibraryOptionList())
    }
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
          libraryOptionList={libraryOptionList}
          requestAccessToLibrary={(formData) =>  dispatch(requestAccessToLibrary(formData.library_id))}
          fields={fields}
          messages={messages} 
          searches={{ library_id: (input) => dispatch(requestLibraryOptionList(input)) }}
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
