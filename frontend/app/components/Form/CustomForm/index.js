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
import scrollTo from 'utils/scrollTo';
import {withRouter} from 'react-router-dom'
// PROPS
// fields
// callback action
// classes

const CustomForm = (props) => {
    console.log('CustomForm', props)
    const {
        submitCallBack = () => null,
        title = 'Form',
        submitText = "Submit",
        submitColor = "brown",
        fields = {},
        searchOptionList,
        messages,
        cancelButton= true,
        // requestData,
        fieldsGroups = {},
    } = props

    const intl = useIntl();
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(props.getValidation ? false : true)
    const [formData, setFormData] = useState({})

    
    /* HANDLE CHANGE Generico */
    const handleChange = (value, field_name) =>{
        setFormData({ ...formData, [field_name]: value   });
        setIsSubmitDisabled(false)
        // props per il wizard form registra biblioteca pubblica
        props.onChangeData && props.onChangeData(field_name, value) 
        props.getValidation &&  props.getValidation(document.querySelector('form').checkValidity()) 
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
            scrollTo(errorTarget.offsetParent, true)
            
            // return
        } else {
            let dataToSend = {}
            // Nel caso ci siano option list, allora restituisci solo l id / value del risultato
             Object.keys(formData).map(key => {
                dataToSend[key] = typeof formData[key] === 'object' && formData[key].hasOwnProperty('value') ?  formData[key].value : formData[key]
                
            })
            // Tutto ok invia Form!
            submitCallBack(dataToSend)
            console.log("Send Form", dataToSend)
        }
       
        return
    }

    return (
        Object.keys(fields).length > 0 &&
            (<Card className="card-form">
                <CardBody className="p-4">
                    { <h3>{title}</h3>  }
                    <Form onSubmit={onSubmit} noValidate className={props.className}>
                        <div className="form-groups">
                            {selectFieldsGroups(fields,fieldsGroups).map((fieldsGroup) => {
                                // const field = fields[key];
                                return (<div key={fieldsGroup.name} className="form-group">
                                            {fieldsGroup.name !== 'undefined' && fieldsGroup.label &&
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
                                                                        selectedData={props.requestData && props.requestData[field.name] && !formData[field.name] ? props.requestData[field.name] : formData[field.name] ? formData[field.name] : []}
                                                                        handleChange={(value) => handleChange(value, field.name)}
                                                                    />
                                                                ||
                                                                field.type === 'checkbox' &&
                                                                    <>
                                                                    <CheckBox 
                                                                        field={field}
                                                                        label={field.label && field.label}
                                                                        data={!formData[field.name] && props.requestData && props.requestData[field.name] ? props.requestData[field.name] : formData[field.name]}
                                                                        handleChange={(value) => handleChange(value, field.name)}
                                                                    />   
                                                                    </>
                                                                ||
                                                                field.type === 'custom-select' &&
                                                                   <>
                                                                    <OptionList 
                                                                        field={field}
                                                                        selectedData={
                                                                            !formData[field.name] && // formData gestisce il cambio del valore del campo da parte dell utente
                                                                            props.requestData && 
                                                                            props.requestData[field.name] && // props.requestData e' il valore che viene dal db
                                                                            props[field.name] ? // props[field.name] e' invece la lista delle opzioni possibili
                                                                            props[field.name].filter(opt => opt.value === props.requestData[field.name])[0] : // filtriamo per mostrare il valore precedentemte assegnato che viene dal db requestData
                                                                            !formData[field.name] && // non ci sono ancora interazioni da parte dell utente
                                                                            !props[field.name]  ? // non ci sono props e quindi una opzione preselezionata
                                                                            field.options.filter(opt => opt.value === props.requestData[field.name])[0] : // pero' non ci sono liste provenienti dal db props[field.name]. Quindi filtriamo una lista statica che diamo nei fields.js
                                                                            formData[field.name]   // nel caso di interazioni allora mostraiamo il valore appena scelto dall utente
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
                                                                        data={!formData[field.name] && props.requestData && props.requestData[field.name] ? props.requestData[field.name] : formData[field.name]}
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
                                                                            data={!formData[field.name] && props.requestData && props.requestData[field.name] ? props.requestData[field.name] : formData[field.name]}
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
                        <div className="d-flex justify-content-between">
                            <Button color={submitColor} disabled={isSubmitDisabled} type="submit" block>
                                {submitText}
                            </Button>
                            {cancelButton && 
                                <Button color="secondary" onClick={() => props.history.goBack() } >
                                    {intl.formatMessage(formMessages.cancel)}
                                </Button> 
                            }
                        </div>
                    </Form>
                </CardBody>
            </Card>)
    )
}

CustomForm.propTypes = {
    submitCallBack: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired
};

export default withRouter(CustomForm)
