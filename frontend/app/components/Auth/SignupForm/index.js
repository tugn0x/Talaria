/**
 *
 * SignupForm
 *
 */
import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import { withGoogleReCaptcha } from "react-google-recaptcha-v3"
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {withRouter} from "react-router-dom";

function SignupForm(props) {
  const [formData,setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirm_passwprd: "",
  });

  const linkTo = (path) => {
    props.history.push(`/${path}`)
  };

  const handleChange = (e) =>{
    console.log(e.target.name, e.target.value)
    setFormData({ ...formData,[e.target.name]: e.target.value })
  }

  const submitChange = (e) =>{
    e.preventDefault();
    props.signup({ ...formData })
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
                <Form onSubmit={submitChange}>
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
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>surname</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Surame"
                      autoComplete="surname"
                      name="surname"
                      value={formData.surname}
                      onChange={(e) => handleChange(e, 'surname')}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => handleChange(e, 'email')}
                    />
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
                      onChange={(e) => handleChange(e, 'password')}
                    />
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

