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
      <Switch>
        <Route exact path={"/"} component={() => <ForgotPasswordForm auth={props.auth} requestToken={(request) => props.dispatch(requestForgotPassword(request))} />}/>
        {/*<Route component={NotFoundPage} />*/}
      </Switch>
      {/*{!props.auth.isForgotPasswordMode && <ForgotPasswordForm auth={props.auth} requestToken={(request) => props.dispatch(requestForgotPassword(request))} />}*/}
      {/*{ props.auth.isForgotPasswordMode && <TokenForm auth={props.auth} resetPassword={(request) => props.dispatch(requestResetPassword(request))} />}*/}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  //mapPage: makeSelectMapPage(),
  //wmsVisible: makeSelectVisibleWmsLayer()
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
