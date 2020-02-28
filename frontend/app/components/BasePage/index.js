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

  const isCurrentPage = (pagePath) => {
    // console.log(props.location)
    /*
    TODO: IMPROVE REGEX!
    */
    return pagePath === props.location.pathname || new RegExp(`^\/${pagePath.replace("/", "\/")}(.*?)`).test(props.location.pathname);
  };

  const mapRoutes = (routes, auth) => {
    return filterRoutes(routes, auth).map((route)=>{
      const url = route.url ? props.match.path+route.url : props.match.path+route.path
      return {
        ...route,
        path: props.match.path+route.path,
        url: url,
        component:null,
        current: isCurrentPage(url),
        children: route.children ? mapRoutes(filterRoutes(route.children, auth)) : []
      }
    })
  }

  const filterRoutes = (routes, auth) => {
    return routes.filter((route)=>{
        /*
        TODO: ADDING ROLES & PERMISSION CHECK
         */
        return true;
      })
  }

  const lightRoutes = mapRoutes(props.routes, props.auth)

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
