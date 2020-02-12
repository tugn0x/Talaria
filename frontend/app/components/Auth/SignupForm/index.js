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
import globalMessages from '../../../utils/globalMessages'
import {withRouter} from "react-router-dom";
import {formatDate} from '../../../utils/dates'
import {Loader, SocialAuth} from "../..";

import {useIntl} from 'react-intl';

import './style.scss';

// const validEmailRegex = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";

function SignupForm(props) {
  const [formData,setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    privacy_policy_accepted: "",
  });
  const intl = useIntl();

  // const [canSubmit, setCanSubmit] = React.useState(false)

  const linkTo = (path) => {
    props.history.push(`/${path}`)
  };

  const handleChange = (e, input_name) =>{
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
      props.signup({ ...formData })
      console.log("Send Form")
    }
    return
    props.googleReCaptchaProps.executeRecaptcha('homepage').then(token => {
      props.signup({ ...formData, recaptcha: token })
    }).catch(error => {
      console.log("ERROR IN submitChange executeRecaptcha")
      console.error("error", error);
    });
    // e.preventDefault();
  }
  // console.log(<FormattedMessage {...globalMessages.password_repeat} />)
  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Loader show={props.auth.loading} >
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
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>name</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder={globalMessages.name.defaultMessage}
                      autoComplete="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => handleChange(e, 'name')}
                      required
                    />
                    <div className="invalid-feedback">
                      <FormattedMessage {...globalMessages.invalid_name} />
                    </div>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>surname</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder={globalMessages.surname.defaultMessage}
                      autoComplete="surname"
                      name="surname"
                      value={formData.surname}
                      onChange={(e) => handleChange(e, 'surname')}
                      required
                    />
                    <div className="invalid-feedback">
                      <FormattedMessage {...globalMessages.invalid_surname} />
                    </div>
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
                      onChange={(e) => handleChange(e, 'email')}
                      required
                    />
                    <div className="invalid-feedback">
                      <FormattedMessage {...globalMessages.invalid_email} />
                    </div>
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
                      onChange={(e) => handleChange(e, 'password')}
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
                      // placeholder={ <FormattedMessage {...globalMessages.password_repeat} />}
                      // placeholder={ intl.formatMessage(...messages.header)}
                      placeholder={ intl.formatMessage({ id: 'app.components.SignupForm.passwordConfirmation' })}
                      autoComplete="password_confirmation"
                      name="password_confirmation"
                      value={formData.password_confirmation}
                      onChange={(e) => handleChange(e, 'password_confirmation')}
                      pattern={formData.password}
                      required
                    />
                    <div className="invalid-feedback">
                      <FormattedMessage {...globalMessages.password_match} />
                    </div>
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <AppSwitch className={'mx-1'} color={'primary'}
                               value={formData.privacy_policy_accepted}
                               name='privacy_policy_accepted'
                               onChange={(e) => handlePrivacyPolicty(e)}/>
                    <Label check className="form-check-label" htmlFor="privacy_policy_accepted">Privacy policy</Label>
                  </InputGroup>

                  <Button color="success" block>Create Account</Button>
                </Form>
              </CardBody>
              <CardFooter className="p-4">
                <SocialAuth loginFacebook={props.loginFacebook} loginGoogle={props.loginGoogle}/>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        </Loader>
      </Container>
    </div>
  );
}
SignupForm.propTypes = {};

export default withRouter(withGoogleReCaptcha((SignupForm)));

