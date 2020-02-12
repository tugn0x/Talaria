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
import ForgotPasswordForm from '../../../components';
import TokenForm from '../../../components';

import {requestForgotPassword, requestResetPassword} from '../AuthProvider/actions';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';


function ForgotPasswordPage(props) {
  console.log(props)
  return (
    <>
      {!props.match.params.reset_token && <h1>Qui il form!</h1>}
      {
        props.match.params.reset_token && <>LOADING... e poi response</>
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
