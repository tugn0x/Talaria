/**
 *
 * Reset Password Form
 *
 */

import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import { withGoogleReCaptcha } from "react-google-recaptcha-v3"
import { Card, CardBody, Button, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Label, FormGroup } from 'reactstrap';
// import {ErrorBox} from "../..";
import messages from './messages';
import globalMessages from '../../../utils/globalMessages'
import { FormattedMessage } from 'react-intl';
import {useIntl} from 'react-intl';


function ResetPasswordForm(props){

  const {token, reset, requestError} = props

  const intl = useIntl()

  const [formData,setFormData] = React.useState({
    email: "",
    token: token ? token : '',
    password: "",
    password_confirmation: "",
    recaptcha: ""
  });

  /* const setRecaptcha = (token) => {
    setFormData({ ...formData, recaptcha: token })
  }
  */

  console.log()
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
      reset(formData)
      // console.log(formData.email, formData.password, token)
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
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={submitForm}  noValidate>
                  <h3>RESET PASSWORD</h3>
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
                    <div className="invalid-feedback">
                      <FormattedMessage {...globalMessages.password_match} />
                    </div>
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
      </Container>
    </div>
  );
}

ResetPasswordForm.propTypes = {};

export default withGoogleReCaptcha((ResetPasswordForm));
