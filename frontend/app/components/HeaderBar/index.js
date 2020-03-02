/**
 *
 * HeaderBar
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Link, NavLink } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, UncontrolledDropdown, Badge, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import SubHeaderBar from 'components/SubHeaderBar'
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from 'images/logo_home.gif'
import logomini from 'images/logo.png'
import './style.scss'


function HeaderBar(props) {
  // console.log('HeaderBar', props)

  const { auth, isLogged, history, headermenu, routes } = props
  
  const currentRoute = routes.filter(route => route.current);
  
  /* const linkTo = (path) => {
    history.push(`${path}`)
  }; */

  const isCurrentPage = (pagePath) => {
    /*
    TODO: IMPROVE REGEX!
    */
    return pagePath === props.location.pathname || new RegExp(`^\/${pagePath.replace("/", "\/")}(.*?)`).test(props.location.pathname);
  };
  

  return (
    <>
      <header className="app-header navbar bg-grey-light px-4">
        <div className="header-container container">
          {isLogged && headermenu && currentRoute && currentRoute[0].children.length > 0 && <AppSidebarToggler  display="xs"/>}
          <AppNavbarBrand
            full={{ src: logo, width: 89, height: 25, alt: 'Nilde Logo' }}
            minimized={{ src: logomini, width: 30, height: 30, alt: 'Nilde Logo' }}
            href={'/'}
          />
          <Nav className="ml-auto" navbar>
            {
              !isLogged && (<NavItem>
                <Link to="/login" className="nav-link">Login</Link>
              </NavItem>)
            }
            <UncontrolledDropdown nav direction="down">
              <DropdownToggle nav>
                { isLogged && (
                    <>
                      <i className="fa fa-2x fa-user d-table-cell"></i>
                      <span className="user-name d-none d-md-table-cell align-middle px-3">{auth.user.name}</span>
                      <i className="fa fa-2x fa-sort-down d-table-cell align-middle"></i>
                    </>
                  )
                }
              </DropdownToggle>
              <DropdownMenu right>
                {
                  isLogged && (
                    <>
                      {
                        auth.permissions.resources && "libraries" in auth.permissions.resources && (<>
                          <DropdownItem header tag="div" className="text-center"><strong><FormattedMessage {...messages.Libraries} /></strong></DropdownItem>
                            {auth.permissions.resources.libraries.map((item) => <DropdownItem><i className="fa fa-book"></i> {item.resource.name}</DropdownItem>)}
                          <DropdownItem divider />
                        </>)
                      }
                    <DropdownItem header tag="div" className="text-center"><FormattedMessage {...messages.UserAccount} /></DropdownItem>
                    {/*<DropdownItem onClick={() => linkTo("/patron/my-libraries")}><i className="fa fa-user"></i><span>Patron</span></DropdownItem>*/}
                      <NavLink to="/user/user-profile" className="dropdown-item btn" activeClassName="current">
                        <i className="fa fa-user"></i>
                        <span><FormattedMessage {...messages.Profile} /></span>
                      </NavLink>
                      <NavLink to="/user/change-password" className="dropdown-item btn" activeClassName="current">
                        <i className="fa fa-lock"></i>
                        <span><FormattedMessage {...messages.ChangePassword} /></span>
                      </NavLink>
                      <NavLink to="#" onClick={e => props.logout(e)} className="dropdown-item btn" activeClassName="current">
                        <i className="fa fa-lock"></i>
                        <span><FormattedMessage {...messages.Logout} /></span>
                      </NavLink>
                    </>
                  )
                }

              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </div>
      </header>
      <SubHeaderBar routes={routes} headermenu={headermenu} />
    </>
  );
}

HeaderBar.propTypes = {};

export default HeaderBar;
