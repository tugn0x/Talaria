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
/* import {fields} from './fields';
import messages from './messages';
import { FormattedMessage } from 'react-intl'; */
// import {requestGetLibraryList, requestAccessToLibrary, requestGetMyLibrary} from '../actions'
// import makeSelectPatron, {isPatronLoading} from '../selectors';
import { CustomForm } from 'components';


function UserPage(props) {
  console.log('User Page', props)
  const intl = useIntl();
  const {isLoading, dispatch, match} = props
  const {params} = match
  const isNew = !params.id || params.id === 'new'
  /* const library = patron.library
  const librariesList = patron.librariesList */
  
  useEffect(() => {
    if(!isLoading && !isNew) {
      // dispatch(requestGetMyLibrary(params.id))
    }
    console.log(isNew)
   }, [])

   
  return (
    <>
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
  /* isLoading: isPatronLoading(),
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
