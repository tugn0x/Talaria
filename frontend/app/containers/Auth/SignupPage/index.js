/**
 *
 * SignupPage
 *
 */

import React, { useState,useEffect } from 'react';
import { withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import messages from './messages';
import {requestSignup, socialLoginPrepare, socialLoginRequest} from '../AuthProvider/actions';
import { SignupForm, BasePage } from "components";
import {Redirect} from 'react-router-dom'


export function SignupPage(props) {
  console.log("SignupPage:",props)

  const [mounted,setMounted]=useState(false);
  
  /*const fb_enabled=(process.env.FACEBOOK_LOGIN && process.env.FACEBOOK_LOGIN=="true")?true:false;
  const google_enabled=(process.env.GOOGLE_LOGIN && process.env.GOOGLE_LOGIN=="true")?true:false; 
  
  useEffect(() => {
    if(fb_enabled||google_enabled)
      props.prepareSocialLogin();    
    // console.log("use effect")
  },[]);*/

  //get redirectTo URL from signup button in order to redirect after signup callback
  const redirectTo=props.location && props.location.state && props.location.state.redirectTo ? props.location.state.redirectTo:null

  console.log("SignupPage redirectTo:",redirectTo)

  useEffect(() => {
    setMounted(true)
  },[]);


  if(props.isLogged)
  {
    if(redirectTo!=null)
      return <Redirect to={redirectTo}/>  
    else
      return <Redirect to="/login"/>  
  }
    
  return (    
     (mounted && !props.isLogged) && <BasePage {...props} routes={[]} messages={messages}>
        <SignupForm {...props} signup={(request) => props.dispatch(requestSignup(request, redirectTo))} />      
    </BasePage>
  );
}

SignupPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  //signupPage: makeSelectSignupPage()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    /*prepareSocialLogin: () => dispatch(socialLoginPrepare()),
    loginGoogle: () => dispatch(socialLoginRequest('google')),
    loginFacebook: () => dispatch(socialLoginRequest('facebook')),*/
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect,withRouter)(SignupPage);
