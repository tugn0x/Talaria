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


const FormContent = (props) => {
    console.log('FormEdit Reference', props)
    const {reference, messages, submitCallBack, 
            applyLabels, labelsOptionList, applyGroups, groupsOptionList,
            removeLabel, removeGroup, deleteReference} = props;
    const [formData, setFormData] = useState(() => {
        if(!reference)
            return {material_type: 1, pubyear: "", first_author: "", volume: "", page_start: ""}
        else return {...reference}    
        
    })
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
    const [requiredFields, setRequiredFields] = useState(true)
    const [formClasses, setFormClasses] = useState(["reference-form"])
    const intl = useIntl();
   
    const handleChange = (value, field_name) =>{
        setFormData({ ...formData, [field_name]: value});
        isSubmitDisabled && setIsSubmitDisabled(false)
    } 

    useEffect(() => {
       setRequiredFields(() => requiredConditions(formData));
    }, [formData])

    useEffect(() => {
        reference && Object.keys(reference.length > 0) ?  setFormData({...formData, ...reference}) : null
    },[reference])

    useEffect(() => {
        setFormClasses(state => [...state, 'was-validated'])

        console.log("formdata",formData);
    },[]) 

    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
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
            <FormContainer onSubmit={onSubmit} className={formClasses.join(" ")} noValidate>
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
                {reference &&
                    <>
                        <Row className="list-head">
                            <div className="features-icons">
                                <ReferenceIcons 
                                    data={formData}
                                    icons={['assignLabel', 'assignGroup', 'delete']}
                                    labelsOptionList={labelsOptionList}
                                    applyLabels={applyLabels}
                                    groupsOptionList={groupsOptionList}
                                    applyGroups={applyGroups}
                                    selectedReferences={[formData.id]}
                                    deleteReference={deleteReference}
                                />
                            </div>
                        </Row>
                        {formData.labels && Object.keys(formData.labels.data).length > 0 &&
                            <div className="labels-row">
                                {formData.labels.data.map(label => <span key={label.id}>{label.name} <i className="fas fa-times"  onClick={() => removeLabel(reference.id, label.id )}></i></span>)}
                            </div>
                        }
                        {formData.groups && Object.keys(formData.groups.data).length > 0 &&
                            <div className="groups-row">
                                {formData.groups.data.map(group => <span key={group.id}>{group.name} <i className="fas fa-times"  onClick={() => removeGroup(reference.id, group.id)}></i></span>)}
                            </div>
                        }
                    </>
                }
                <h3>{intl.formatMessage(messages.titleAuthorsHead)}</h3>
                <Card>
                    <FormGroup >
                        <Input 
                            label={formData.material_type === 1 ? intl.formatMessage(messages.journalLabel) : formData.material_type === 2 ? intl.formatMessage(messages.book) : intl.formatMessage(messages.thesis)}
                            handleChange={(value) => handleChange(value, 'pub_title')}
                            required={true}
                            input={formData.pub_title ? formData.pub_title : ""}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            label={formData.material_type === 1 ? intl.formatMessage(messages.articleLabel) : formData.material_type === 2 ? intl.formatMessage(messages.chapter) : intl.formatMessage(messages.articleLabel)}
                            handleChange={(value) => handleChange(value, 'part_title')}
                            input={formData.part_title ? formData.part_title : ""}
                            required={true}
                        />
                    </FormGroup>
                    <FormGroup >
                        <Input 
                            label={intl.formatMessage(messages.authorsLabel)}
                            handleChange={(value) => handleChange(value, 'first_author')}
                            input={formData.first_author  ? formData.first_author : ""}
                            required={requiredFields}
                        />
                    </FormGroup>
                    <FormGroup >
                    </FormGroup>
                </Card>
                <h3>{intl.formatMessage(messages.dateInstitutionPlaceHead)}</h3>
                <Card>
                    <Row>
                        <FormGroup className="col-md-3 col-lg-2">
                            <Input 
                                label={intl.formatMessage(messages.pubyear)}
                                type="number"
                                handleChange={(value) => handleChange(value, 'pubyear')}
                                input={formData.pubyear ? formData.pubyear : ""}
                                required={requiredFields}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-3 col-lg-2">
                            <Input 
                                label={intl.formatMessage(messages.volume)}
                                type="number"
                                handleChange={(value) => handleChange(value, 'volume')}
                                input={formData.volume ? formData.volume : ""}
                                required={requiredFields}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-3 col-lg-2">
                            <Input 
                                label={intl.formatMessage(messages.page_start)}
                                type="number"
                                handleChange={(value) => handleChange(value, 'page_start')}
                                input={formData.page_start ? formData.page_start : ""}
                                required={requiredFields}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-3 col-lg-2">
                            <Input 
                                label={intl.formatMessage(messages.page_end)}
                                type="number"
                                handleChange={(value) => handleChange(value, 'page_end')}
                                input={formData.page_end ? formData.page_end : ""}
                            />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup className="col-md-4">
                            <Input 
                                label={intl.formatMessage(messages.publisher)}
                                handleChange={(value) => handleChange(value, 'publisher')}
                                input={formData.publisher ? formData.publisher : ""}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-4">
                            <Input 
                                label={intl.formatMessage(messages.publishing_place)}
                                handleChange={(value) => handleChange(value, 'publishing_place')}
                                input={formData.publishing_place  ? formData.publishing_place : ""}
                            />
                        </FormGroup>
                    </Row>
                </Card>
                <h3>{intl.formatMessage(messages.identificationHead)}</h3>
                <Card>
                    <Row>
                        <FormGroup className="col-md-3">
                            {formData.material_type === 2 && 
                                <Input 
                                    label={intl.formatMessage(messages.isbn)}
                                    handleChange={(value) => handleChange(value, "isbn")}
                                    input={formData.isbn ? formData.isbn  : ""}
                                />
                            ||
                                <Input 
                                    label={intl.formatMessage(messages.issn)}
                                    handleChange={(value) => handleChange(value, "issn")}
                                    input={formData.issn ? formData.issn : ""}
                                />
                            }
                            
                        </FormGroup>
                        <FormGroup className="col-md-3">
                            <Input 
                                label={intl.formatMessage(messages.doi)}
                                handleChange={(value) => handleChange(value, 'doi')}
                                input={formData.doi ? formData.doi : ""}
                            />
                        </FormGroup>
                        {formData.material_type !== 2 &&
                            <FormGroup className="col-md-3">
                                <Input 
                                    label={intl.formatMessage(messages.pmid)}
                                    handleChange={(value) => handleChange(value, 'pmid')}
                                    input={formData.pmid ? formData.pmid : ""}
                                />
                            </FormGroup>
                        }
                    </Row>
                    <Row>
                        <FormGroup className="col-md-3">
                            <Input 
                                label={intl.formatMessage(messages.sid)}
                                handleChange={(value) => handleChange(value, 'sid')}
                                input={formData.sid ? formData.sid : ""}
                            />
                        </FormGroup>
                    </Row>
                </Card>
                <h3>{intl.formatMessage(messages.abstract)}</h3>
                <Card>
                    <Input 
                        handleChange={(value) => handleChange(value, 'abstract')}
                        input={formData.abstract ? formData.abstract : ""}
                        type="textarea"
                    />
                    
                </Card>
                <h3>{intl.formatMessage(messages.note)}</h3>
                <Card>
                    <Input 
                        handleChange={(value) => handleChange(value, 'note')}
                        input={formData.note ? formData.note : ""}
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

export default FormContent;