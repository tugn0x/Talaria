/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, {useEffect} from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Loader from "components/Form/Loader";
import {BasePage} from "components";
import {requestGetLibrariesList} from '../actions'
import {useIntl} from 'react-intl';
import messages from './messages'

function MyLibrariesPage(props) {
  const intl = useIntl();

  useEffect(() => {
    console.log('mibraries poage')
    props.dispatch(requestGetLibrariesList())
   }, [])

  return (
    <>
     <h2>My Libraries Page</h2>
    </>
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
