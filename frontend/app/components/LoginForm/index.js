/**
 *
 * LoginForm
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
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
import { Link as RouterLink, withRouter } from "react-router-dom";
import GarrImg from '../../images/idem.svg'

  function LoginForm(props) {
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
      props.login({ ...formData })
      return
      props.googleReCaptchaProps.executeRecaptcha('homepage').then(token => {
        props.login({ ...formData, recaptcha: token })
      }).catch(error => {
        console.log("ERROR IN submitChange executeRecaptcha")
        console.error("error", error);
      });
      // e.preventDefault();
    }
  return (
    <div>
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={submitChange}>
                      <h1><FormattedMessage {...messages.header} /></h1>
                      <p className="text-muted"><FormattedMessage {...messages.loginDescription} /></p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                           placeholder="Email"
                           autoComplete="email"
                           name="username"
                           value={formData.username}
                           onChange={(e) => handleChange(e, 'username')}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          name="password"
                          value={formData.password}
                          onChange={(e) => handleChange(e, 'password')}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            type="submit"
                            color="primary"
                            className="px-4"
                            // onClick={(e) => submitChange(e)}
                            disabled={props.auth.loading || formData.password === '' || formData.username === ''}
                          >
                            <FormattedMessage {...messages.loginButton} />
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <CardFooter className="p-4">
                    <Row>
                      <Col xs="12" sm="6">
                        <Button className="btn-facebook mb-1" block onClick={props.loginFacebook}><span>Facebook</span></Button>
                      </Col>
                      <Col xs="12" sm="6">
                        <Button className="btn-google-plus mb-1" block onClick={props.loginGoogle}><span>Google</span></Button>
                      </Col>
                      <Col xs="6" sm="6">
                        <a href="https://devnilde.bo.cnr.it/Shibboleth.sso/Login?target=https://devnilde.bo.cnr.it/shibb/testshib.php">
                          <img src={GarrImg}/>
                        </a>
                      </Col>
                      <Col xs="12" sm="12">
                        <div id="my-spid-button">
                          <noscript>
                            Il login tramite SPID richiede che JavaScript sia abilitato nel browser
                          </noscript>
                        </div>
                      </Col>
                    </Row>
                  </CardFooter>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
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
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>

    </div>
  );
}

LoginForm.propTypes = {};

export default withRouter(withGoogleReCaptcha((LoginForm)));
