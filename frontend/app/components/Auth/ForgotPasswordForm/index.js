/**
 *
 * Forgot Password Form
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



function ForgotPasswordForm(props){
  
  const {requestError} = props
  
  const [formData,setFormData] = React.useState({
    email: "",
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

  
  
  const submitForm = (e) =>{
    e.preventDefault();
    const form = e.target;
    form.classList.add('was-validated');
    if (form.checkValidity() === false) {
      console.log("Dont Send Form")
    } else {
      props.forgot(formData.email)
      console.log("Send Form")
    }
    return
    /* props.googleReCaptchaProps.executeRecaptcha('forgot').then(token => {
      props.requestToken({ ...formData, recaptcha: token })
    }).catch(error => {
      console.error("error", error);
    }); */
    
  }
  

  return(
    <div className="app flex-row align-items-center">
      <Container>
       {/*  <Loader show={props.auth.loading} > */}
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={submitForm}  noValidate>
                    <h3>PASSWORD DIMENTICATA</h3>
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

ForgotPasswordForm.propTypes = {};

export default withGoogleReCaptcha((ForgotPasswordForm));
