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
import {HomePage, NotFoundPage, LoginPage, IdpPage, UserPage, PatronPage, AdminPage, RegisterLibraryPage} from 'containers';
// import {  Footer } from 'components'
/* import GlobalStyle from 'global-styles'; */
import {SignupPage, ForgotPassword} from "containers";
import {makeSelectLocation} from './selectors'
import LibraryPage from "../Library/LibraryPage";


function App(props) {
  console.log("APP", props)

  useEffect(() => {
    props.dispatch(syncPersistanceRequest());
  }, []);

  const authProps = {
    auth: props.auth,
    isLogged: props.isLogged,
    logout: (request) => props.dispatch(requestLogout(request))
  }

  return (
    !props.auth.loading && 
      <Switch>
        <Route exact path={"/signup"}  component={() => <SignupPage {...authProps} history={history} />} />
        <Route path={"/forgot-password/:reset_token?"} component={({match}) => <ForgotPassword {...authProps} history={history} match={match} />} />
        <Route path="/idp-callback/:refresh_token" component={IdpPage} />

        {!props.isLogged && <Route component={() => <LoginPage {...authProps} tokensExistsExpired={props.tokensExistsExpired} />} />}

        <Route path="/user" component={() => <UserPage {...authProps}/> }  />
        <Route path="/patron" component={() => <PatronPage {...authProps} headermenu={true}/> }  />
        <Route path="/admin" component={() => <AdminPage {...authProps} headermenu={true}  /> }  />
        <Route path="/library/:library_id" component={({match}) => <LibraryPage {...authProps} match={match} headermenu={true} /> }  />

        <Route path="/register-library" component={() => <RegisterLibraryPage {...authProps} headermenu={false}/> }  />

        <Route path="/consortium" component={({match}) => <HomePage {...authProps}  match={match} headermenu={true}/> }  />
        <Route path="/institution" component={({match}) => <HomePage {...authProps}  match={match}  headermenu={true}/> } />
        <Route path="/alpe" component={() => <HomePage {...authProps}/> }  />
        <Route exact path="/" component={({routerProps,match}) => <HomePage {...authProps} match={match} />}/>
        <Route component={() => <NotFoundPage {...authProps} /> } path="*" />
      </Switch>
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
