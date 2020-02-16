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
import ProfileForm from 'components/Auth/ProfileForm';
import {requestProfileUpdate} from 'containers/Auth/AuthProvider/actions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Loader from "components/Form/Loader";

function ProfilePage(props) {
  return (
      <Loader show={props.auth.loading}>
        <ProfileForm
          requestError={props.auth.error}
          updateProfile={ (formData) => props.dispatch(requestProfileUpdate(formData)) }
          user={props.auth.user}
        />
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

export default compose(withConnect)((ProfilePage));
