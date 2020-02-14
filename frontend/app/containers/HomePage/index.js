/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { HeaderBar, Footer } from 'components'
import { Switch, Route } from 'react-router-dom';
import {requestProfileUpdate, requestChangePassword} from "../Auth/AuthProvider/actions";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";
import { connect } from 'react-redux';
import Profile from '../User/Profile';
import ChangePassword from '../User/ChangePassword';
/*
<Route path={"/library"} component={Library}/>
<Route path={"/institute"} component={Institute}/>
<Route path={"/p"} component={Patron}/>
*/

export const Routes = (props) => {

  return (
    <Switch>
      <Route exact path={"/user-profile"} component={() => <Profile loading={props.auth.loading} user={props.auth.user} updateProfile={(formData) => props.dispatch(requestProfileUpdate(formData)) } />}/>
      <Route exact path={"/change-password"} component={() => <ChangePassword loading={props.auth.loading} changePassword={(formData) => props.dispatch(requestChangePassword(formData)) } />}/>
      <Route exact path={"/"} component={() => <h1><FormattedMessage {...messages.header} /> HOOOOME PAGE</h1>}/>
    </Switch>
  )
}

function HomePage(props) {
 // console.log(props)
  return (
    <>
      <div className="app sidebar-minimized sidebar-show">
        <div className="app-body">
          <div className="sidebar">
              Menu contestuale
          </div>
          <main className="main">
            <Routes auth={props.auth} dispatch={props.dispatch}/>
          </main>
        </div>
        <Footer/>
      </div>
    </>
  );
}
const mapStateToProps = createStructuredSelector({

});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
