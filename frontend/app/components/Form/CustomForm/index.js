import React, {useEffect, useState} from 'react'
import { Col, Card, CardBody, InputGroup, InputGroupAddon, InputGroupText, CustomInput, Form, Button, Row } from 'reactstrap'
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl'
import Select from 'react-select'; 
import './style.scss'
import {uniqBy} from 'lodash'
import {selectFieldsGroups} from './selectFieldsGroups'
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
        updateFormData,
        fieldsGroups = {},
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
            (<Card className="card-form">
                <CardBody className="p-4">
                    { title !== "" ? <h2>{title}</h2> : '' }
                    <Form onSubmit={onSubmit} noValidate>
                            {selectFieldsGroups(fields,fieldsGroups).map((formfields) => {
                                // const field = fields[key];
                                return (<div key={formfields.name} className="form-group">
                                            {formfields.name !== 'undefined' && 
                                                <h4>{intl.formatMessage(messages[formfields.label])}</h4>
                                            }
                                            <Row>
                                                {formfields.fields.map((field, i) => {
                                                    return (
                                                        <fieldset key={`${field.name}-${i}`} className={`${field.width ? field.width : ""} mb-3`}>
                                                            <div className="form-label">
                                                                {messages[field.name] && intl.formatMessage(messages[field.name])}
                                                            </div>
                                                            {field.type === 'checkbox' &&
                                                                (<CustomInput
                                                                    className="form-control"
                                                                    id={field.name}
                                                                    type={field.type}
                                                                    name={field.name}
                                                                    label={messages[field.name] && intl.formatMessage(messages[field.name])}
                                                                    value={formData[field.name] ? formData[field.name] : ""}
                                                                    onChange={(e) => handleChange(e)}
                                                                    required={field.required ? field.required : false}
                                                                    // checked={formData[field.name]}
                                                                />)
                                                            ||
                                                            field.type === 'select' &&
                                                                ( <CustomInput
                                                                    className="form-control"
                                                                    id={field.name}
                                                                    type={field.type}
                                                                    placeholder={intl.formatMessage(messages[field.name])}
                                                                    name={field.name}
                                                                    value={formData[field.name] ? formData[field.name] : ""}
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
                                                                    name={field.name}
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
                                                                    placeholder={messages[field.name] && intl.formatMessage(messages[field.name])}
                                                                    name={field.name}
                                                                    value={formData[field.name] ? formData[field.name] : ""}
                                                                    onChange={(e) => handleChange(e)}
                                                                    required={field.required ? field.required : false}
                                                                />)
                                                            }
                                                        </fieldset>
                                                    )
                                                })}
                                            </Row>
                                        </div>)
                            })}
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
