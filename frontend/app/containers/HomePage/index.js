/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { HeaderBar, Footer } from '../../components'
import { Switch, Route } from 'react-router-dom';
import {requestLogout} from "../Auth/AuthProvider/actions";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";
import { connect } from 'react-redux';
import Profile from '../User/Profile'
/*
<Route path={"/library"} component={Library}/>
<Route path={"/institute"} component={Institute}/>
<Route path={"/p"} component={Patron}/>
*/

export const Routes = (props) => {
  console.log(props)
  return (
    <Switch>
      <Route exact path={"/user-profile"} component={() => <Profile user={props.auth.user} />}/>
    </Switch>
  )
}

function HomePage(props) {
  return (
    <>
      <div className="app sidebar-minimized sidebar-show">
        <HeaderBar auth={props.auth} logout={(request) => props.dispatch(requestLogout(request))}/>
        <div className="app-body">
          <div className="sidebar">
              Menu contestuale
          </div>
          <main className="main">
            <h1>
              <FormattedMessage {...messages.header} /> HOOOOME PAGE
            </h1>
            <Routes auth={props.auth} />
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
