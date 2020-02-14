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
import {Container,Row, Col, Card, CardBody} from 'reactstrap'
import ForgotPasswordForm from 'components/Auth/ForgotPasswordForm';
import ResetPasswordForm from 'components/Auth/ResetPasswordForm';
import {requestForgotPassword, requestResetPassword} from 'containers/Auth/AuthProvider/actions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Loader from "components/Form/Loader";

function ForgotPasswordPage(props) {
  return (
    <>
      {!props.match.params.reset_token && !props.auth.isForgotPasswordMode &&
        <Loader show={props.auth.loading}>
          <ForgotPasswordForm requestError={props.auth.error} forgot={ (formData) => props.dispatch(requestForgotPassword(formData)) } />
        </Loader>
      }
      {
         (props.match.params.reset_token || props.auth.isForgotPasswordMode) &&
          <ResetPasswordForm requestError={props.auth.error}  reset={(formData) => props.dispatch(requestResetPassword(formData))} token={props.match.params.reset_token}/>
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
