/*
 * LibraryPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, {useEffect} from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {createStructuredSelector} from "reselect";
import makeSelectLibrary,{isLibraryLoading} from "../selectors";
import {compose} from "redux";
import { connect } from 'react-redux';
import {BasePage} from "components";
import libraryRoutes from "routes/libraryRoutes";
import {requestGetLibrary} from '../actions'
import {getAuthResource} from "utils/permissions";

function LibraryPage(props) {
  console.log('LibraryPage', props)
  const {isLoading, match, dispatch} = props;

  const resource = getAuthResource(props.auth, {
    type: 'libraries',
    id: match.params.library_id,
  })
  console.log(resource)

  useEffect(() => {
    if(!isLoading){
      dispatch(requestGetLibrary(match.params.library_id))
    }
  }, [match.params.library_id])


  return (
    <>
      <BasePage {...props} routes={libraryRoutes} messages={messages} resource={resource}/>
    </>
  );
}
const mapStateToProps = createStructuredSelector({
  library: makeSelectLibrary(),
  isLoading: isLibraryLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// export default withRouter(withGoogleReCaptcha((SignupForm)));
export default compose(withConnect)(LibraryPage);
