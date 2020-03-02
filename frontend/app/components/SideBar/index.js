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
import './style.scss'

function SideBar(props) {
  console.log('SideBar', props)

  const { auth, isLogged, history, headermenu } = props

  const current = props.routes.filter((route)=>route.current)
  const routes = current.length ? current[0].children : [];

  return routes && routes.length > 0 ? (
    <div className="sidebar">
      <div className="scrollbar-container sidebar-nav ps ps-container">
        <nav>
          {routes.map((route) => (
            <NavLink
              className="nav-link btn"
              key={route.name} 
              to={`${route.url ? route.url : route.path}`}
              activeClassName="current"
            >
              <i className={`fa fa-${route.icon ? route.icon : ''}`}></i>
              {route.name}
            </NavLink>
           )
          )}
        </nav>
      </div>
    </div>
  ) : null
}

SideBar.propTypes = {};

export default SideBar;
