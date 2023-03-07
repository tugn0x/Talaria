/**
 *
 * LoginPage
 *
 */
import React, { useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import messages from './messages';
import { requestLogin, socialLoginPrepare, socialLoginRequest, requestVerification, requestLogout, requestNewToken } from 'containers/Auth/AuthProvider/actions';
import { LoginForm, BasePage } from "components";
import {useIntl} from 'react-intl';
import history from 'utils/history';
import resourcesMap from '../../../routes/resources';
import LandingPage from '../../LandingPage';
import './style.scss';
import {checkRole} from '../../../utils/permissions'


// import VerificationForm from "../../../../frontend/app/components/VerificationForm";

// import { withStyles } from '@material-ui/core/styles';
// import VerificationForm from "../../../components/VerificationForm";
//
// import TwoColumnLayout from "components/TwoColumnLayout";

function LoginPage(props) {
  console.log("LoginPage:",props)    
  const intl=useIntl();  
  const fb_enabled=(process.env.FACEBOOK_LOGIN && process.env.FACEBOOK_LOGIN=="true")?true:false;
  const google_enabled=(process.env.GOOGLE_LOGIN && process.env.GOOGLE_LOGIN=="true")?true:false; 

  
  const [authChecked, setAuthChecked]=useState(false);

  useEffect(() => {
    if(fb_enabled||google_enabled)
      props.prepareSocialLogin();
      // this.props.prepareGoogle()    
  },[]);

  useEffect( () => {
    console.log("LoginPage - CHECK REDIRECT");
 
    //LOGIN CHECK
    if(props.isLogged && props.auth)
    {
      //Admin and Manager were automatically redirected to /admin
      if(props.auth.permissions.roles && checkRole(props.auth,["super-admin","manager"]) )   
        history.push('/admin'); 
     
      //if user has no abilities=>is just a patron
      //so redirect in patron home page (bibliography)
      else  if( (!props.auth.permissions.resources || props.auth.permissions.resources.length==0) && (props.auth.permissions.roles && props.auth.permissions.roles.length==2 && checkRole(props.auth,"patron")) ) 
        history.push('/patron/references');         
      else if (props.auth.permissions.resources && (Object.keys(props.auth.permissions.resources).length==1))    
      {      
        //if it has only one resources redirect to "specific resource" dashboard
        let res="";
        let resid="";
        
        if(props.auth.permissions.resources.libraries)
        {
          res="libraries";
          resid=props.auth.permissions.resources.libraries[0].resource.id;        
        }
        else if(props.auth.permissions.resources.institutions)
        {
          res="institutions";
          resid=props.auth.permissions.resources.institutions[0].resource.id;        
        }
        //else if (projects,consortiums ....)
      
        if(res!="")
          history.push(resourcesMap[res]+resid);
      }                      
    }
    //else continue with login form...
    
  setAuthChecked(true);

  },[props.isLogged/*props.auth*/])

  //MAIN
  return (
  <BasePage {...props} routes={[]} messages={messages} headermenu={false}>      
      <h1 className="header">{intl.formatMessage({id:'app.containers.HomePage.header'})}</h1>  
      {authChecked && !props.isLogged && !props.auth.oauth.token && <LoginForm {...props} login={(request) => props.dispatch(requestLogin(request))} />}    
      {authChecked && props.isLogged && <LandingPage {...props}></LandingPage>}   
      {/*{props.auth.oauth.token && !props.auth.user.is_verified && <VerificationForm {...props} auth={props.auth} verify={(request) => props.dispatch(requestVerification(request))} logout={(request) => props.dispatch(requestLogout(request))} newtoken={(request) => props.dispatch(requestNewToken(request))} />}*/}                
  </BasePage>)
  
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  //loginPage: makeSelectLoginPage()
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  prepareSocialLogin: () => dispatch(socialLoginPrepare()),
  loginGoogle: () => dispatch(socialLoginRequest('google')),
  loginFacebook: () => dispatch(socialLoginRequest('facebook')),
})


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
