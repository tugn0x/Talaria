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

  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [passwordMatched, setPasswordMatched] = React.useState(false);
//  const passwordRegex = ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[*~@#$%^&+=!()_{}><?:|\'\"\\])(?=\S+$).{8,}$;
  const passwordRegex = /^(?=.*?[A-Z])(?=(.*[a-z]))(?=(.*[\d]))(?=(.*[\W_]))(?!=.*\s).{8,}$/;

  /* const setRecaptcha = (token) => {
    setFormData({ ...formData, recaptcha: token })
  }
  */

  const validatePassword = (value) => {
    if (!passwordRegex.test(value)) {
      setPasswordError(intl.formatMessage({ id: 'app.global.password_pattern' }));
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  }

  const handleChange = (e) =>{

    if (e.target.name === 'password') {
      const passwordLengthError = validatePassword(e.target.value)
        ? ''
        : intl.formatMessage({ id: 'app.global.password_pattern' });
      setPasswordError(passwordLengthError);
      setPassword(e.target.value);
    }

    if (e.target.name === 'password_confirmation') {
      const isPasswordMatchValid = e.target.value === password;
      const passwordError = !isPasswordMatchValid
        ? intl.formatMessage({ id: 'app.global.password_match' })
        : intl.formatMessage({ id: 'app.global.password_pattern' });
      setPasswordError(passwordError);
    
      if (!isPasswordMatchValid) {
        setPasswordMatched(false)
        e.preventDefault();
      }
      setPasswordMatched(true)
    }
    setFormData({ ...formData, [e.target.name]: e.target.value })
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
              {/*<InputGroup className="mb-3">
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
              </InputGroup>*/}
              <Input
                  type="hidden"
                  placeholder="Token"
                  autoComplete="token"
                  name="token"
                  value={formData.token}
                  onChange={(e) => handleChange(e, 'token')}
                  required                  
              />
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
                    <i className="fa-solid fa-lock"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="password"
                  placeholder={  intl.formatMessage({ id: 'app.global.new_password' })}
                  autoComplete="new_password"
                  name="password"
                  value={formData.password}
                  pattern="^(?=.*?[A-Z])(?=(.*[a-z]))(?=(.*[\d]))(?=(.*[\W_]))(?!=.*\s).{8,}$" 
                  onChange={(e) => handleChange(e)}
                  required
                />
                {passwordError && !passwordMatched ? (
                      <div className="error-text">{passwordError}</div>
                    ) : (
                      <ErrorBox
                        className="invalid-feedback"
                        error={intl.formatMessage({ id: 'app.global.password_pattern' })}
                      />
                    )}
              </InputGroup>
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                  <i className="fa-solid fa-lock"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="password"
                  placeholder={ intl.formatMessage({ id: 'app.global.password_repeat' })}
                  autoComplete="password_confirmation"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={(e) => handleChange(e)}
                  pattern={`^${password.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`}
                  required
                />
                {passwordError !== intl.formatMessage({ id: 'app.global.password_pattern' }) && (
                    <ErrorBox
                      className="invalid-feedback"
                      error={intl.formatMessage({ id: 'app.global.password_match' })}
                    />
                  )}
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
