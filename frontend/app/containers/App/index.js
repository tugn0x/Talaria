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
import {requestLogout} from "../Auth/AuthProvider/actions";
import {HomePage, NotFoundPage, LoginPage, IdpPage, UserPage} from 'containers';
import { HeaderBar, Footer } from 'components'
import GlobalStyle from 'global-styles';
import {SignupPage, ForgotPassword} from "containers";
import {makeSelectLocation} from './selectors'

function App(props) {
  console.log("APP", props)

  useEffect(() => {
    props.dispatch(syncPersistanceRequest());
  }, []);



  return (
    <div>
      {/*<HeaderBar isLogged={props.isLogged} auth={props.auth} logout={(request) => props.dispatch(requestLogout(request))}/>*/}
      <Switch>
        <Route exact path={"/signup"}  component={() => <SignupPage auth={props.auth} history={history} />} />
        <Route path={"/forgot-password/:reset_token?"} component={({match}) => <ForgotPassword auth={props.auth} history={history} match={match} />} />
        <Route path="/idp-callback/:refresh_token" component={IdpPage} />
        {!props.isLogged && <Route component={() => <LoginPage auth={props.auth} tokensExistsExpired={props.tokensExistsExpired} />} />}

        <Route path="/user" component={() => <UserPage auth={props.auth}/> }  />

        <Route path="/patron" component={() => <HomePage auth={props.auth}/> }  />
        <Route path="/library" component={() => <HomePage auth={props.auth}/> }  />
        <Route path="/consortium" component={() => <HomePage auth={props.auth}/> }  />
        <Route path="/institution" component={() => <HomePage auth={props.auth}/> }  />
        <Route path="/alpe" component={() => <HomePage auth={props.auth}/> }  />
        <Route path="/" component={(routerProps) => <HomePage auth={props.auth}>
          <h1 style={{color: 'green'}}>ciao</h1>
        </HomePage> }/>
        {/*<Route component={NotFoundPage} />*/}
      </Switch>
      <GlobalStyle />
      <Footer/>
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
