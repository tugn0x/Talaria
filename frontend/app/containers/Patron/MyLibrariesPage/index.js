/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import ProfileForm from 'components/Auth/ProfileForm';
import {requestProfileUpdate} from 'containers/Auth/AuthProvider/actions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Loader from "components/Form/Loader";
import {useIntl} from 'react-intl';

function MyLibrariesPage(props) {
  const intl = useIntl();
  return (
      <Loader show={props.auth.loading}>
        {/*<ProfileForm*/}
        {/*  updateProfile={ (formData) => props.dispatch(requestProfileUpdate(formData, intl.formatMessage({ id: 'app.containers.MyLibrariesPage.updateMessage' }))) }*/}
        {/*  user={props.auth.user}*/}
        {/*/>*/}
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

export default compose(withConnect)((MyLibrariesPage));
