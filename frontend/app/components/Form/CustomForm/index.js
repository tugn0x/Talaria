import React, {useEffect, useState} from 'react'
import { Col, Card, CardBody, InputGroup, InputGroupAddon, InputGroupText, CustomInput, Form, Button, Row } from 'reactstrap'
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl'
import Select from 'react-select'; 
import './style.scss'
import {uniqBy} from 'lodash'
// PROPS
// fields
// callback action
// classes

const CustomForm = (props) => {

    const intl = useIntl();
    const {
        submitCallBack = () => null,
        title = 'Titolo del form',
        className = '',
        submitText = "Submit",
        submitColor = "brown",
        fields = {},
        searchCustomSelect = () => null,
        messages,
        updateFormData
    } = props


    const [selectedOption, setSelectedOption] = useState(null)
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
    
    const handleFormData = () => {
        let data = {}
        Object.keys(fields).map(key => {
            const field = fields[key]
            if(fields[key].type === 'checkbox') {
                data = {...data, [key]: updateFormData && updateFormData[field.name] ? updateFormData[field.name]  : false }
            }else if(fields[key].type === 'custom-select' || fields[key].type === 'select'){
                data = {...data, [key]: [] }
            }else {
                data = {...data, [key]: updateFormData && updateFormData[field.name]  ? updateFormData[field.name]  : '' }
            }
        })
        return data 
    }
    
    const [formData, setFormData] = useState(handleFormData()) 

    /* CUSTOM SELECT Handle */
    const handleSearchCustomSelect = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        searchCustomSelect(inputValue)
    };

    const handleChangeCustomSelect = (selectedOption, key) => {
       setFormData({ [key]:  {...selectedOption} })
       setSelectedOption(selectedOption)
       setIsSubmitDisabled(false)
    }

    /* HANDLE CHANGE Generico */
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
        setIsSubmitDisabled(false)
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
            console.log("Send Form", formData)
        }
        return
    }

    useEffect(() => {
       if(updateFormData){
            setFormData(handleFormData())
       }
    }, [updateFormData])

    return (
        Object.keys(fields).length &&
            (<Card>
                <CardBody className="p-4">
                    { title !== "" ? <h2>{title}</h2> : '' }
                    <Form onSubmit={onSubmit} noValidate>
                        <Row>
                            {Object.keys(fields).map(key => {
                                const field = fields[key];
                                return (<fieldset key={field.name} className={`${field.width ? field.width : ""} mb-3`}>
                                            <div className="form-label">
                                                {intl.formatMessage(messages[field.name])}
                                            </div>
                                            {/* <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    {intl.formatMessage(messages[field.name])}
                                                </InputGroupText>
                                            </InputGroupAddon> */}
                                            {field.type === 'checkbox' &&
                                                (<CustomInput
                                                    className="form-control"
                                                    id={field.name}
                                                    type={field.type}
                                                    // placeholder={field.placeholder ?  intl.formatMessage({ id: field.placeholder }) : 'default placeholder' }
                                                    name={key}
                                                    value={formData[key] ? formData[key] : ""}
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
                                                    placeholder={intl.formatMessage(messages[field.name])}
                                                    name={key}
                                                    value={formData[key] ? formData[key] : ""}
                                                    onChange={(e) => handleChange(e)}
                                                    required={field.required ? field.required : false}
                                                >
                                                { (typeof field.options === 'string') ?
                                                  props[field.options] && props[field.options].map((opt, i) => (<option key={`${field.name}-${i}`} value={opt.id}>{opt.name}</option>)) :
                                                    field.options.map((opt, i) => (<option key={`${field.name}-${i}`} value={opt.id}>{opt.name}</option>))
                                                }

                                                </CustomInput>)
                                            ||
                                            field.type === 'custom-select' &&
                                                (<Select
                                                    className="form-custom-select"
                                                    type="custom-select"
                                                    value={selectedOption}
                                                    name={key}
                                                    onChange={(selectedOption) => handleChangeCustomSelect(selectedOption, field.selectedOption)}
                                                    onInputChange={(input) => handleSearchCustomSelect(input) }
                                                    options={props[field.options]}
                                                    required
                                                />)
                                            ||
                                                (<CustomInput
                                                    className="form-control"
                                                    id={field.name}
                                                    type={field.type}
                                                    placeholder={intl.formatMessage(messages[field.name])}
                                                    name={key}
                                                    value={formData[key] ? formData[key] : ""}
                                                    onChange={(e) => handleChange(e)}
                                                    required={field.required ? field.required : false}
                                                />)
                                            }
                                        </fieldset>
                                    )
                            })}
                        </Row>
                        <Button color={submitColor} disabled={isSubmitDisabled} type="submit" block>
                            {submitText}
                        </Button>
                    </Form>
                </CardBody>
            </Card>)
    )
}

CustomForm.propTypes = {
    submitCallBack: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired
};

export default CustomForm
