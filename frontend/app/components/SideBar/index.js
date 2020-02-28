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

  const routes = props.routes.filter((route)=>route.menu);

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
        {console.log(routes)}
        <ul className="nav">
          {routes.map((route) => {
              if(route.children && route.children.length > 0){
                return (
                  <>
                  <li key={route.name} className="nav-item">
                    <a className="nav-link" href={`${route.url ? route.url : route.path}`}>{route.name}</a>
                  </li>
                  {route.children.map(child => {
                    console.log(child)
                    return (<li key={child.name} className="nav-item">
                      <a className="nav-link" href={`${child.url ? child.url : child.path}`}>{child.name}</a>
                    </li>)
                  })}
                 </>
                )
              }else {
                return (
                  <li key={route.name} className="nav-item">
                    <a className="nav-link" href={`${route.url ? route.url : route.path}`}>{route.name}</a>
                  </li>
                )
              }
            })
          }
        </ul>
      </div>
    </div>
  );
}

SideBar.propTypes = {};

export default SideBar;
