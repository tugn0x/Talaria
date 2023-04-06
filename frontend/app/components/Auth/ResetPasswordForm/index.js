/**
 *
 * Reset Password Form
 *
 */

import React, { useEffect } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { withGoogleReCaptcha } from "react-google-recaptcha-v3"
import { Card, CardBody, Button, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Label, FormGroup } from 'reactstrap';
// import {ErrorBox} from "../..";
import messages from './messages';
import globalMessages from 'utils/globalMessages'
import { FormattedMessage } from 'react-intl';
import {useIntl} from 'react-intl';
import {ErrorBox} from 'components';

function ResetPasswordForm(props){

  const {token, reset} = props

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
      return
    } else {
      console.log("Sending Form")
      props.googleReCaptchaProps.executeRecaptcha('ResetPassword').then(token => {
        reset({ ...formData, recaptcha: token })
      }).catch(error => {
        console.log("ERROR IN submitChange executeRecaptcha")
        console.error("error", error);
      });

    }
    return
  }

  return(
      <Row className="justify-content-center">
        <Col md="9" lg="7" xl="6">
          <Card className="mx-4">
            <CardBody className="p-4">
              <Form onSubmit={submitForm}  noValidate>
              {/* <h3>Abbiamo inviato una mail</h3> */}
              <h3> <FormattedMessage {...messages.header} /></h3>
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>@</InputGroupText>
                </InputGroupAddon>
                <Input
                  type="text"
                  placeholder="Token"
                  autoComplete="token"
                  name="token"
                  value={formData.token}
                  onChange={(e) => handleChange(e, 'token')}
                  required
                />
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
                  placeholder={  intl.formatMessage({ id: 'app.global.current_password' })}
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
                <ErrorBox className="invalid-feedback" error={  intl.formatMessage({ id: 'app.global.password_match' })} /> 
              </InputGroup>
                <Button color="success" block>
                  <FormattedMessage {...messages.submitFormButton} />
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
  );
}

ResetPasswordForm.propTypes = {};

export default withGoogleReCaptcha((ResetPasswordForm));
