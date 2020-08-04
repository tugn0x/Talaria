import React, {useState, useEffect, useRef} from 'react';
import {Card, Form as FormContainer, FormGroup, Button, Row} from 'reactstrap';
import {useIntl} from 'react-intl';
import RadioButton from 'components/Form/RadioButton';
import scrollTo from 'utils/scrollTo';
import Input from 'components/Form/Input';
import ErrorBox from 'components/Form/ErrorBox';
import ReferenceIcons from '../ReferenceIcons';
import {requiredConditions} from './requiredConditions';
import SectionTitle from 'components/SectionTitle';
import './style.scss';


const FormEdit = (props) => {
    console.log('FormEdit Reference', props)
    const {reference, messages, submitCallBack, 
            applyLabels, labelsOptionList, applyGroups, groupsOptionList,
            removeLabel, removeGroup, deleteReference} = props;
    const [formData, setFormData] = useState({material_type: 1})
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
    const [requiredFields, setRequiredFields] = useState(true)
   
    const intl = useIntl();
   
    const handleChange = (value, field_name) =>{
        setFormData({ ...formData, [field_name]: value});
        isSubmitDisabled && setIsSubmitDisabled(false)
    } 

    useEffect(() => {
        setRequiredFields(() => requiredConditions(formData));
     }, [formData])

    useEffect(() => {
        if(reference && Object.keys(reference.length > 0)){
            setFormData({...formData, ...reference})
        }
    },[reference])

  

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
                title={messages.headerDetail}
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
                        <ReferenceIcons 
                            data={reference}
                            icons={['assignLabel', 'assignGroup', 'delete']}
                            labelsOptionList={labelsOptionList}
                            applyLabels={applyLabels}
                            groupsOptionList={groupsOptionList}
                            applyGroups={applyGroups}
                            selectedReferences={[reference.id]}
                            deleteReference={deleteReference}
                        />
                    </div>
                </Row>
                {reference.labels && Object.keys(reference.labels.data).length > 0 &&
                    <div className="labels-row">
                        {reference.labels.data.map(label => <span key={label.id}>{label.name} <i className="fas fa-times"  onClick={() => removeLabel(reference.id, label.id )}></i></span>)}
                    </div>
                }
                {reference.groups && Object.keys(reference.groups.data).length > 0 &&
                    <div className="groups-row">
                        {reference.groups.data.map(group => <span key={group.id}>{group.name} <i className="fas fa-times"  onClick={() => removeGroup(reference.id, group.id)}></i></span>)}
                    </div>
                }
                <h3>{intl.formatMessage(messages.titleAuthorsHead)}</h3>
                <Card>
                    <FormGroup >
                        <Input 
                            label={formData.material_type === 1 ? intl.formatMessage(messages.journalLabel) : formData.material_type === 2 ? intl.formatMessage(messages.book) : intl.formatMessage(messages.thesis)}
                            handleChange={(value) => handleChange(value, 'pub_title')}
                            required={true}
                            input={reference.pub_title ? reference.pub_title : ""}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            label={formData.material_type === 1 ? intl.formatMessage(messages.articleLabel) : formData.material_type === 2 ? intl.formatMessage(messages.chapter) : intl.formatMessage(messages.articleLabel)}
                            handleChange={(value) => handleChange(value, 'part_title')}
                            input={reference.part_title ? reference.part_title : ""}
                            required={true}
                        />
                    </FormGroup>
                    <FormGroup >
                        <Input 
                            label={intl.formatMessage(messages.authorsLabel)}
                            handleChange={(value) => handleChange(value, 'first_author')}
                            input={reference.first_author  ? reference.first_author : ""}
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
                                input={reference.pubyear ? reference.pubyear : ""}
                                required={requiredFields}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-2">
                            <Input 
                                label={intl.formatMessage(messages.volume)}
                                type="number"
                                handleChange={(value) => handleChange(value, 'volume')}
                                input={reference.volume ? reference.volume : ""}
                                required={requiredFields}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-2">
                            <Input 
                                label={intl.formatMessage(messages.page_start)}
                                type="number"
                                handleChange={(value) => handleChange(value, 'page_start')}
                                input={reference.page_start ? reference.page_start : ""}
                                required={requiredFields}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-2">
                            <Input 
                                label={intl.formatMessage(messages.page_end)}
                                type="number"
                                handleChange={(value) => handleChange(value, 'page_end')}
                                input={reference.page_end ? reference.page_end : ""}
                            />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup className="col-md-4">
                            <Input 
                                label={intl.formatMessage(messages.publisher)}
                                handleChange={(value) => handleChange(value, 'publisher')}
                                input={reference.publisher ? reference.publisher : ""}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-4">
                            <Input 
                                label={intl.formatMessage(messages.publishing_place)}
                                handleChange={(value) => handleChange(value, 'publishing_place')}
                                input={reference.publishing_place  ? reference.publishing_place : ""}
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
                                input={formData.material_type === 2 &&  reference ? reference.isbn : reference ? reference.issn : ""}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-3">
                            <Input 
                                label={intl.formatMessage(messages.doi)}
                                handleChange={(value) => handleChange(value, 'doi')}
                                input={reference.doi ? reference.doi : ""}
                            />
                        </FormGroup>
                        {formData.material_type !== 2 &&
                            <FormGroup className="col-md-3">
                                <Input 
                                    label={intl.formatMessage(messages.pmid)}
                                    handleChange={(value) => handleChange(value, 'pmid')}
                                    input={reference.pmid ? reference.pmid : ""}
                                />
                            </FormGroup>
                        }
                    </Row>
                    <Row>
                        <FormGroup className="col-md-3">
                            <Input 
                                label={intl.formatMessage(messages.sid)}
                                handleChange={(value) => handleChange(value, 'sid')}
                                input={reference.sid ? reference.sid : ""}
                            />
                        </FormGroup>
                    </Row>
                </Card>
                <h3>{intl.formatMessage(messages.abstract)}</h3>
                <Card>
                    <Input 
                        handleChange={(value) => handleChange(value, 'abstract')}
                        input={reference.abstract ? reference.abstract : ""}
                        type="textarea"
                    />
                    
                </Card>
                <h3>{intl.formatMessage(messages.note)}</h3>
                <Card>
                    <Input 
                        handleChange={(value) => handleChange(value, 'note')}
                        input={reference.note ? reference.note : ""}
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

export default FormEdit;