/**
 *
 * LoginForm
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {useIntl} from 'react-intl';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { withGoogleReCaptcha } from "react-google-recaptcha-v3"
import { Link as RouterLink, withRouter, NavLink } from "react-router-dom";
// import GarrImg from '../../../images/idem.svg'
import {SocialAuth} from "../..";
import './style.scss'


  function LoginForm(props) {
    console.log("LoginForm:",props)

    const intl=useIntl();
    
    const [formData,setFormData] = React.useState({
      username: "",
      password: ""
    });

    const linkTo = (path) => {
      props.history.push(`/${path}`)
    };

    const handleChange = (e) =>{
      setFormData({ ...formData,[e.target.name]: e.target.value })
    }



    const submitChange = (e) =>{
      e.preventDefault();
    //  props.login({ ...formData })
     // return
      props.googleReCaptchaProps.executeRecaptcha('homepage').then(token => {
        props.login({ ...formData, recaptcha: token })
      }).catch(error => {
        console.error("error", error);
      });
      // e.preventDefault();
    }

    const signupLink = () => {

      let signuplnk="/signup";
      if(location.pathname!='/login')      
      {
        signuplnk=
        {
          'pathname': "/signup",
          'state': {
            'redirectTo': location.pathname+location.search
          }
        }        
      }
      //console.log("GOTOLINK:",signuplnk)
      return signuplnk;
    }

  return (
        <div className="login-form">
          <Row className="justify-content-center">            
            <Col md="6" sm="8">
              <CardGroup>
                <Card>
                  <CardBody>
                    <Form onSubmit={submitChange}>
                      <h1><FormattedMessage {...messages.header} /></h1>
                      <SocialAuth loginFacebook={props.loginFacebook} loginGoogle={props.loginGoogle}/>
                      {/* <p className="text-muted"><FormattedMessage {...messages.loginDescription} /></p> */}
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa-solid fa-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                           placeholder={ intl.formatMessage({ id: 'app.global.username' })}
                           autoComplete="username"
                           name="username"
                           value={formData.username}
                           onChange={(e) => handleChange(e, 'username')}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa-solid fa-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder={ intl.formatMessage({ id: 'app.global.password' })}
                          autoComplete="password"
                          name="password"
                          value={formData.password}
                          onChange={(e) => handleChange(e, 'password')}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="12" md="6">
                          <Button
                            type="submit"
                            color="cta"
                            className="m-auto"
                            // onClick={(e) => submitChange(e)}
                            disabled={props.auth.loading || formData.password === '' || formData.username === ''}
                          >
                            <FormattedMessage {...messages.loginButton} />
                          </Button>
                        </Col>
                        <Col xs="12" md="6">
                          <NavLink className="btn-cta register-button" to={signupLink()}>
                              <FormattedMessage {...messages.signUpButton} />                            
                          </NavLink>
                        </Col>

                        <Col xs="12" className="text-center pt-3">
                            <NavLink to='/forgot-password' key='/forgot-password' className="text-dark-text">
                              <FormattedMessage {...messages.forgot} />
                            </NavLink>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>                                    
                </Card>
                {/* <Card className="text-white bg-primary py-5 d-md-down-none">
                  <CardBody className="text-center">
                    <div>
                      <h2><FormattedMessage {...messages.register} /></h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/signup">
                        <Button
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                          onClick={() => linkTo("signup")}
                        >
                          <FormattedMessage {...messages.register} />
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card> */}
              </CardGroup>
            </Col>
          </Row>
        </div>
  );
}

LoginForm.propTypes = {};

export default withRouter(withGoogleReCaptcha((LoginForm)));
