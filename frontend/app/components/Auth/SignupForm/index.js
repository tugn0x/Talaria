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
import {withRouter} from "react-router-dom";
import './style.scss';
const validEmailRegex = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
import {formatDate} from '../../../utils/dates'

function SignupForm(props) {
  const [formData,setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    privacy_policy_accepted: "",
  });

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
  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="9" lg="7" xl="6">
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form onSubmit={submitChange}  noValidate>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>name</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Name"
                      autoComplete="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => handleChange(e, 'name')}
                      required
                    />
                    <div className="invalid-feedback">
                      Please choose a username.
                    </div>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>surname</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Surname"
                      autoComplete="surname"
                      name="surname"
                      value={formData.surname}
                      onChange={(e) => handleChange(e, 'surname')}
                      required
                    />
                    <div className="invalid-feedback">
                      Please choose a surname.
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
                      Please provide a valid email
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
                      placeholder="Repeat password"
                      autoComplete="password_confirmation"
                      name="password_confirmation"
                      value={formData.password_confirmation}
                      onChange={(e) => handleChange(e, 'password_confirmation')}
                      pattern={formData.password_confirmation}
                      required
                    />
                    <div className="invalid-feedback">
                      Passwords must match
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
                <Row>
                  <Col xs="12" sm="6">
                    <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                  </Col>
                  <Col xs="12" sm="6">
                    <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
SignupForm.propTypes = {};

export default withRouter(withGoogleReCaptcha((SignupForm)));

