/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { syncPersistanceRequest, isSync } from "../../persistence";

import {HomePage, NotFoundPage, LoginPage, IdpPage} from 'containers';

import GlobalStyle from '../../global-styles';
import {SignupPage, ForgotPassword} from "containers";


function App(props) {
  useEffect(() => {
    props.dispatch(syncPersistanceRequest());
  }, []);
  return (
    <div>
      <Switch>
        <Route exact path={"/signup"} component={() => <SignupPage auth={props.auth} history={history} />} />
        <Route path={"/forgot-password/:reset_token?"} component={({match}) => <ForgotPassword auth={props.auth} history={history} match={match} />} />
        <Route path="/idp-callback/:refresh_token" component={IdpPage} />
        {!props.isLogged && <Route component={() => <LoginPage auth={props.auth} tokensExistsExpired={props.tokensExistsExpired} />} />}
        <Route exact path="*" component={() => <HomePage auth={props.auth}/> }  />
        {/*<Route component={NotFoundPage} />*/}
      </Switch>
      <GlobalStyle />
    </div>
  );
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isSync: isSync(),
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

export default compose(withConnect)(App);
