/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Switch, Route } from 'react-router-dom';
import {Container,Row, Col, Card, CardBody} from 'reactstrap'
import ChangePasswordForm from 'components/Auth/ChangePasswordForm';
import {requestChangePassword} from 'containers/Auth/AuthProvider/actions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Loader from "components/Form/Loader";
import {useIntl} from 'react-intl';

function ChangePasswordPage(props) {
  const intl = useIntl();
  return (
      <Loader show={props.auth.loading}>
        <ChangePasswordForm changePassword={ (formData) => props.dispatch(requestChangePassword(formData, intl.formatMessage({ id: 'app.containers.ChangePassword.updateMessage' }))) } />
      </Loader>
  );
}

const mapStateToProps = createStructuredSelector({

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)((ChangePasswordPage));
