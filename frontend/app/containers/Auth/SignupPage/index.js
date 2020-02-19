/**
 *
 * SignupPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import messages from './messages';
import {requestSignup, socialLoginPrepare, socialLoginRequest} from '../AuthProvider/actions';
import { SignupForm, BasePage } from "components";

export function SignupPage(props) {
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    props.prepareSocialLogin();
    console.log("use effect")
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <BasePage {...props} routes={[]} messages={messages}>
      <div>
        <SignupForm {...props} handleOpen={handleOpen} signup={(request, redirect) => props.dispatch(requestSignup(request, redirect))} />
      </div>
    </BasePage>
  );
}

SignupPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  //signupPage: makeSelectSignupPage()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    prepareSocialLogin: () => dispatch(socialLoginPrepare()),
    loginGoogle: () => dispatch(socialLoginRequest('google')),
    loginFacebook: () => dispatch(socialLoginRequest('facebook')),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SignupPage);
