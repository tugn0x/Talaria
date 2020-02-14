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

  const { auth, isLogged } = props

  return (
    <header className="app-header navbar bg-dark">
      {/*<FormattedMessage {...messages.header} />*/}
      {/*Qui ci dobbiamo passare i dati di auth*/}
      {/*<DefaultHeader/>*/}
      <AppNavbarBrand
        full={{ src: logo, width: 89, height: 25, alt: 'Nilde Logo' }}
        minimized={{ src: logomini, width: 30, height: 30, alt: 'Nilde Logo' }}
      />
      {/*<AppSidebarToggler className="d-md-down-none" display="lg" />*/}
      {/*
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" className="nav-link">Settings</NavLink>
          </NavItem>
        </Nav>
        */}
      <Nav className="ml-auto" navbar>
        {/*
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
        */}
        <UncontrolledDropdown nav direction="down">
          <DropdownToggle nav>
            {/*<img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />*/}
            <i className="fa fa-3x fa-user float-left"></i>
            <span className="user-name float-right">{auth.user.name}</span>
          </DropdownToggle>
          <DropdownMenu right>
            {
              isLogged && (
                <>
                  {
                    auth.permissions.resources && "libraries" in auth.permissions.resources && (<>
                      <DropdownItem header tag="div" className="text-center"><strong>Libraries</strong></DropdownItem>
                        {/*{auth.permissions.resources.libraries.map((item) => <DropdownItem><i className="fa fa-book"></i> {item.entity.name}</DropdownItem>)}*/}
                        {auth.permissions.resources.libraries.map((item) => <DropdownItem><i className="fa fa-book"></i> {item.resource.name}</DropdownItem>)}
                      <DropdownItem><i className="fa fa-book"></i> CNR</DropdownItem>
                      <DropdownItem><i className="fa fa-book"></i> Salaborsa</DropdownItem>
                      <DropdownItem divider />
                    </>)
                  }
                <DropdownItem header tag="div" className="text-center"><strong>User Account</strong></DropdownItem>
                {/*<DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>*/}
                {/*<DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>*/}
                {/*<DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>*/}
                {/*<DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>*/}
                <DropdownItem><i className="fa fa-user"></i><Link to="/user-profile">Profile</Link></DropdownItem>
                <DropdownItem><i className="fa fa-lock"></i><Link to="/change-password">Change Password</Link></DropdownItem>
                <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
                {/*<DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>*/}
                <DropdownItem onClick={e => props.logout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
                </>
              ) ||
              <DropdownItem><Link to="/">Login</Link></DropdownItem>
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
