/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React,{useEffect,useState} from 'react';
import messages from './messages';
/*
import { FormattedMessage } from 'react-intl';
import {createStructuredSelector} from "reselect";
import {compose} from "redux";
import { connect } from 'react-redux'; */
import {BasePage} from "components";
//import userRoutes from "routes/userRoutes";
import history from 'utils/history';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectPatron, {isPatronLoading} from '../Patron/selectors';
import {useIntl} from 'react-intl';
import Fake from '../../components/Fake'

function HomePage(props) {
  console.log('HomePage', props)  
  const intl=useIntl();
  
  return ( //if registered or has many roles/abilities
    <>
      <BasePage {...props} routes={[]} messages={messages} >
       <h1 style={{color: 'green'}}>{intl.formatMessage({id:'app.containers.HomePage.header'})}</h1>
       <h3 style={{color: 'gray'}} className="mb-5">{intl.formatMessage({id:'app.containers.HomePage.subHeader'})}</h3>
       
      <br/>
      <h5>- display OA SEARCH INTERFACE</h5>
      <h5>- display other useless informations/text</h5>      
      <br/>      

      </BasePage>
    </>
  );
}


const mapStateToProps = createStructuredSelector({
  //isLoading: isPatronLoading(),
  //patron: makeSelectPatron()
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

export default compose(withConnect)(HomePage);
