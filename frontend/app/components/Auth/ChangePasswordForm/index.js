import React from 'react';
import { CustomInput, Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Label, FormGroup } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import globalMessages from 'utils/globalMessages'
import {useIntl} from 'react-intl';
import Loader from 'components/Form/Loader.js'
import {ErrorBox} from 'components';

const ChangePassword = (props) => {

    const { loading, changePassword} = props

    const intl = useIntl()
    const [passwordError, setPasswordError] = React.useState('');
    const passwordRegex = /^(?=.*?[A-Z])(?=(.*[a-z]))(?=(.*[\d]))(?=(.*[\W_]))(?!=.*\s).{8,}$/;
    const [password, setPassword] = React.useState('');
    const [passwordMatched, setPasswordMatched] = React.useState(false);

    const [repeatpassword, setrepeatPassword] = React.useState(null);

    const [formData,setFormData] = React.useState({
        current_password: "",
        new_password: "",
        new_confirm_password: "",
    });

    const handleChange = (e) =>{

        if (e.target.name === 'new_password') {
            const passwordLengthError = validatePassword(e.target.value)
              ? ''
              : intl.formatMessage({ id: 'app.global.password_pattern' });
            setPasswordError(passwordLengthError);
            setPassword(e.target.value);
          }

        if (e.target.name === 'new_confirm_password') {
            setrepeatPassword(e.target.value)
            const isPasswordMatchValid = e.target.value === password;
            
            
            if (!isPasswordMatchValid || passwordMatched===null) {
                setPasswordMatched(false)
                e.preventDefault();
            }

            if (isPasswordMatchValid)
                setPasswordMatched(true)
        }


        setFormData({
          ...formData,[e.target.name]:e.target.value
        })
    }

    const validatePassword = (value) => {
        if (!passwordRegex.test(value)) {
          setPasswordError(intl.formatMessage({ id: 'app.global.password_pattern' }));
          return false;
        } else {
          setPasswordError('');
          return true;
        }
      }

    const submitForm = (e) =>{
        e.preventDefault();
        const form = e.target;
        form.classList.add('was-validated');
        if (form.checkValidity() === false) {
//console.log("Dont Send Form")
        } else {
          changePassword(formData)
//console.log("Send Form")
        }
    }

    return (
            <Loader show={loading} >
                <Row className="justify-content-center">
                    <Col md="9" lg="7" xl="6">
                        <Card className="mx-4">
                            <CardBody className="p-4">
                                <Form onSubmit={submitForm}  noValidate>
                                    <h3>{intl.formatMessage({id:'app.global.password_change'})}</h3>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><i className="icon-lock"></i></InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            type="password"
                                            placeholder={intl.formatMessage({id:'app.global.current_password'})}
                                            autoComplete="current_password"
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
                                            placeholder={intl.formatMessage({id:'app.global.new_password'})}
                                            autoComplete="new_password"
                                            name="new_password"
                                            pattern="^(?=.*?[A-Z])(?=(.*[a-z]))(?=(.*[\d]))(?=(.*[\W_]))(?!=.*\s).{8,}$" 
                                            value={formData.new_password}
                                            onChange={(e) => handleChange(e)}
                                            required
                                        />
                                        {passwordError  ? (
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
                                            pattern={`^${formData.new_password.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`}

                                            required
                                        />

                                        {passwordMatched === false && repeatpassword !== null && (
                                            <div className="error-text">
                                                {intl.formatMessage({ id: 'app.global.password_match' })}
                                            </div>
                                        )}

                                        <div className="invalid-feedback">
                                            <FormattedMessage {...globalMessages.password_match} />
                                        </div>
                                    </InputGroup>
                                    <Button color="success" block>
                                        { intl.formatMessage({ id: 'app.global.submit' })}                                        
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Loader>
    )
}


export default ChangePassword;
