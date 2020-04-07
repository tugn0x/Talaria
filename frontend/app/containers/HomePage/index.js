/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import messages from './messages';
/* 
import { FormattedMessage } from 'react-intl';
import {createStructuredSelector} from "reselect";
import {compose} from "redux";
import { connect } from 'react-redux'; */
import {BasePage} from "components";
import userRoutes from "routes/userRoutes";

function HomePage(props) {
  console.log('HomePage', props)
  return (
    <>
      <BasePage {...props} routes={userRoutes} messages={messages} >
       <h1 style={{color: 'green'}}>ciao</h1>
       <h1 style={{color: 'green'}}>ciao</h1>
       <h1 style={{color: 'green'}}>ciao</h1>
       <h1 style={{color: 'green'}}>ciao</h1>
       <h1 style={{color: 'green'}}>ciao</h1>
      </BasePage>
    </>
  );
}
/* const mapStateToProps = createStructuredSelector({

});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
 */
// export default withRouter(withGoogleReCaptcha((SignupForm)));
export default HomePage;
