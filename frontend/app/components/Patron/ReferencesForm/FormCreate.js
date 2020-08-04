import React, {useState, useEffect, useRef} from 'react';
import {Card, Form as FormContainer, FormGroup, Button, Row} from 'reactstrap';
import {useIntl} from 'react-intl';
import RadioButton from 'components/Form/RadioButton';
import scrollTo from 'utils/scrollTo';
import Input from 'components/Form/Input';
import ErrorBox from 'components/Form/ErrorBox';
import ApplyReferencesTag from '../ApplyReferencesTag';
import {requiredConditions} from './requiredConditions';
import SectionTitle from 'components/SectionTitle';
import './style.scss';


const FormCreate = (props) => {
    console.log('FormCreate Reference', props)
    const {reference, messages, submitCallBack, labelsOptionList, groupsOptionList} = props;
    const [formData, setFormData] = useState({material_type: 1, pubyear: "", first_author: "", volume: "", page_start: ""})
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
    const [requiredFields, setRequiredFields] = useState(true)
   
    const intl = useIntl();
   
    const handleChange = (value, field_name) =>{
        if(field_name === 'labels'){
            setFormData(state => ({ ...formData, labelIds: state.labelIds ? [...state.labelIds, value] : [value] }));
        } else if(field_name === 'groups'){
            setFormData(state => ({ ...formData, groupIds: state.groupIds ? [...state.groupIds, value] : [value] }));
        }
        else {
            setFormData({ ...formData, [field_name]: value});
        }
        isSubmitDisabled && setIsSubmitDisabled(false)
    } 

    const removeLabel = id => {
        setFormData(state => ({...state, labelIds: [...state.labelIds.filter(labelId => labelId !== id)] }))
    }

    const removeGroup = id => {
        setFormData(state => ({...state, groupIds: [...state.groupIds.filter(groupId => groupId !== id)] }))
    }

    useEffect(() => {
        setRequiredFields(() => requiredConditions(formData));
        console.log(formData)
     }, [formData])


    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        form.classList.add('was-validated');
        if (form.checkValidity() === false) {
            console.log("Dont Send Form")
            const errorTarget = document.querySelectorAll('.was-validated .form-control:invalid')[0]
            scrollTo(errorTarget.offsetParent, true)
            
            return
        } else {
            // Tutto ok invia Form!
            submitCallBack(formData)
            console.log("Send Form", formData)
        }
    }

    return (
        <>
            <SectionTitle 
                title={messages.header}
            />
            <FormContainer onSubmit={onSubmit}  className="reference-form" noValidate>
                <FormGroup className="radio-buttons">
                    <RadioButton 
                        label={intl.formatMessage(messages.article)} 
                        checked={formData.material_type === 1 ? true : false}
                        handleChange={(e) =>  e.target.checked ? handleChange(1, 'material_type') : null}
                    />
                    <RadioButton 
                        label={intl.formatMessage(messages.book)} 
                        checked={formData.material_type === 2 ? true : false}
                        handleChange={(e) =>  e.target.checked ? handleChange(2, 'material_type') : null}
                        
                    />
                    <RadioButton 
                        label={intl.formatMessage(messages.thesis)} 
                        checked={formData.material_type === 3 ? true : false}
                        handleChange={(e) =>  e.target.checked ? handleChange(3, 'material_type') : null}
                        
                    />
                    <input className="form-control" type="radio" name="radio" hidden required />
                    <ErrorBox 
                        className="invalid-feedback" 
                        error={  intl.formatMessage({ id: 'app.global.invalid_field' })}
                    /> 
                </FormGroup>
                
                <Row className="list-head">
                    <div className="features-icons">
                        <ApplyReferencesTag
                            type="label"
                            submitCallBack={(id) => handleChange(id, 'labels')}
                            options={labelsOptionList} 
                        />
                        <ApplyReferencesTag
                            type="group"
                            submitCallBack={(id) => handleChange(id, 'groups')}
                            options={groupsOptionList} 
                        /> 
                    </div>
                </Row>
                
                {formData.labelIds && 
                    <div className="labels-row">
                        { labelsOptionList.filter(labelOption => formData.labelIds.includes(labelOption.value)).map(label => (
                            <span key={label.value}>{label.label}<i className="fas fa-times"  onClick={() => removeLabel(label.value)}></i></span>
                        )) }
                    </div>
                } 
                {formData.groupIds && 
                    <div className="groups-row">
                        { groupsOptionList.filter(groupOption => formData.groupIds.includes(groupOption.value)).map(group => (
                            <span key={group.value}>{group.label}<i className="fas fa-times"  onClick={() => removeGroup(group.value)}></i></span>
                        )) }
                    </div>
                } 
                <h3>{intl.formatMessage(messages.titleAuthorsHead)}</h3>
                <Card>
                    <FormGroup >
                        <Input 
                            label={formData.material_type === 1 ? intl.formatMessage(messages.journalLabel) : formData.material_type === 2 ? intl.formatMessage(messages.book) : intl.formatMessage(messages.thesis)}
                            handleChange={(value) => handleChange(value, 'pub_title')}
                            required={true}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            label={formData.material_type === 1 ? intl.formatMessage(messages.articleLabel) : formData.material_type === 2 ? intl.formatMessage(messages.chapter) : intl.formatMessage(messages.articleLabel)}
                            handleChange={(value) => handleChange(value, 'part_title')}
                            required={true}
                        />
                    </FormGroup>
                    <FormGroup >
                        <Input 
                            label={intl.formatMessage(messages.authorsLabel)}
                            handleChange={(value) => handleChange(value, 'first_author')}
                            required={requiredFields}
                        />
                    </FormGroup>
                    <FormGroup >
                    </FormGroup>
                </Card>
                <h3>{intl.formatMessage(messages.dateInstitutionPlaceHead)}</h3>
                <Card>
                    <Row>
                        <FormGroup className="col-md-2">
                            <Input 
                                label={intl.formatMessage(messages.pubyear)}
                                type="number"
                                handleChange={(value) => handleChange(value, 'pubyear')}
                                required={requiredFields}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-2">
                            <Input 
                                label={intl.formatMessage(messages.volume)}
                                type="number"
                                handleChange={(value) => handleChange(value, 'volume')}
                                required={requiredFields}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-2">
                            <Input 
                                label={intl.formatMessage(messages.page_start)}
                                type="number"
                                handleChange={(value) => handleChange(value, 'page_start')}
                                required={requiredFields}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-2">
                            <Input 
                                label={intl.formatMessage(messages.page_end)}
                                type="number"
                                handleChange={(value) => handleChange(value, 'page_end')}
                            />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup className="col-md-4">
                            <Input 
                                label={intl.formatMessage(messages.publisher)}
                                handleChange={(value) => handleChange(value, 'publisher')}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-4">
                            <Input 
                                label={intl.formatMessage(messages.publishing_place)}
                                handleChange={(value) => handleChange(value, 'publishing_place')}
                            />
                        </FormGroup>
                    </Row>
                </Card>
                <h3>{intl.formatMessage(messages.identificationHead)}</h3>
                <Card>
                    <Row>
                        <FormGroup className="col-md-3">
                            <Input 
                                label={formData.material_type === 2 ? intl.formatMessage(messages.isbn) : intl.formatMessage(messages.issn)}
                                handleChange={(value) => handleChange(value, `${formData.material_type === 2 ? "isbn" : "issn"}`)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-3">
                            <Input 
                                label={intl.formatMessage(messages.doi)}
                                handleChange={(value) => handleChange(value, 'doi')}
                            />
                        </FormGroup>
                        {formData.material_type !== 2 &&
                            <FormGroup className="col-md-3">
                                <Input 
                                    label={intl.formatMessage(messages.pmid)}
                                    handleChange={(value) => handleChange(value, 'pmid')}
                                />
                            </FormGroup>
                        }
                    </Row>
                    <Row>
                        <FormGroup className="col-md-3">
                            <Input 
                                label={intl.formatMessage(messages.sid)}
                                handleChange={(value) => handleChange(value, 'sid')}
                            />
                        </FormGroup>
                    </Row>
                </Card>
                <h3>{intl.formatMessage(messages.abstract)}</h3>
                <Card>
                    <Input 
                        handleChange={(value) => handleChange(value, 'abstract')}
                        type="textarea"
                    />
                    
                </Card>
                <h3>{intl.formatMessage(messages.note)}</h3>
                <Card>
                    <Input 
                        handleChange={(value) => handleChange(value, 'note')}
                        type="textarea"
                    />
                </Card>
                <Button type="submit" disabled={isSubmitDisabled} className="btn-cta">
                    {intl.formatMessage({id: 'app.global.submit'})}
                </Button>
            </FormContainer>
        </>
    );
};

export default FormCreate;