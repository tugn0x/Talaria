/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import {requestForgotPassword, requestResetPassword} from 'containers/Auth/AuthProvider/actions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {useIntl} from 'react-intl';
import { BasePage, Loader, ForgotPasswordForm, ResetPasswordForm } from "components";
import messages from "./messages";

function ForgotPasswordPage(props) {
  const intl = useIntl();
  return (
    <BasePage {...props} routes={[]} messages={messages}>
      {!props.match.params.reset_token && !props.auth.isForgotPasswordMode &&
        <Loader show={props.auth.loading}>
          <ForgotPasswordForm forgot={ (formData) => props.dispatch(requestForgotPassword(formData, intl.formatMessage({ id: 'app.components.ForgotPasswordForm.mailSentMessage' }))) } />
        </Loader>
      }
      {
         (props.match.params.reset_token /*|| props.auth.isForgotPasswordMode*/) && 
          <ResetPasswordForm  reset={(formData) => props.dispatch(requestResetPassword(formData, intl.formatMessage({ id: 'app.components.ResetPasswordForm.updateMessage' })))} token={props.match.params.reset_token}/>
      }
    </BasePage>
  );
}

const mapStateToProps = createStructuredSelector({

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
