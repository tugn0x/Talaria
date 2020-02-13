import React from 'react';
import { CustomInput, Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Label, FormGroup } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import globalMessages from '../../../utils/globalMessages'
import {useIntl} from 'react-intl';

/* const Input = (input, className = "") => {
    return (
        <InputGroup className={`${className} mb-3`}>
            <InputGroupAddon addonType="prepend">
            <InputGroupText>{input.name}</InputGroupText>
            </InputGroupAddon>
            <Input
            type={input.type}
            placeholder={intl.formatMessage({ id: [input.name] })}
            autoComplete={intl.formatMessage({ id: [input.name] })}
            name={input.name}
            value={input.value}
            onChange={(e) => null }
            required={input.required}
            />
            <div className="invalid-feedback">
    
            </div>
        </InputGroup>
    )
} */

const Profile = (props) => {
    const {user} = props
    const [formData,setFormData] = React.useState({
        name: { 
            text: user ? user.name : "",
            type: "text"
        },
        surname: { 
            text: user ? user.surname : "",
            type: "text"
        },
        address: { 
            text: user ? user.address : "",
            type: "text"
        },
        town: { 
            text: user ? user.town : "",
            type: "text"
        },
        district: { 
            text: user ? user.district : "",
            type: "text"
        },
        postcode: { 
            text: user ? user.postcode : "",
            type: "number"
        },
        state: { 
            text: user ? user.state : "",
            type: "text"
        },
        phone: { 
            text: user ? user.phone : "",
            type: "number"
        },
        mobile: { 
            text: user ? user.mobile : "",
            type: "number"
        },
        email: { 
            text: user ? user.email : "",
            type: "email"
        },
        
        /* password: "",
        confirm_password: "", */
      });

      const intl = useIntl();
    
      React.useEffect(() => {
          console.log('Profile', props.user)
      }, [])
    
      const handleChange = (e, input_name) =>{
        setFormData({ ...formData, [e.target.name]: e.target.value })
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
                {/* <Loader show={props.auth.loading} > */}
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <Form onSubmit={submitChange}  noValidate>
                                    <h1><FormattedMessage {...messages.header} /></h1>
                                    <p className="text-muted">
                                        <FormattedMessage {...messages.subtitle} />
                                    </p>
                                    {
                                     /* Object.keys(formData).map(data => {
                                            console.log(data)
                                            return (
                                                <CustomInput 
                                                    type
                                                />
                                            )
                                        }) */
                                    }
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText>name</InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                        type="text"
                                        placeholder={intl.formatMessage({ id: 'app.global.name' })}
                                        autoComplete={intl.formatMessage({ id: 'app.global.name' })}
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
                                        placeholder={ intl.formatMessage({ id: 'app.global.surname' })}
                                        autoComplete={ intl.formatMessage({ id: 'app.global.surname' })}
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
                                    {/* <InputGroup className="mb-3">
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
                                    </InputGroup> */}
                                    {/* <InputGroup className="mb-4">
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
                                    </InputGroup> */}
                                    <Button color="success" block>
                                        <FormattedMessage {...messages.subtitle} />
                                    </Button>
                                    </Form>
                                </CardBody>
                                <CardFooter className="p-4">
                                
                                </CardFooter>
                                </Card>
                        </Col>
                    </Row> 
                {/* </Loader>  */}
            </Container>
        </div>      
    )
}

export default Profile