/*
 * PatronPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect } from 'react';
/* import { FormattedMessage } from 'react-intl';
import messages from './messages'; */
import {createStructuredSelector} from "reselect";
import {compose} from "redux";
import { connect } from 'react-redux';
import {BasePage} from "components";
import adminRoutes from "routes/adminRoutes";

function AdminPage(props) {
  console.log('AdminPage', props)
  return (
    <>
      <BasePage {...props} routes={adminRoutes} headermenu={true}/>
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
export default compose(withConnect)(AdminPage);
