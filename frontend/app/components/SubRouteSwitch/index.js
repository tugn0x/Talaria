/**
 *
 * SubRouteSwitch
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {Switch, Route, withRouter} from 'react-router-dom';
import {HeaderBar, SideBar} from 'components';
import {Container} from "reactstrap"


function SubRouteSwitch(props) {
  console.log('SubRouteSwitch',props)
  return (
    <>
            <Switch>
              {props.routes && props.routes[0].children.map((route, idx) => {
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
