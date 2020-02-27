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
        <ul className="nav">
          {
            routes.map((route) => (
              <li key={route.name} className="nav-item">
                <a className="nav-link" href={route.path}>{route.name}</a>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

SideBar.propTypes = {};

export default SideBar;
