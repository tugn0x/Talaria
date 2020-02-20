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

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from 'images/logo_home.gif'
import logomini from 'images/logo.png'

function HeaderBar(props) {
  // console.log('HeaderBar', props)
  
  const { auth, isLogged, history } = props

  const linkTo = (path) => {
    history.push(`${path}`)
  };

  return (
    <header className="app-header navbar bg-dark">
      {isLogged && <AppSidebarToggler className="d-md-down-none" display="lg"/>}
      {/*Qui ci dobbiamo passare i dati di auth*/}
      {/*<DefaultHeader/>*/}
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
                <i className="fa fa-3x fa-user float-left"></i>
                <span className="user-name float-right">{auth.user.name}</span>
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
                <DropdownItem onClick={() => linkTo("/patron/my-libraries")}><i className="fa fa-user"></i><span>Patron</span></DropdownItem>
                <DropdownItem onClick={() => linkTo("/user/user-profile")}><i className="fa fa-user"></i><span><FormattedMessage {...messages.Profile} /></span></DropdownItem>
                <DropdownItem onClick={() => linkTo("/user/change-password")}><i className="fa fa-lock"></i><span><FormattedMessage {...messages.ChangePassword} /></span></DropdownItem>
                <DropdownItem onClick={e => props.logout(e)}><i className="fa fa-lock"></i><FormattedMessage {...messages.Logout} /></DropdownItem>
                </>
              )
            }

          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
      {/*<AppAsideToggler className="d-md-down-none" />*/}
      {/*<AppAsideToggler className="d-lg-none" mobile />*/}
    </header>
  );
}

HeaderBar.propTypes = {};

export default HeaderBar;
