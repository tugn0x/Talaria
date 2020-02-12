/**
 *
 * Reset Password Form
 *
 */

import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import { withGoogleReCaptcha } from "react-google-recaptcha-v3"
import { Card, CardBody, Button, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Label, FormGroup } from 'reactstrap';
import {ErrorBox, Loader} from "../..";
import messages from './messages';
import globalMessages from '../../../utils/globalMessages'
import { FormattedMessage } from 'react-intl';
import {useIntl} from 'react-intl';

/* const styles = (theme) => {
  return {
    errorBox: {
      textAlign: "center",
      padding: theme.spacing(.5),
      color: theme.palette.common.white,
      backgroundColor: theme.palette.error.main,
    },
    page: {
      width:"100%",
    },
    formGroup:{
      width:"100%",
    },
  }
}; */



function ResetPasswordForm(props){

  const {requestError} = props

  const intl = useIntl()

  const [formData,setFormData] = React.useState({
    email: "",
    token: props.token ? props.token : '',
    password: "",
    password_confirmation: "",
    recaptcha: ""
  });

  /* const setRecaptcha = (token) => {
    setFormData({ ...formData, recaptcha: token })
  }
  */
  const handleChange = (e) =>{
    setFormData({
      ...formData,[e.target.name]:e.target.value
    })
  }

  // console.log(requestError)

  const submitForm = (e) =>{
    e.preventDefault();
    const form = e.target;
    form.classList.add('was-validated');
    if (form.checkValidity() === false) {
      console.log("Dont Send Form")
    } else {
      props.reset(formData.email)
      console.log("Send Form")
    }
    return
    /* props.googleReCaptchaProps.executeRecaptcha('reset').then(token => {
      props.requestToken({ ...formData, recaptcha: token })
    }).catch(error => {
      console.error("error", error);
    }); */

  }


  return(
    <div className="app flex-row align-items-center">
      <Container>
       {/*  <Loader show={props.auth.loading} > */}
       <h1>MI serve</h1>
        <ul>
          <li>
            token (se presente recuperare da param in get)
          </li>
          <li>
            indirizzo email
          </li>
          <li>
            conferma password
          </li>
          <li>
            password
          </li>
          </ul>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={submitForm}  noValidate>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Reset Token"
                      autoComplete="token"
                      name="email"
                      value={formData.token}
                      onChange={(e) => handleChange(e, 'token')}
                      required
                    />
                    <div className="invalid-feedback">
                      <FormattedMessage {...globalMessages.invalid_email} />
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
                      placeholder={ intl.formatMessage({ id: 'app.global.password_repeat' })}
                      autoComplete="password_confirmation"
                      name="password_confirmation"
                      value={formData.password_confirmation}
                      onChange={(e) => handleChange(e, 'password_confirmation')}
                      pattern={formData.password}
                      required
                    />
                  </InputGroup>
                    {requestError !== null &&
                      <div className="text-danger">{requestError}</div>
                    }
                    <Button color="success" block>
                      <FormattedMessage {...messages.submitFormButton} />
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
       {/*  </Loader> */}
      </Container>
    </div>
  );
}

ResetPasswordForm.propTypes = {};

export default withGoogleReCaptcha((ResetPasswordForm));
