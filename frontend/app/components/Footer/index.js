/**
 *
 * Footer
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import logo from 'images/logo.png';
import './style.scss';

function Footer(props) {
  const {changeLang}=props

  return (
    <footer className="app-footer">
      <div className="container">
        <div className="top">
          <div className="lang-change">
            <NavLink to="#" onClick={(e)=>changeLang('it')}>
              Italiano
            </NavLink>
            <NavLink to="#" onClick={(e)=>changeLang('en')}>
              English (UK)
            </NavLink>
            <NavLink to="#" onClick={(e)=>changeLang('es')}>
              Español
            </NavLink>
            <NavLink to="#" onClick={(e)=>changeLang('tr')}>
              Türkçe
            </NavLink>
            {/*<NavLink to="#" onClick={(e)=>changeLang('fr')}>
              Français (France)
            </NavLink>
            */}
          </div>
          <div className="footer-menu">          
            <>
              {props.isLogged && 
              <NavLink to="/register-library" activeClassName="current">
                {/* <i className="fa-solid fa-book"></i> */}
                <span><FormattedMessage {...messages.registerNewLibrary} /></span>
              </NavLink>
              }
              <NavLink to="#" activeClassName="current">
                  Manual
              </NavLink>
              <NavLink to="#" activeClassName="current">
                  Contacts
              </NavLink>              
            </>          
          {!props.isLogged && 
            <>              
            </>
          }
          </div>
        </div>
        <div className="footer-logos bottom align-items-end">
          <a href="" target="_blank"><img className='mh-100' src={logo} alt="logo" /></a>                    
          <span className="poweredby mh-100"><a href="https://github.com/tugn0x/Talaria" target="_blank">Powered by Talaria</a></span>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {};

export default Footer;
