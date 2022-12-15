/**
 *
 * BasePage
 *
 */ 

import React, { useEffect } from 'react';
import {Switch, Route, withRouter,Redirect} from 'react-router-dom';
import {HeaderBar, SideBar, Footer} from 'components';
import {Container, Row, Col} from "reactstrap"
import { generatePath } from "react-router";
import {
  CSSTransition,
} from 'react-transition-group';
import ButtonToTop from 'components/Button/ButtonToTop'
import {checkRoutePermission} from 'utils/permissions'
import useGetWindowSize from 'utils/useGetWindowSize'

function BasePage(props) {
  console.log('BasePage',props)
  const [mounted, setMounted] = React.useState(false)
  const windowSize = useGetWindowSize()
  const isCurrentPage = (pagePath) => {
    return pagePath === props.location.pathname || new RegExp(`^${pagePath.replace("/", "\/")}(.*?)`).test(props.location.pathname);
  };

  const mapRoutes = (routes, auth, resource, prefix) => {
    // console.log("mapRoutes",routes,auth,resource)
    // console.log(prefix, 'prefix')
    return filterRoutes(routes, auth, resource).map((route)=>{
      //console.log("mapRoutes -> filterRoutes",route,auth,resource)
      const url = route.url ? generatePath(props.match.path+route.url, props.match.params) : generatePath(props.match.path+route.path, props.match.params)
      //console.log("children route",route)
      //console.log("children route children",route.children)
      //console.log("children route resource",resource)
      return {
        ...route,
        path: generatePath(`${prefix+props.match.path+route.path}`, props.match.params),
        url: url,
        component:null,
        current:  isCurrentPage(url),
        children: route.children ? mapRoutes(route.children, auth, resource, route.path) : []
      }
    })
  }

  const hideRoute=(route) => {
    if(route.hide) return route.hide;

    return false;

  }

  const filterRoutes = (routes, auth, resource) => {
    return routes.filter((route)=>{
      return checkRoutePermission(auth, route, resource) && !hideRoute(route)
    })
  }

  //route da visualizzare nel menu (filtrate in base al ruolo/permessi sulla risorsa)
  const lightRoutes = props.routes && mapRoutes(props.routes, props.auth, props.resource, '')
  //console.log("lightRoutes",lightRoutes)
  //console.log("lightRoutes route",props.routes)
  const closeSideBar = () => {
    const body = document.querySelector('body')
    if(body.classList.contains('sidebar-show')){
      body.classList.remove('sidebar-show')
    }
  }


  React.useEffect(() => {
    setMounted(true)    
  },[]) 

  return (
    <>
      <HeaderBar
        match={props.match}
        isLogged={props.isLogged}
        routes={lightRoutes}
        location={props.location}
        headermenu={props.headermenu}
        isMobile={windowSize === 'mobile' ? true : false}
        history={props.history}
        auth={props.auth}
        logout={(request) => props.logout(request)}/>
      <CSSTransition classNames="fade" unmountOnExit timeout={300} in={mounted} >
        <>
          <div className="app-body" onClick={closeSideBar}>
            {props.headermenu && 
            windowSize === 'mobile' && (
              <SideBar 
                windowSize={windowSize} 
                routes={lightRoutes} 
                location={props.location}/>
            )}
            <main className={`${!props.isLogged ? "main login-main" : "main"}`}>
              <Container>
                <Row>
                  {windowSize === 'desktop' && 
                      <Col md={3}>
                        <SideBar 
                          windowSize={windowSize} 
                          routes={lightRoutes} 
                          location={props.location}/>
                      </Col>
                  }
                  <Col md={windowSize === 'desktop' ? 9 : 12}>         
                    <Switch>
                      {props.routes && 
                      /*props.routes.filter((route)=>{
                        //filtro in base al ruolo/permessi sulla risorsa
                        return checkRoutePermission(props.auth, route, props.resource)
                      })*/
                      props.routes.map((route, idx) => {                        
                        return route.component ? (
                          <Route
                            key={'userRoutes_'+idx}
                            // path={route.path}
                            path={`${props.match.path}${route.path}`}
                            exact={route.exact ? route.exact : false}
                            name={route.name}
                            render={routeProps => 
                              /*if authorized goes to component, otherwise redirect to notauth page*/
                              checkRoutePermission(props.auth, route, props.resource) ? 
                                (<route.component {...props} {...routeProps} />)
                                : (<Redirect to="/autherror"/>)
                            } />
                        ) : (null);
                      })}
                    </Switch>
                  </Col>
                </Row>
                 {props.children}
              </Container>
            </main>
          </div>
          <Footer changeLang={props.changeLang} isLogged={props.isLogged} />
          <ButtonToTop />
        </>
      </CSSTransition>
    </>
  );
}

BasePage.propTypes = {};

export default withRouter(BasePage);
