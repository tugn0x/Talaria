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
import MyLibraryPage from '../../containers/Patron/MyLibraryPage/Loadable'

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
        <Route exact path="/" component={({routerProps,match}) => <HomePage {...authProps} match={match} changeLang={changeLanguage} />}/>

        <Route exact path={"/signup"}  component={() => <SignupPage {...authProps} history={history} changeLang={changeLanguage} />} />
        <Route path={"/forgot-password/:reset_token?"} component={({match}) => <ForgotPassword {...authProps} history={history} match={match}  changeLang={changeLanguage}/>} />
        <Route path="/idp-callback/:refresh_token" component={IdpPage}  changeLang={changeLanguage}/>
        <Route path="/public/library/:library_id" component={({match}) => <Fake {...authProps} match={match} headermenu={true}  changeLang={changeLanguage} /> }  />        

        

        <Route path="/openurltest" component={({match}) => props.isLogged?<Fake {...authProps} match={match} headermenu={true}  changeLang={changeLanguage} />:<LoginPage {...authProps} match={match} tokensExistsExpired={props.tokensExistsExpired}  changeLang={changeLanguage} />}  />        
        <Route path="/login" component={(match) => <LoginPage {...authProps}  match={match} headermenu={true} changeLang={changeLanguage}/>}/>

        <Route path="/user" component={({match}) =>  props.isLogged?<UserPage {...authProps} changeLang={changeLanguage}/>:<LoginPage {...authProps} match={match} tokensExistsExpired={props.tokensExistsExpired}  changeLang={changeLanguage} /> }  />
        <Route path="/patron" component={({match}) =>  props.isLogged?<PatronPage {...authProps} headermenu={true} changeLang={changeLanguage} />:<LoginPage {...authProps} match={match} tokensExistsExpired={props.tokensExistsExpired}  changeLang={changeLanguage} /> }  />
        <Route path="/admin" component={({match}) =>  props.isLogged?<AdminPage {...authProps} headermenu={true} changeLang={changeLanguage}  />:<LoginPage {...authProps} match={match} tokensExistsExpired={props.tokensExistsExpired}  changeLang={changeLanguage} /> }  />
        <Route path="/library/:library_id" component={({match}) =>  props.isLogged?<LibraryPage {...authProps} match={match} headermenu={true} changeLang={changeLanguage} />:<LoginPage {...authProps} match={match} tokensExistsExpired={props.tokensExistsExpired}  changeLang={changeLanguage} /> }  />
        

        <Route path="/register-library" component={({match}) =>  props.isLogged?<RegisterLibraryPage {...authProps} headermenu={false} changeLang={changeLanguage}/>:<LoginPage {...authProps} match={match} tokensExistsExpired={props.tokensExistsExpired}  changeLang={changeLanguage} /> }  />
        <Route path="/associate-library" component={({match}) =>  props.isLogged?<MyLibraryPage match={match}{...authProps}  changeLang={changeLanguage}/>:<LoginPage {...authProps} match={match} tokensExistsExpired={props.tokensExistsExpired}  changeLang={changeLanguage} />}   />

        <Route path="/project/:project_id" component={({match}) =>  props.isLogged?<HomePage {...authProps}  match={match} headermenu={true} changeLang={changeLanguage}/>:<LoginPage {...authProps} match={match} tokensExistsExpired={props.tokensExistsExpired}  changeLang={changeLanguage} /> }  />
        <Route path="/consortium/:consortium_id" component={({match}) =>  props.isLogged?<HomePage {...authProps}  match={match} headermenu={true} changeLang={changeLanguage}/>:<LoginPage {...authProps} match={match} tokensExistsExpired={props.tokensExistsExpired}  changeLang={changeLanguage} /> }  />
        <Route path="/institution/:institution_id" component={({match}) =>  props.isLogged?<HomePage {...authProps}  match={match}  headermenu={true} changeLang={changeLanguage}/>:<LoginPage {...authProps} match={match} tokensExistsExpired={props.tokensExistsExpired}  changeLang={changeLanguage} /> } />
        <Route path="/alpe" component={({match}) =>  props.isLogged?<HomePage {...authProps}  match={match} headermenu={true} changeLang={changeLanguage}/>:<LoginPage {...authProps} match={match} tokensExistsExpired={props.tokensExistsExpired}  changeLang={changeLanguage} />}/>        

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
