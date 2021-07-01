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
import Fake from '../../components/Fake'
import {makeSelectLocation} from './selectors'
import LibraryPage from "../Library/LibraryPage";
import {changeLocale} from '../LanguageProvider/actions';


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

  const changeLanguage = (lang) => {
    console.log("change language:",lang)
    props.dispatch(changeLocale(lang));
  }

  return (
    !props.auth.loading && 
      <Switch>
        <Route exact path={"/signup"}  component={() => <SignupPage {...authProps} history={history} changeLang={changeLanguage} />} />
        <Route path={"/forgot-password/:reset_token?"} component={({match}) => <ForgotPassword {...authProps} history={history} match={match}  changeLang={changeLanguage}/>} />
        <Route path="/idp-callback/:refresh_token" component={IdpPage}  changeLang={changeLanguage}/>
        <Route path="/public/library/:library_id" component={({match}) => <Fake {...authProps} match={match} headermenu={true}  changeLang={changeLanguage} /> /*display Library List or single public library profile */}  />        

        {!props.isLogged && <Route component={() => <LoginPage {...authProps} tokensExistsExpired={props.tokensExistsExpired}  changeLang={changeLanguage} />} />}

        <Route path="/user" component={() => <UserPage {...authProps} changeLang={changeLanguage}/> }  />
        <Route path="/patron" component={() => <PatronPage {...authProps} headermenu={true} changeLang={changeLanguage} /> }  />
        <Route path="/admin" component={() => <AdminPage {...authProps} headermenu={true} changeLang={changeLanguage}  /> }  />
        <Route path="/library/:library_id" component={({match}) => <LibraryPage {...authProps} match={match} headermenu={true} changeLang={changeLanguage} /> }  />

        <Route path="/register-library" component={() => <RegisterLibraryPage {...authProps} headermenu={false} changeLang={changeLanguage}/> }  />

        <Route path="/project/:project_id" component={({match}) => <HomePage {...authProps}  match={match} headermenu={true} changeLang={changeLanguage}/> }  />
        <Route path="/consortium/:consortium_id" component={({match}) => <HomePage {...authProps}  match={match} headermenu={true} changeLang={changeLanguage}/> }  />
        <Route path="/institution/:institution_id" component={({match}) => <HomePage {...authProps}  match={match}  headermenu={true} changeLang={changeLanguage}/> } />
        <Route path="/alpe" component={({match}) => <HomePage {...authProps}  match={match} headermenu={true} changeLang={changeLanguage}/>}/>
        <Route exact path="/" component={({routerProps,match}) => <HomePage {...authProps} match={match} changeLang={changeLanguage} />}/>
        <Route component={() => <NotFoundPage {...authProps} changeLang={changeLanguage} /> } path="*" />
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
