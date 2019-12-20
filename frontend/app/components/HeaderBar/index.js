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

function HeaderBar() {
  return (
    <header className="app-header navbar">
      <FormattedMessage {...messages.header} />
      Qui ci dobbiamo passare i dati di auth
    </header>
  );
}

HeaderBar.propTypes = {};

export default HeaderBar;
