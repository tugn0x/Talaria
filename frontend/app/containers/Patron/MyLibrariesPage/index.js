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

import {useIntl} from 'react-intl';
import messages from './messages'
import {fields} from './fields'
import CustomForm from 'components/Form/CustomForm';
import {requestGetLibraryList} from '../actions'
import makeSelectPatron  from '../selectors';

function MyLibrariesPage(props) {
  // console.log('NUOVE PROPS', props)
  const intl = useIntl();
  const {patron, dispatch} = props

  useEffect(() => {
    console.log('NUOVE useEffect', props.patron.loading)
    if(!patron.loading) {
      props.dispatch(requestGetLibraryList())
    }
   }, [])

  return (
    <>
     <h2>My Libraries Page</h2>
     <CustomForm
      submitCallBack={() => null}
      librariesList={patron.librariesList}
      fields={fields}
      title="My Libraries Form"
      searchCustomSelect={(input) => {
        dispatch(requestGetLibraryList(input))

      }}
      />
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  patron: makeSelectPatron()
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
