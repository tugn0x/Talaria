import React, {useEffect, useState} from 'react'
import { Card, CardBody, Form, Button, Row } from 'reactstrap'
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl'
import formMessages from './messages'
import {ErrorBox} from 'components';
import {selectFieldsGroups} from './selectFieldsGroups'
import ListCheckBox from '../ListCheckBox'
import GrantedPermissions from '../GrantedPermissions'
import InputField from '../InputField'
import Switch from '../Switch'
import OptionList from '../OptionList'
import CheckBox from '../CheckBox'
import './style.scss'
// PROPS
// fields
// callback action
// classes

const CustomForm = (props) => {
    const {
        submitCallBack = () => null,
        title = 'Form',
        className = '',
        submitText = "Submit",
        submitColor = "brown",
        fields = {},
        searchOptionList,
        messages,
        requestData,
        fieldsGroups = {},
    } = props

    const intl = useIntl();
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
    const [formData, setFormData] = useState({})

    
    /* HANDLE CHANGE Generico */
    const handleChange = (value, field_name) =>{
        setFormData({ ...formData, [field_name]: value   });  
        setIsSubmitDisabled(false)
    } 

    
    
    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        form.classList.add('was-validated');
        if (form.checkValidity() === false) {
            console.log("Dont Send Form")
            // Ci sono ERRORI nella VALIDAZIONE!
            // Scroll sul campo che non e' stato fillato
            const errorTarget = document.querySelectorAll('.was-validated .form-control:invalid')[0]
            const errorTargetTop = errorTarget.offsetParent.offsetTop + 95;
            window.scrollTo({
                top: errorTargetTop,
                behavior: "smooth"
            }); 
            
            return
        } else {
            // Tutto ok invia Form!
            let dataToSend = {}
             Object.keys(formData).map(key => (
                formData[key].value ? dataToSend[key] = formData[key].value : dataToSend[key] = formData[key]
            ))
            submitCallBack(dataToSend)
            console.log("Send Form", dataToSend)
        }
        return
    }


    return (
        Object.keys(fields).length &&
            (<Card className="card-form">
                <CardBody className="p-4">
                    { title !== "" ? <h2>{title}</h2> : '' }
                    <Form onSubmit={onSubmit} noValidate>
                        <div className="form-groups">
                            {selectFieldsGroups(fields,fieldsGroups).map((fieldsGroup) => {
                                // const field = fields[key];
                                return (<div key={fieldsGroup.name} className="form-group">
                                            {fieldsGroup.name !== 'undefined' &&
                                                <h4>{intl.formatMessage(messages[fieldsGroup.label])}</h4>
                                            }
                                            <Row>
                                                {fieldsGroup.fields.map((field, i) => {
                                                    return (
                                                        <fieldset key={`${field.name}-${i}`} className={`${field.width ? field.width : ""} mb-3`}>
                                                            <div className="form-label">
                                                                {messages[field.name] && intl.formatMessage(messages[field.name])}
                                                            </div>
                                                                {field.type === 'list-checkbox' &&
                                                                    <ListCheckBox
                                                                        type="checkbox"
                                                                        data={props[field.name]}
                                                                        selectedData={requestData && requestData[field.name] && !formData[field.name] ? requestData[field.name] : formData[field.name] ? formData[field.name] : []}
                                                                        handleChange={(value) => handleChange(value, field.name)}
                                                                    />
                                                                ||
                                                                field.type === 'checkbox' &&
                                                                    <>
                                                                    <CheckBox 
                                                                        field={field}
                                                                        label={field.label && field.label}
                                                                        data={!formData[field.name] && requestData && requestData[field.name] ? requestData[field.name] : formData[field.name]}
                                                                        handleChange={(value) => handleChange(value, field.name)}
                                                                    />   
                                                                    </>
                                                                ||
                                                                field.type === 'custom-select' &&
                                                                   <>
                                                                   <OptionList 
                                                                        field={field}
                                                                        selectedData={
                                                                            !formData[field.name] && requestData && requestData[field.name] ? props[field.name].filter(opt => opt.value === requestData[field.name])[0] :
                                                                            formData[field.name] ? formData[field.name] :
                                                                            {label: intl.formatMessage(formMessages.select), value: 0}
                                                                        }
                                                                        options={props[field.name] ? props[field.name] : field.options}
                                                                        searchOptionList={field.search ? searchOptionList : {} }
                                                                        handleChange={(value) => handleChange(value, field.name)}
                                                                    /> 
                                                                    </>
                                                                ||
                                                                field.type === 'switch' &&
                                                                    <Switch 
                                                                        field={field}
                                                                        data={!formData[field.name] && requestData && requestData[field.name] ? requestData[field.name] : formData[field.name]}
                                                                        label={messages[field.name]}
                                                                        handleChange={(value) => handleChange(value, field.name)}
                                                                    />
                                                                ||
                                                                field.type === 'granted_permissions' &&
                                                                    <GrantedPermissions 
                                                                        usersData={!formData[field.name] && props[field.name] ? props[field.name] : formData[field.name]}
                                                                        sendData={(value) => handleChange(value, field.name)}
                                                                        searchOptionList={searchOptionList}
                                                                        usersOptionList={props[field.options]}
                                                                        resources={props.resources && props.resources}
                                                                    /> 
                                                                ||
                                                                    <>  {/*  TEXT, TEXTAREA, NUMBER  */}
                                                                        <InputField 
                                                                            field={field}
                                                                            label={messages[field.name] ? messages[field.name] : ""}
                                                                            data={!formData[field.name] && requestData && requestData[field.name] ? requestData[field.name] : formData[field.name]}
                                                                            handleChange={(value) => handleChange(value, field.name)}
                                                                        />  
                                                                    </>
                                                                }
                                                                <ErrorBox className="invalid-feedback" error={ field.error ?  intl.formatMessage({ id: field.error }) : intl.formatMessage(formMessages.invalid_field)} />
                                                        </fieldset>
                                                    )
                                                })}
                                            </Row>
                                        </div>)
                            })}
                        {props.children}
                        </div>
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
