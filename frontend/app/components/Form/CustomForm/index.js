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
import MapSelector from '../MapSelector';

// PROPS
// fields
// callback action
// classes

const CustomForm = (props) => {
    console.log('CustomForm', props)
    const {
        submitCallBack = () => null,
        title = 'Form',
        submitText,
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

    
    /* HANDLE CHANGE Generic */
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
                                                        <fieldset hidden={field.hidden}  key={`${field.name}-${i}`} className={`${field.width ? field.width : ""} mb-3`}>                                                                
                                                                {!field.nolabel && <div className="form-label">
                                                                    {messages[field.name] && intl.formatMessage(messages[field.name])}
                                                                </div>}
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
                                                                        data={formData[field.name] === undefined && props.requestData && props.requestData[field.name] ? props.requestData[field.name] : formData[field.name]}
                                                                        handleChange={(value) => handleChange(value, field.name)}
                                                                    />   
                                                                    </>
                                                                ||
                                                                field.type === 'custom-select' &&
                                                                   <>
                                                                    <OptionList 
                                                                        field={field}
                                                                        selectedOption={
                                                                            !formData[field.name] && // Primo caso: niente onChange da parte dell utente
                                                                            props.requestData &&     //             dati dal db tramite requestData
                                                                            props.requestData[field.name] && //     esiste il campo specifico in requestData[field.name]
                                                                            props[field.name] ? //                  esiste una lista da filtrare con il requestData[field.name]
                                                                            props[field.name].filter(opt => opt.value === props.requestData[field.name])[0] : // filtriamo 
                                                                            !formData[field.name] && // Secondo caso: niente onChange da parte dell utente
                                                                            props.requestData &&   //             dati dal db tramite requestData
                                                                            props.requestData[field.name] && //   esiste il campo specifico in requestData[field.name]
                                                                            !props[field.name] && //              NON esiste una lista da filtrare con il requestData[field.name]
                                                                            typeof field.options === 'object' ?  // Le options sono un oggeto
                                                                            field.options.filter(opt => opt.value === props.requestData[field.name])[0] : // filtriamo
                                                                            formData[field.name]   // nel caso di interazioni allora mostraiamo il valore appena scelto dall utente
                                                                        }
                                                                        options={
                                                                            props[field.name] &&
                                                                            field.options === field.name ?
                                                                            props[field.name] :
                                                                            !props[field.name] &&
                                                                            field.options === field.name ?
                                                                            [] :
                                                                            field.options
                                                                        }
                                                                        searchOptionList={field.search ? searchOptionList : {} }
                                                                        handleChange={(value) => handleChange(value, field.name)}
                                                                    />  
                                                                    </>
                                                                ||
                                                                field.type === 'switch' &&
                                                                    <Switch 
                                                                        field={field}
                                                                        disabled={field.disabled ? field.disabled : false}
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
                                                                field.type === 'map-selector' &&
                                                                        <MapSelector  
                                                                            field={field} 
                                                                            onPlacesSearch={props.onPlacesSearch}
                                                                            getMarkers={props.getMarkers}
                                                                            markers={props.markers}
                                                                            onMarkerClick={props.onMarkerClick}
                                                                            handleChange={(value) => handleChange(value, field.name)}
                                                                            placesList={props.places}
                                                                            label={messages[field.name] ? intl.formatMessage(messages[field.name]) : ""}
                                                                        ></MapSelector>                                                                    
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
                            {submitText?submitText:intl.formatMessage(formMessages.submit)}
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
