import React, {useState} from 'react'
import { Col, Card, CardBody, InputGroup, InputGroupAddon, InputGroupText, CustomInput, Form, Button, Row } from 'reactstrap'
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl'

// PROPS
// fields
// callback action
// classes

const CustomForm = ({
        submitCallBack = () => null,
        title = 'Titolo del form',
        className = '',
        submitText = "Submit",
        submitColor = "brown",
        fields = {},
        requestData = {}
    }) => {

    const intl = useIntl();

    const [formData, setFormData] = useState(() => {
        let data = {}
        Object.keys(fields).map(key => {
            if(fields[key].type === 'checkbox') {
                data = {...data, [key]: requestData[key] ? requestData[key] : false }
            }else {
                data = {...data, [key]: requestData[key] ? requestData[key] : "" }
            }
        })
        return data
    })

    const handleChange = (e) =>{
        const targetType = e.target.type
        switch(targetType) {
            case "checkbox":
                setFormData({ ...formData, [e.target.name]:  e.target.checked })
                break;
            default:
                setFormData({ ...formData, [e.target.name]:  e.target.value   })
                break;
        }

        console.log("new formData", formData)
    }


    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        form.classList.add('was-validated');
        if (form.checkValidity() === false) {
            console.log("Dont Send Form")
            return
        } else {
            submitCallBack(formData)
            // console.log("Send Form", formData)
        }
        return
    }

    return (
        Object.keys(fields).length &&
        (
            <Card className="mx-4">
                <CardBody className="p-4">
                    { title !== "" ? <h1>{title}</h1> : '' }
                    <Form onSubmit={onSubmit} noValidate>
                        <Row>
                            {Object.keys(fields).map(key => {
                                const field = fields[key];
                                return (<InputGroup key={field.name} className="mb-3">
                                        {field.label && field.label !== "" &&
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                {intl.formatMessage({ id: field.label })}
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        }
                                            {field.type === 'checkbox' &&
                                                (<CustomInput
                                                    className="form-control"
                                                    id={field.name}
                                                    type={field.type}
                                                    placeholder={field.placeholder ?  intl.formatMessage({ id: field.placeholder }) : 'default placeholder' }
                                                    name={key}
                                                    // value={formData[key] ? formData[key] : ""}
                                                    onChange={(e) => handleChange(e)}
                                                    required={field.required ? field.required : false}
                                                    checked={formData[key]}
                                                />)
                                            ||
                                            field.type === 'select' &&
                                                ( <CustomInput
                                                    className="form-control"
                                                    id={field.name}
                                                    type={field.type}
                                                    placeholder={field.placeholder  ? intl.formatMessage({ id: field.placeholder }) : 'default placeholder' }
                                                    name={key}
                                                    value={formData[key] ? formData[key] : ""}
                                                    onChange={(e) => handleChange(e)}
                                                    required={field.required ? field.required : false}
                                                >
                                                {/*{field.options.map((opt, i) => (<option key={`${field.label}-${i}`} value={opt.value}>{opt.label}</option>))}*/}
                                                {
                                                  (typeof field.options === 'string') ?
                                                    props[`${field.options}`].map((opt, i) => (<option key={`${field.label}-${i}`} value={opt.value}>{opt.label}</option>)) :
                                                    field.options.map((opt, i) => (<option key={`${field.label}-${i}`} value={opt.value}>{opt.label}</option>))
                                                }

                                                </CustomInput>)
                                            ||
                                                (<CustomInput
                                                    className="form-control"
                                                    id={field.name}
                                                    type={field.type}
                                                    placeholder={field.placeholder ?  intl.formatMessage({ id: field.placeholder }) : 'default placeholder' }
                                                    name={key}
                                                    value={formData[key] ? formData[key] : ""}
                                                    onChange={(e) => handleChange(e)}
                                                    required={field.required ? field.required : false}
                                                />)
                                            }
                                        </InputGroup>
                                    )
                            })}
                        </Row>
                        <Button color={submitColor} type="submit" block>
                            {submitText}
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        )
    )
}

CustomForm.propTypes = {
    submitCallBack: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired
};

export default CustomForm
