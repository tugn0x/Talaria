/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Switch, Route } from 'react-router-dom';
import ForgotPasswordForm from '../../../components/Auth/ForgotPasswordForm';
import ResetPasswordForm from '../../../components/Auth/ResetPasswordForm';
import {requestForgotPassword, requestResetPassword} from '../AuthProvider/actions';
import { createStructuredSelector } from 'reselect';
import requestError from './selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';


function ForgotPasswordPage(props) {
  console.log(props)
  const {requestError} = props

  return (
    <>
      {!props.match.params.reset_token && !props.auth.isForgotPasswordMode && <ForgotPasswordForm requestError={requestError} forgot={ (email) => props.dispatch(requestForgotPassword({"email": email})) } /> }
      {
        (props.auth.isForgotPasswordMode || props.match.params.reset_token) && <>ciaociasdejfgrjge</> && <ResetPasswordForm token={props.match.params.reset_token}/>
      }
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  requestError: requestError(),
 // requestSuccess: requestSuccess(),
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

export default compose(withConnect)((ForgotPasswordPage));
