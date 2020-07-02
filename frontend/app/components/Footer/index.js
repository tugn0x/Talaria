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
import logoCNR1 from 'images/cnr-footer-logo.png';
import logoCNR2 from 'images/cnr-footer-logo-2.png';
import './style.scss';

function Footer(props) {
  return (
    <footer className="app-footer">
      <div className="container">
        <div className="top">
          <div className="lang-change">
            <NavLink to="#">
              Italiano
            </NavLink>
            <NavLink to="#">
              English (UK)
            </NavLink>
            <NavLink to="#">
              Français (France)
            </NavLink>
            <NavLink to="#">
              Español
            </NavLink>
          </div>
          <div className="footer-menu">
          {props.isLogged && 
            <>
              <NavLink to="/register-library" activeClassName="current">
                {/* <i className="fa fa-book"></i> */}
                <span><FormattedMessage {...messages.registerNewLibrary} /></span>
              </NavLink>
              <NavLink to="#" activeClassName="current">
                  Manuale d' uso
              </NavLink>
              <NavLink to="#" activeClassName="current">
                  Nilde Worlds
              </NavLink>
              <NavLink to="#" activeClassName="current">
                  Rinnovo sottoscrizioni
              </NavLink>
              <NavLink to="#" activeClassName="current">
                  Contatti
              </NavLink>
              <NavLink to="#" activeClassName="current">
                  Licenze
              </NavLink>
              <NavLink to="#" activeClassName="current">
                  Avvertenze legali
              </NavLink>
            </>
          }
          {!props.isLogged && 
            <>
              Footer content if you r not logged
            </>
          }
          </div>
        </div>
        <div className="bottom d-flex align-items-center">
          <img src={logoCNR1} alt="CNR" />
          <img src={logoCNR2} alt="CNR Library" />
          <p className="copyright">Nilde &copy; 2020</p>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {};

export default Footer;
