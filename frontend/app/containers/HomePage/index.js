/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Footer } from 'components'
import { Switch, Route } from 'react-router-dom';
import {createStructuredSelector} from "reselect";
import {compose} from "redux";
import { connect } from 'react-redux';
import userRoutes from "routes/userRoutes";


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
            <Switch>
                <Route exact path={"/"} component={() => <h1><FormattedMessage {...messages.header} /> HOOOOME PAGE</h1>}/>
              {userRoutes.map((route, idx) => {
                console.log('props', props)
                return route.component ? (
                  <Route
                    key={'userRoutes_'+idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={routeProps => (
                      <route.component {...props} {...routeProps} />
                    )} />
                ) : (null);
              })}
            </Switch>
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
