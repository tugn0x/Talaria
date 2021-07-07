/**
 *
 * LoginPage
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import messages from './messages';
import { requestLogin, socialLoginPrepare, socialLoginRequest, requestVerification, requestLogout, requestNewToken } from 'containers/Auth/AuthProvider/actions';
import { LoginForm, BasePage } from "components";
import {useIntl} from 'react-intl';
// import VerificationForm from "../../../../frontend/app/components/VerificationForm";

// import { withStyles } from '@material-ui/core/styles';
// import VerificationForm from "../../../components/VerificationForm";
//
// import TwoColumnLayout from "components/TwoColumnLayout";

function LoginPage(props) {

  const intl=useIntl();  
  const fb_enabled=(process.env.FACEBOOK_LOGIN && process.env.FACEBOOK_LOGIN=="true")?true:false;
  const google_enabled=(process.env.GOOGLE_LOGIN && process.env.GOOGLE_LOGIN=="true")?true:false; 

  useEffect(() => {
    if(fb_enabled||google_enabled)
      props.prepareSocialLogin();
    // console.log("use effect")
  });

    // this.props.prepareGoogle()

  return (
    <BasePage {...props} routes={[]} messages={messages}>
      <div className="row justify-content-center">  
        <h1 style={{color: 'green'}}>{intl.formatMessage({id:'app.containers.HomePage.header'})}</h1>
        <h3 style={{color: 'gray'}} className="mb-5">{intl.formatMessage({id:'app.containers.HomePage.subHeader'})}</h3>
      </div>

        {!props.auth.oauth.token && <LoginForm {...props} login={(request) => props.dispatch(requestLogin(request))} />}
        {/*{props.auth.oauth.token && !props.auth.user.is_verified && <VerificationForm {...props} auth={props.auth} verify={(request) => props.dispatch(requestVerification(request))} logout={(request) => props.dispatch(requestLogout(request))} newtoken={(request) => props.dispatch(requestNewToken(request))} />}*/}
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
