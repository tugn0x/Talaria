/**
 *
 * SubRouteSwitch
 *
 */

import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {Switch, Route, withRouter} from 'react-router-dom';
import {HeaderBar, SideBar} from 'components';
import {Container} from "reactstrap"


function SubRouteSwitch(props) {
  console.log('SubRouteSwitch',props)
  const currRoute = props.routes.filter(route => props.match.path.includes(route.path))
 
  return (
    <>
            <Switch>
              {currRoute[0].children.length && currRoute[0].children.map((route, idx) => {
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
    </>
  );
}

SubRouteSwitch.propTypes = {};

export default withRouter(SubRouteSwitch);
