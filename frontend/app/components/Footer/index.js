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

function Footer(props) {
  return (
    <footer className="app-footer">
      {props.isLogged && 
        <NavLink to="/register-library" activeClassName="current">
          <i className="fa fa-book"></i>
          <span><FormattedMessage {...messages.registerNewLibrary} /></span>
        </NavLink>
      }
      {!props.isLogged && 
        <>
          Footer content here
          <FormattedMessage {...messages.header} />
        </>
      }
    </footer>
  );
}

Footer.propTypes = {};

export default Footer;
