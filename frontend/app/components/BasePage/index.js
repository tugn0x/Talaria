/**
 *
 * BasePage
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {Switch, Route, withRouter} from 'react-router-dom';
import {HeaderBar, SideBar} from 'components';
import {Container} from "reactstrap"
import SubHeaderBar from 'components/SubHeaderBar'

function BasePage(props) {
  console.log('BasePage',props)
  const lightRoutes = props.routes.filter((route)=>{
    return route;
  }).map((route)=>{
    return {
      ...route, 
      path: props.match.path+route.path, 
      url: route.url ? props.match.path+route.url : null, 
      component:null,
    }
  });
  
  return (
    <>
      <HeaderBar isLogged={props.isLogged} location={props.location} headermenu={props.headermenu} history={props.history} auth={props.auth} logout={(request) => props.logout(request)}/>
      <div className="app-body">
        {props.headermenu && (
          <SideBar routes={lightRoutes} location={props.location}/>
        )}
        <main className="main">
          <SubHeaderBar routes={lightRoutes} headermenu={props.headermenu} />
          <h1 className="container"><FormattedMessage {...props.messages.header} /></h1>
          <Container>
            <Switch>
              {props.routes && props.routes.map((route, idx) => {
                // console.log(`${props.match.path}`)
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
