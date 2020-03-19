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
import { generatePath } from "react-router";


function BasePage(props) {
  console.log('BasePage',props)

  const isCurrentPage = (pagePath) => {
    return pagePath === props.location.pathname || new RegExp(`^${pagePath.replace("/", "\/")}(.*?)`).test(props.location.pathname);
  };

  const mapRoutes = (routes, auth, prefix) => {
    // console.log(props.match)
    // console.log(prefix, 'prefix')
    return filterRoutes(routes, auth).map((route)=>{
      const url = route.url ? generatePath(props.match.path+route.url, props.match.params) : generatePath(props.match.path+route.path, props.match.params)
      // console.log(url, prefix, props.match.path, route.path)
      return {
        ...route,
        // path: prefix+props.match.path+route.path,
        path: generatePath(`${prefix+props.match.path+route.path}`, props.match.params),
        url: url,
        component:null,
        current: isCurrentPage(url),
        children: route.children ? mapRoutes(route.children, auth, route.path) : []
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

  const lightRoutes = mapRoutes(props.routes, props.auth, '')

  
  return (
    <>

      <HeaderBar
        isLogged={props.isLogged}
        routes={lightRoutes}
        location={props.location}
        headermenu={props.headermenu}
        history={props.history}
        auth={props.auth}
        logout={(request) => props.logout(request)}/>
      <div className="app-body">
        {props.headermenu && (
          <SideBar routes={lightRoutes} location={props.location}/>
        )}
        <main className="main">
          <Container>
            <Switch>
              {props.routes && props.routes.map((route, idx) => {
                return route.component ? (
                  <Route
                    key={'userRoutes_'+idx}
                    // path={route.path}
                    path={`${props.match.path}${route.path}`}
                    exact={route.exact ? route.exact : false}
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
