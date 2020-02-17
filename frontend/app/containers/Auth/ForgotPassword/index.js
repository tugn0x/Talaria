/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import ForgotPasswordForm from 'components/Auth/ForgotPasswordForm';
import ResetPasswordForm from 'components/Auth/ResetPasswordForm';
import {requestForgotPassword, requestResetPassword} from 'containers/Auth/AuthProvider/actions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Loader from "components/Form/Loader";
import {useIntl} from 'react-intl';

function ForgotPasswordPage(props) {
  const intl = useIntl();
  return (
    <>
      {!props.match.params.reset_token && !props.auth.isForgotPasswordMode &&
        <Loader show={props.auth.loading}>
          <ForgotPasswordForm forgot={ (formData) => props.dispatch(requestForgotPassword(formData)) } />
        </Loader>
      }
      {
         (props.match.params.reset_token || props.auth.isForgotPasswordMode) &&
          <ResetPasswordForm  reset={(formData) => props.dispatch(requestResetPassword(formData, intl.formatMessage({ id: 'app.containers.ResetPassword.updateMessage' })))} token={props.match.params.reset_token}/>
      }
    </>
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
