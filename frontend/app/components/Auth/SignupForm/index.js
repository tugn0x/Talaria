/**
 *
 * SignupForm
 *
 */
import React, { Component, useEffect } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Label, FormGroup } from 'reactstrap';
import { AppSwitch } from '@coreui/react'

import { withGoogleReCaptcha } from "react-google-recaptcha-v3"
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import globalMessages from 'utils/globalMessages'
import {withRouter} from "react-router-dom";
import {formatDate} from 'utils/dates'
import {Loader, SocialAuth} from "../..";
import {ErrorBox} from 'components';
import {useIntl} from 'react-intl';

import './style.scss';

function SignupForm(props) {
  const [formData,setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    privacy_policy_accepted: "",
    recaptcha: '',
  });
  const intl = useIntl();

  const handleChange = (e) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePrivacyPolicty = (e) =>{
    const value = e.target.checked ? formatDate() : ''
    setFormData({ ...formData,['privacy_policy_accepted']: value })
  }

  const submitChange = (e) =>{
    e.preventDefault();
    const form = e.target;
    form.classList.add('was-validated');
    if (form.checkValidity() === false) {
      console.log("Dont Send Form")
    } else {
      console.log('Sending Form Sign up')
      /* props.googleReCaptchaProps.executeRecaptcha('Signup').then(token => {
        props.signup({ ...formData, recaptcha: token })
      }).catch(error => {
        console.log("ERROR IN submitChange executeRecaptcha")
        console.error("error", error);
      }); */
    }
    return
  }

  return (
    <div className="app flex-row align-items-center">
      <Container>
        {/* <Loader show={props.auth.loading} > */}
        <Row className="justify-content-center">
          <Col md="9" lg="7" xl="6">
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form onSubmit={submitChange}  noValidate>
                  <h1><FormattedMessage {...messages.subtitle} /></h1>
                  <p className="text-muted">
                    <FormattedMessage {...messages.subtitle} />
                  </p>
                  <InputGroup className="mb-3">
                    {/* <InputGroupAddon addonType="prepend">
                      <InputGroupText>name</InputGroupText>
                    </InputGroupAddon> */}
                    <Input
                      type="text"
                      placeholder={intl.formatMessage({ id: 'app.global.name' })}
                      autoComplete={intl.formatMessage({ id: 'app.global.name' })}
                      name="name"
                      value={formData.name}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    <ErrorBox className="invalid-feedback" error={  intl.formatMessage({ id: 'app.global.invalid_name' })} /> 
                  </InputGroup>
                  <InputGroup className="mb-3">
                   {/*  <InputGroupAddon addonType="prepend">
                      <InputGroupText>surname</InputGroupText>
                    </InputGroupAddon> */}
                    <Input
                      type="text"
                      placeholder={ intl.formatMessage({ id: 'app.global.surname' })}
                      autoComplete={ intl.formatMessage({ id: 'app.global.surname' })}
                      name="surname"
                      value={formData.surname}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    <ErrorBox className="invalid-feedback" error={  intl.formatMessage({ id: 'app.global.invalid_surname' })} /> 
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    <ErrorBox className="invalid-feedback" error={  intl.formatMessage({ id: 'app.global.invalid_email' })} /> 
                  </InputGroup>
                  <InputGroup className="mb-3">
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
                      onChange={(e) => handleChange(e)}
                      required
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
                      placeholder={ intl.formatMessage({ id: 'app.global.password_repeat' })}
                      autoComplete="password_confirmation"
                      name="password_confirmation"
                      value={formData.password_confirmation}
                      onChange={(e) => handleChange(e)}
                      pattern={formData.password}
                      required
                    />
                    <ErrorBox className="invalid-feedback" error={  intl.formatMessage({ id: 'app.global.password_match' })} /> 
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <AppSwitch className="mx-1" color="primary"
                               value={formData.privacy_policy_accepted}
                               name='privacy_policy_accepted'
                               onChange={(e) => handlePrivacyPolicty(e)}
                               required
                               />
                    <Label check className="form-check-label" htmlFor="privacy_policy_accepted">Privacy policy</Label> 
                  </InputGroup>
                  <Button color="success" block>
                    <FormattedMessage {...messages.subtitle} />
                  </Button>
                </Form>
              </CardBody>
              {/* <CardFooter className="p-4">
                <SocialAuth loginFacebook={props.loginFacebook} loginGoogle={props.loginGoogle}/>
              </CardFooter> */}
            </Card>
          </Col>
        </Row>
        {/* </Loader> */}
      </Container>
    </div>
  );
}
SignupForm.propTypes = {};

export default withRouter(withGoogleReCaptcha((SignupForm)));

