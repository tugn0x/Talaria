import React, {useEffect, useState} from 'react'
import { Card, CardBody, Form, Button,Label, Row } from 'reactstrap'
import PropTypes, { object } from 'prop-types';
import {FormattedHTMLMessage, useIntl} from 'react-intl'
import formMessages from './messages'
import {ErrorBox} from 'components';
import {selectFieldsGroups} from './selectFieldsGroups'
import ListCheckBox from '../ListCheckBox'
import ListCheckBoxName from '../ListCheckBoxName'
import GrantedPermissions from '../GrantedPermissions'
import InputField from '../InputField'
import Switch from '../Switch'
import OptionList from '../OptionList'
import CheckBox from '../CheckBox'
import './style.scss'
import scrollTo from 'utils/scrollTo';
import {withRouter} from 'react-router-dom'
import MapSelector from '../MapSelector';
import { v4 as uuid } from 'uuid';
import { filter} from 'lodash';
// PROPS
// fields
// callback action
// classes

const CustomForm = (props) => {
    console.log('CustomForm', props)
    const {
        submitCallBack = () => null,
        title,
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
    const initialList = [];
    const [list, setList] = React.useState(initialList);
    const [identifierFound, setIdentifierFound] = useState(false)
    const [dblist, setdbList] = React.useState(initialList);

    const AddNewIdentifier = (e, field_name, value) => {
        e.preventDefault();
        setIsSubmitDisabled(false);

        if (!isIdentifierFound)
        {
                if (formData.identifier_type_id!==null && formData.library_identifiers_txt!==null)
                {
                    const unique_id = uuid();
                    const newList = list.concat({
                        id: unique_id,
                        identifiertype: formData.identifier_type_id,
                        name: formData.library_identifiers_txt,
                    });

                    //To show selected identifiers in the summary report
                    const arraylist=[];
                    setList(newList);
                    const filtertedlist=newList.map(
                        (element)=>{
                                if (element.identifiertype!==undefined && element.name!==undefined)
                                    return arraylist.concat(element.identifiertype.value,element.name, element.identifiertype.label)
                        }
                    )
                    //console.log("filtertedlist" + JSON.stringify(filtertedlist))
                    formData.identifiers_id = filtertedlist
                    props.AddNewIdentifier &&
                    props.AddNewIdentifier(field_name, value, filtertedlist);
                    setIdentifierFound(false)
                }
        }
        else
            setIdentifierFound(true)
    };

    
    const isIdentifierFound = list.some(item => {
        if (formData.identifier_type_id!== undefined)
            if (item.identifiertype.value === formData.identifier_type_id.value) {
        return true;
        }
    });

    const RemoveIdentifier = (id, field_name, value) => {
        setIsSubmitDisabled(false);
        const newList = list.filter(item => item.id !== id);
            const arraylist=[];
            setList(newList);
            const filtertedlist=newList.map(
                (element)=>{
                    return arraylist.concat(element.identifiertype.value,element.name)
                }
            )
            console.log("filtertedlist" + JSON.stringify(filtertedlist))
            formData.identifiers_id = filtertedlist
            props.RemoveIdentifier &&
            props.RemoveIdentifier(field_name, value, filtertedlist);
        };

    /* HANDLE CHANGE Generic */
    const handleChange = (value, field_name, order) =>{

        setFormData({ ...formData, [field_name]: value, 'order':order});
        setIsSubmitDisabled(false)
        // props per il wizard form registra biblioteca pubblica
        props.onChangeData && props.onChangeData(field_name, value, order) 
        props.getValidation &&  props.getValidation(document.querySelector('form').checkValidity()) 
    }


    /* HANDLE CHANGE Generic */
    const onClickData = (e, value, field_name) =>{
        console.log(e + " " + "onClickData called")
        e.preventDefault();
        setIsSubmitDisabled(false)
        props.onClickData && props.onClickData(field_name, value);
    }


    const RetrievePositionData = (e, value, field_name) =>{
        e.preventDefault();
        setIsSubmitDisabled(false)
        props.RetrievePositionData && props.RetrievePositionData(field_name, value);
    }

    useEffect ( ()=>{
        (props.requestData && props.requestData!==null && props.requestData['identifiers']!==undefined) ?  setdbList(props.requestData['identifiers'].data) : setdbList(null)
    },[props.requestData])

   
    useEffect ( ()=>{
        if (props.requestData)
        {
            if (props.requestData.backbuttonPressed===undefined)
            {
                if(props.requestData!==undefined && props.requestData!==null)
                    if(dblist!==null)
                        if(dblist!==null && dblist.length>0)
                        {
                            
                            const newList = dblist.map((element) => ({
                                id: element.id,
                                identifiertype: {value:element.pivot.identifier_id,label:element.name},
                                name: element.pivot.cod}));
                            setList(newList)
                            setIdentifierFound(false)
                        } else    setList([])
            }
        }
    },[dblist])
        
    useEffect ( ()=>{ //backbutton pressed in library registration
        if (props.requestData && props.requestData!==undefined && props.requestData.backbuttonPressed!==undefined)
        {
            if (props.requestData.identifiers_id!==undefined)
            {
                const newList = props.requestData.identifiers_id.map((itemof)=>({
                                id: itemof[0],
                                identifiertype: {label: itemof[2], value:itemof[0]},
                                name: itemof[1]}));
                setList(newList)
                props.requestData.library_identifiers_txt = ""
                props.requestData.identifier_type_id = null
                console.log(JSON.stringify(props))
            }
        }
    },[])

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
                    { title && <h3>{title}</h3>  }
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
                                                                {field.type === 'list-checkbox-name' &&
                                                                    <ListCheckBoxName
                                                                        type="checkbox"
                                                                        data={props[field.name]}
                                                                        selectedData={props.requestData && props.requestData[field.name] && !formData[field.name] ? props.requestData[field.name] : formData[field.name] ? formData[field.name] : []}
                                                                        handleChange={(value) => handleChange(value, field.name, field.order)}
                                                                        />
                                                                ||
                                                                field.type === 'list-checkbox' &&
                                                                    <ListCheckBox
                                                                        type="checkbox"
                                                                        data={props[field.name]}
                                                                        selectedData={props.requestData && props.requestData[field.name] && !formData[field.name] ? props.requestData[field.name] : formData[field.name] ? formData[field.name] : []}
                                                                        handleChange={(value) => handleChange(value, field.name, field.order)}
                                                                        />
                                                                ||
                                                                field.type === 'checkbox' &&
                                                                    <>
                                                                    <CheckBox 
                                                                        field={field}
                                                                        disabled={field.disabled ? field.disabled : false}
                                                                        label={field.label && field.label}
                                                                        data={formData[field.name] === undefined && props.requestData && props.requestData[field.name] ? props.requestData[field.name] : formData[field.name]}
                                                                        handleChange={(value) => handleChange(value, field.name, field.order)}
                                                                        />   
                                                                    </>
                                                                ||
                                                                field.type === 'custom-select' &&
                                                                   <>
                                                                    <OptionList 
                                                                        disabled={field.disabled ? field.disabled : false}
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
                                                                        handleChange={(value) => handleChange(value, field.name, field.order)}
                                                                        />  
                                                                    </>
                                                                ||
                                                                field.type === 'switch' &&
                                                                    <Switch 
                                                                        field={field}
                                                                        disabled={field.disabled ? field.disabled : false}
                                                                        data={!formData[field.name] && props.requestData && props.requestData[field.name] ? props.requestData[field.name] : formData[field.name]}
                                                                        label={messages[field.name]}
                                                                        handleChange={(value) => handleChange(value, field.name, field.order)}
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
                                                                            selectedMarker={props.selectedMarker}
                                                                            onPlacesSearch={props.onPlacesSearch}
                                                                            getMarkers={props.getMarkers}
                                                                            markers={props.markers}
                                                                            onMarkerClick={props.onMarkerClick}                                                                            
                                                                            handleChange={(value) => handleChange(value, field.name)}
                                                                            placesList={props.places}
                                                                            placesFreeSearchPlaceholder={props.placesFreeSearchPlaceholder}
                                                                            label={messages[field.name] ? intl.formatMessage(messages[field.name]) : ""}
                                                                            markerPopupComponent={props.markerPopupComponent}
                                                                        ></MapSelector>                                                                    
                                                                ||
                                                                
                                                                field.type === 'Button' &&
                                                                <>
                                                                    <Button
                                                                    color={field.color}
                                                                    field={field}
                                                                    label={field.label && field.label}
                                                                    onClick={(e, value) => onClickData(e, value, field.name)}
                                                                    >{field.label}</Button> 
                                                                </>  
                                                                ||
                                                                field.type === 'ButtonMapPosition' &&
                                                                <>
                                                                    <Button
                                                                    color={field.color}
                                                                    field={field}
                                                                    label={field.label && field.label}
                                                                    disabled={field.disabled ? field.disabled : false}
                                                                    onClick={(e, value) => RetrievePositionData(e, value, field.name)}
                                                                    >{field.label}</Button> 
                                                                </>  
                                                                ||
                                                                 field.type === 'spinner' &&
                                                                 <>
                                                                     <div className="spinner-container" >
                                                                        <div className="loading-spinner"></div>
                                                                    </div>
                                                                 </> 
                                                                 ||
                                                                 (field.type === 'list' && list.length > 0 && (
                                                                    <>
                                                                        {
                                                                         (identifierFound) &&
                                                                            <div className="alert alert-danger" role="alert">
                                                                                <strong>{intl.formatMessage({id:'app.containers.RegisterNewLibrary.duplicate_identifer_type'})}</strong>
                                                                            </div>
                                                                         }
                                                                        <table className="table table-striped">
                                                                            <thead>
                                                                                <tr>
                                                                                    {/* <th scope="col">#</th> */}
                                                                                    <th scope="col" className="col-md-6">
                                                                                    Type
                                                                                    </th>
                                                                                    <th scope="col" className="col-md-4">
                                                                                    Name
                                                                                    </th>
                                                                                    <th scope="col" className="col-md-2">
                                                                                    Actions
                                                                                    </th>
                                                                                </tr>
                                                                            </thead>
                                                                        <tbody>
                                                                            {list.map((item, id) => (
                                                                            <>
                                                                            <tr>
                                                                                <td>
                                                                                <span>
                                                                                    {item.identifiertype.label}
                                                                                </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>{item.name}</span>
                                                                                </td>
                                                                                <td>
                                                                                    <a
                                                                                    className="btn btn-icon btn-sm"
                                                                                    onClick={() =>
                                                                                    RemoveIdentifier(item.id)
                                                                                    }
                                                                                    >
                                                                                    <i className="fa-solid fa-trash" />
                                                                                    </a>
                                                                                </td>
                                                                            </tr>
                                                                            </>
                                                                            ))}
                                                                        </tbody>
                                                                        </table>
                                                                    </>
                                                                    )) 
                                                                    ||
                                                                    (field.type === 'AddButton' && (
                                                                    <>
                                                                    <Button
                                                                        field={field}
                                                                        label={field.label && field.label}
                                                                        color="brown"
                                                                        style={{fontSize: field.size,marginTop:field.margintop,  paddingBottom: field.paddingbottom, paddingTop: field.paddingtop}}
                                                                        disabled={field.disabled ? field.disabled : false} onClick={(e, value, newList) =>
                                                                        AddNewIdentifier(e, value, newList)
                                                                    }
                                                                    >
                                                                    {field.label}
                                                                    </Button>
                                                                    </>
                                                                    )) 
                                                                    
                                                                ||
                                                                field.type === 'Label' &&
                                                                <>
                                                                   <Label                                                                     
                                                                    label={field.label && field.label}                                                                    
                                                                    style={{fontSize: field.size, paddingBottom: field.paddingbottom, paddingTop: field.paddingtop, color:field.color}}
                                                                    cssModule = {field.cssModule}
                                                                    >{messages[field.name]?intl.formatMessage(messages[field.name]):"FIX:"+field.name}</Label>
                                                                </>  
                                                                ||
                                                                    <>  {/*  TEXT, TEXTAREA, NUMBER  */}
                                                                        <InputField 
                                                                            field={field}                                                                            
                                                                            label={messages[field.name] ? messages[field.name] : ""}
                                                                            data={!formData[field.name] && props.requestData && props.requestData[field.name] ? props.requestData[field.name] : formData[field.name]}
                                                                            //handleChange={(value) => handleChange(value, field.name, field.order)}
                                                                            handleChange={(value) => handleChange(value, field.name, field.order)}
                                                                        />  
                                                                    </>
                                                                }
                                                                {field.type !='Label' && <ErrorBox className="invalid-feedback" error={ field.error ?  intl.formatMessage({ id: field.error }) : intl.formatMessage(formMessages.invalid_field)} />}
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
