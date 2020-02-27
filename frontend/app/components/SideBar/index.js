/**
 *
 * SideBar
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

function SideBar(props) {
  console.log('SideBar', props)

  const { auth, isLogged, history, headermenu } = props

  const routes = props.routes.filter((item)=>item.menu);

  const linkTo = (path) => {
    history.push(`${path}`)
  };

  const isCurrentPage = (pagePath) => {
    // console.log(pagePath, props.location.pathname)
    return new RegExp(`^\/${pagePath.replace("/", "\/")}(.*?)`).test(props.location.pathname);
  };


  return (
    <div className="sidebar">
      <div className="scrollbar-container sidebar-nav ps ps-container">
        {/*<p>Menu Contestuale</p>*/}
        <ul>
          <li>SISTEMARE IL COLORE A QUESTI IN BASSO</li>
          {
            routes.map((item)=>(<li><a href={item.path}>{item.name}</a></li>))
          }
        </ul>
      </div>
    </div>
  );
}

SideBar.propTypes = {};

export default SideBar;
