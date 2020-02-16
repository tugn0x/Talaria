import React from 'react';
import { CustomInput, Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Label, FormGroup } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
// import globalMessages from '../../../utils/globalMessages'
import {useIntl} from 'react-intl';
import Loader from 'components/Form/Loader.js';

const ProfileForm = (props) => {
    const {user, updateProfile, loading} = props
    const [formData,setFormData] = React.useState({
        name: {
            value: user ? user.name : "",
            type: "text",
            required: true,
        },
        surname: {
            value: user ? user.surname : "",
            type: "text",
            required: true,
        },
        address: {
            value: user ? user.address : "",
            type: "text",
        },
        town: {
            value: user ? user.town : "",
            type: "text",
        },
        district: {
            value: user ? user.district : "",
            type: "text",
        },
        postcode: {
            value: user ? user.postcode : "",
            type: "number",
        },
        state: {
            value: user ? user.state : "",
            type: "text",
        },
        phone: {
            value: user ? user.phone : "",
            type: "number",
        },
        mobile: {
            value: user ? user.mobile : "",
            type: "number",
        },
        email: {
            value: user ? user.email : "",
            type: "email",
            required: true,
        },
      });

    let sendData = {}
    const intl = useIntl();

    const handleChange = (e) =>{
        setFormData({ ...formData, [e.target.name]: { ...formData[e.target.name], value: e.target.value }  })
    }

    const submitForm = (e) =>{
        e.preventDefault();
        const form = e.target;
        form.classList.add('was-validated');
        if (form.checkValidity() === false) {
            console.log("Dont Send Form")
        } else {
            Object.keys(formData).map(key => {
                sendData = {...sendData,  [key]: formData[key].value }
            })
            updateProfile({ ...sendData })
            console.log("Send Form", sendData)
        }
        return
        /*
        Recaptcha
        props.googleReCaptchaProps.executeRecaptcha('homepage').then(token => {
            props.signup({ ...formData, recaptcha: token })
        }).catch(error => {

          console.log("ERROR IN submitChange executeRecaptcha")
          console.error("error", error);
        });
        // e.preventDefault(); */
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
                                    <h1><FormattedMessage {...messages.header} /></h1>
                                    <p className="text-muted">
                                        <FormattedMessage {...messages.subtitle} />
                                    </p>
                                    {
                                        Object.keys(formData).map(key => {
                                            const input = formData[key]
                                            return (
                                                <InputGroup key={key} className="mb-3">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>{key}</InputGroupText>
                                                    </InputGroupAddon>
                                                    <CustomInput
                                                        className="form-control"
                                                        id={key}
                                                        type={input.type}
                                                        placeholder={typeof messages[key] !== 'undefined' ? intl.formatMessage(messages[key]) : '' }
                                                        name={key}
                                                        value={input.value !== null ? input.value : ''}
                                                        onChange={(e) => handleChange(e)}
                                                        required={input.required ? input.required : false}
                                                    />
                                                </InputGroup>
                                            )
                                        })
                                    }
                                    <Button color="success" type="submit" block>
                                        <FormattedMessage {...messages.subtitle} />
                                    </Button>
                                    </Form>
                                </CardBody>
                                <CardFooter className="p-4">
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Loader>
            </Container>
        </div>
    )
}

export default ProfileForm
