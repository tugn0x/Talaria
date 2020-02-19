/*
 * PatronPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {createStructuredSelector} from "reselect";
import {compose} from "redux";
import { connect } from 'react-redux';
import {BasePage} from "components";
import patronRoutes from "routes/patronRoutes";
import {requestMyLibraries} from 'containers/Patron/actions'
// import {withGoogleReCaptcha} from "react-google-recaptcha-v3";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useParams
// } from "react-router-dom";


function PatronPage(props) {
  console.log('PatronPage', props)
  
 
  return (
    <>
      <BasePage {...props} routes={patronRoutes} messages={messages}/>
    </>
  );
}
const mapStateToProps = createStructuredSelector({

});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// export default withRouter(withGoogleReCaptcha((SignupForm)));
export default compose(withConnect)(PatronPage);
