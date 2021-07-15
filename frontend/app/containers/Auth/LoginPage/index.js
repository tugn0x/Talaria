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

import RegisterLibrary from '../../RegisterLibrary'
import MyLibraryPage from '../../Patron/MyLibraryPage'
import { NavLink } from 'react-router-dom';

// import VerificationForm from "../../../../frontend/app/components/VerificationForm";

// import { withStyles } from '@material-ui/core/styles';
// import VerificationForm from "../../../components/VerificationForm";
//
// import TwoColumnLayout from "components/TwoColumnLayout";

function LoginPage(props) {

  const {match}=props

  const intl=useIntl();  
  const fb_enabled=(process.env.FACEBOOK_LOGIN && process.env.FACEBOOK_LOGIN=="true")?true:false;
  const google_enabled=(process.env.GOOGLE_LOGIN && process.env.GOOGLE_LOGIN=="true")?true:false; 

  const [PatronReg,setPatronReg]=useState (true);
  const togglePatronReg = () => {setPatronReg(true); setLibraryReg(false);}
  const [LibraryReg,setLibraryReg]=useState (false);
  const toggleLibraryReg = () => {setLibraryReg(true); setPatronReg(false);}


  useEffect(() => {
    if(fb_enabled||google_enabled)
      props.prepareSocialLogin();
    // console.log("use effect")
  });

  useEffect( () => {
    console.log("LoginPage - CHECK REDIRECT");
 //LOGIN CHECK
 if(props.isLogged && props.auth && ( props.auth.permissions.roles && props.auth.permissions.roles.includes("super-admin")) )  
 history.push('/admin'); 
//if user has no abilities=>is just a patron
//so redirect in patron home page (bibliography)
else  if(props.isLogged && props.auth && ( (!props.auth.permissions.resources || props.auth.permissions.resources.length==0) && (props.auth.permissions.roles && props.auth.permissions.roles.length==2 && props.auth.permissions.roles.includes("patron")) ) )
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

  },[props.auth])

    // this.props.prepareGoogle()

  return (
    <BasePage {...props} routes={[]} messages={messages} headermenu={false}>      
        {!props.auth.oauth.token && <LoginForm {...props} login={(request) => props.dispatch(requestLogin(request))} />}    
        {/*{props.auth.oauth.token && !props.auth.user.is_verified && <VerificationForm {...props} auth={props.auth} verify={(request) => props.dispatch(requestVerification(request))} logout={(request) => props.dispatch(requestLogout(request))} newtoken={(request) => props.dispatch(requestNewToken(request))} />}*/}
        
        {props.isLogged && 
        (props.auth.permissions.roles && props.auth.permissions.roles.includes("registered") && 
          (!props.auth.permissions.resources || props.auth.permissions.resources.length==0) 
          && 
       <>
       <p>{intl.formatMessage({id:'app.containers.HomePage.intro1'})}</p>       
       <p>{intl.formatMessage({id:'app.containers.HomePage.intro2'})}</p>       
       <p>{intl.formatMessage({id:'app.containers.HomePage.intro3'})}</p>       
       <nav>
       <NavLink
              className="btn btn-primary mx-3"
              key="associateLib"                                            
              isActive={()=>PatronReg}         
              onClick={(e)=>togglePatronReg()}      
              to="#"        
        >{intl.formatMessage({id:'app.global.patron'})}</NavLink>
        <NavLink
              className="btn btn-primary mx-3"
              key="registernewlibrary"                                          
              isActive={()=>LibraryReg}        
              to="#"        
              onClick={(e)=>toggleLibraryReg()}            
        >{intl.formatMessage({id:'app.global.librarian'})}</NavLink>           
        </nav>
        {/* TODO 
          - must be able to preselect library reading from url (also for patrons and new users without roles)
        */}
        {PatronReg && <MyLibraryPage match={match} auth={props.auth}/>}
        {LibraryReg && <RegisterLibrary {...props.auth} headermenu={false}/> }  
        </>
       ||
       <>
       <p>You've multiple roles, please choose one from below</p>
        Roles List:
        <ul>
          <li>Role 1</li>
          <li>Role 2</li>
          <li>Role 3</li>
        </ul>
      </>)
      }
    </BasePage>

  );
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  //loginPage: makeSelectLoginPage()
});

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }
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
