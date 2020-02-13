import React from 'react';
import { CustomInput, Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Label, FormGroup } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { withGoogleReCaptcha } from "react-google-recaptcha-v3"
import globalMessages from '../../../utils/globalMessages'
import {useIntl} from 'react-intl';
import Loader from '../../../components/Form/Loader.js'

const ChangePassword = (props) => {
    
    const { loading, changePassword} = props
  
    const intl = useIntl()

    const [formData,setFormData] = React.useState({
        current_password: "",
        new_password: "",
        new_confirm_password: "",
        // recaptcha: ""
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
          changePassword(formData)
          console.log("Send Form")
        }
        return
        /* props.googleReCaptchaProps.executeRecaptcha('forgot').then(token => {
          props.requestToken({ ...formData, recaptcha: token })
        }).catch(error => {
          console.error("error", error);
        }); */
        
    }
    
    return (
        <div className="app flex-row align-items-center">
            <Container>
                <Loader show={loading} > 
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <Form onSubmit={submitForm}  noValidate>
                                        <h3>Cambia Password</h3>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText><i className="icon-lock"></i></InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="password"
                                                placeholder="Current Password"
                                                autoComplete="email"
                                                name="current_password"
                                                value={formData.current_password}
                                                onChange={(e) => handleChange(e)}
                                                required
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText><i className="icon-lock"></i></InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="password"
                                                placeholder="New Password"
                                                autoComplete="email"
                                                name="new_password"
                                                pattern=".{8,}" 
                                                title="Password must be min 8 chars"
                                                value={formData.new_password}
                                                onChange={(e) => handleChange(e)}
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                <FormattedMessage {...globalMessages.invalid_email} />
                                            </div>
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
                                                name="new_confirm_password"
                                                value={formData.new_confirm_password}
                                                onChange={(e) => handleChange(e)}
                                                pattern={formData.new_password}
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                {/* <FormattedMessage {...globalMessages.password_match} /> */}
                                            </div>
                                        </InputGroup>
                                        <Button color="success" block>
                                            Submit
                                           {/*  <FormattedMessage {...messages.submitFormButton} /> */}
                                        </Button>
                                    </Form>
                                </CardBody>
                            </Card> 
                        </Col>
                    </Row>
                </Loader>
            </Container>
        </div>
    )                          
}


export default withGoogleReCaptcha((ChangePassword));