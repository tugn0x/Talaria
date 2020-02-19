/**
 *
 * BasePage
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {Switch, Route, withRouter} from 'react-router-dom';
import {HeaderBar} from 'components';
import {Container} from "reactstrap"

function BasePage(props) {
  console.log('BasePage',props)

  return (
    <>
      <HeaderBar isLogged={props.isLogged} history={props.history} auth={props.auth} logout={(request) => props.logout(request)}/>
      {props.headermenu && (
        <div>HEADER SECONDARIO</div>
      )}
      <div className="app-body">
        {props.headermenu && (
          <div className="sidebar">
            Menu contestuale
          </div>
        )}
        <main className="main">
          <h1><FormattedMessage {...props.messages.header} /></h1>
          <Container>
            <Switch>
              {props.routes && props.routes.map((route, idx) => {
                console.log('props', props)
                return route.component ? (
                  <Route
                    key={'userRoutes_'+idx}
                    // path={route.path}
                    path={`${props.match.path}${route.path}`}
                    // exact={route.exact}
                    name={route.name}
                    render={routeProps => (
                      <route.component {...props} {...routeProps} />
                    )} />
                ) : (null);
              })}
            </Switch>
            {props.children}
          </Container>
        </main>
      </div>
    </>
  );
}

BasePage.propTypes = {};

export default withRouter(BasePage);
