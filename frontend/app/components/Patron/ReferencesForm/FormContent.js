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

//NOTA: submit non si disabilita correttamente (sopratt se importo da pmid è disabilitato anche se non dovrebbe)
//appena scateno onchange magicam il submit si abilita/disab in base alle condizioni
//a volte il title_part non è editable

const FormContent = (props) => {
    console.log('FormEdit Reference', props)
    const {reference, messages, submitCallBack, 
            applyLabels, labelsOptionList, applyGroups, groupsOptionList,
            removeLabel, removeGroup, deleteReference} = props;
    const [formData, setFormData] = useState(() => {
        if(!reference)
            return {material_type: 1, pubyear: "", authors: "", volume: "", pages: ""}
        else return {...reference}    
        
    })
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
    const [requiredFields, setRequiredFields] = useState(true)
    const [formClasses, setFormClasses] = useState(["reference-form"])
    const intl = useIntl();
   
    const handleChange = (value, field_name) =>{
        setFormData({ ...formData, [field_name]: value});
    } 

    useEffect(() => {
       setRequiredFields(() => requiredConditions(formData));
       setIsSubmitDisabled(document.querySelectorAll('.form-control:invalid').length>0)
    }, [formData])

    useEffect(() => {
        reference && Object.keys(reference.length > 0) ?  setFormData({...formData, ...reference}) : null
    },[reference])

    useEffect(() => {
        setFormClasses( (state) => [...state, 'was-validated'])
        setIsSubmitDisabled(document.querySelectorAll('.form-control:invalid').length>0);
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
                title={messages.header}
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
                    <RadioButton 
                        label={intl.formatMessage(messages.cartography)} 
                        checked={formData.material_type === 4 ? true : false}
                        handleChange={(e) =>  e.target.checked ? handleChange(4, 'material_type') : null}
                        
                    />
                    <RadioButton 
                        label={intl.formatMessage(messages.manuscript)} 
                        checked={formData.material_type === 5 ? true : false}
                        handleChange={(e) =>  e.target.checked ? handleChange(5, 'material_type') : null}
                        
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
                            label={intl.formatMessage(messages.pub_title)}
                            handleChange={(value) => handleChange(value, 'pub_title')}
                            required={true}
                            input={formData.pub_title ? formData.pub_title : ""}
                        />
                    </FormGroup>
                    {(formData.material_type === 1 || formData.material_type === 2 || formData.material_type === 3 || formData.material_type === 5) && 
                    <FormGroup>
                        <Input 
                            label={formData.material_type === 1 ? intl.formatMessage(messages.part_title) : formData.material_type === 2 ? intl.formatMessage(messages.section): intl.formatMessage(messages.chapter)}
                            handleChange={(value) => handleChange(value, 'part_title')}
                            input={formData.part_title ? formData.part_title : ""}
                            required={(formData.material_type === 1 || formData.material_type === 2)?true:false}
                        />
                    </FormGroup>}
                    {(formData.material_type !== 1 ) && 
                    <FormGroup >
                        <Input 
                            label={formData.material_type === 3 ? intl.formatMessage(messages.candidate) : intl.formatMessage(messages.authors)}
                            handleChange={(value) => handleChange(value, 'authors')}
                            input={formData.authors  ? formData.authors : ""}
                            required={formData.material_type===3?true:requiredFields}
                        />
                    </FormGroup>}
                    {(formData.material_type === 1 || formData.material_type === 2) && 
                    <FormGroup >
                        <Input 
                            label={formData.material_type === 1? intl.formatMessage(messages.authors):intl.formatMessage(messages.part_authors)}
                            handleChange={(value) => handleChange(value, 'part_authors')}
                            input={formData.part_authors  ? formData.part_authors : ""}
                            required={requiredFields}
                        />
                    </FormGroup>}
                    {(formData.material_type === 3) && 
                    <FormGroup >
                        <Input 
                            label={intl.formatMessage(messages.relator)}
                            handleChange={(value) => handleChange(value, 'relator')}
                            input={formData.relator  ? formData.relator : ""}
                            required={true}
                        />
                    </FormGroup>}
                    {(formData.material_type === 3) && 
                    <FormGroup >
                    <Input 
                        label={intl.formatMessage(messages.thesis_type)}
                        handleChange={(value) => handleChange(value, 'thesis_type')}
                        input={formData.thesis_type  ? formData.thesis_type : ""}
                        required={false}
                    />
                    </FormGroup>}
                    {(formData.material_type === 3) && 
                    <FormGroup >
                    <Input 
                        label={intl.formatMessage(messages.degree_course)}
                        handleChange={(value) => handleChange(value, 'degree_course')}
                        input={formData.degree_course  ? formData.degree_course : ""}
                        required={false}
                    />
                    </FormGroup>}
                    {(formData.material_type === 1 || formData.material_type === 2 || formData.material_type === 4) && 
                    <FormGroup >
                    <Input 
                        label={formData.material_type === 4? intl.formatMessage(messages.collection):intl.formatMessage(messages.series_title)}
                        handleChange={(value) => handleChange(value, 'series_title')}
                        input={formData.series_title  ? formData.series_title : ""}
                        required={false}
                    />
                    </FormGroup>}
                    {(formData.material_type === 4) && 
                    <FormGroup >
                    <Input 
                        label={intl.formatMessage(messages.geographic_area)}
                        handleChange={(value) => handleChange(value, 'geographic_area')}
                        input={formData.geographic_area  ? formData.geographic_area : ""}
                        required={false}
                    />
                    </FormGroup>}
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
                                required={formData.material_type===1?requiredFields:formData.material_type===3?true:false}
                            />
                        </FormGroup>
                        {(formData.material_type === 1 || formData.material_type === 2) && 
                        <FormGroup className="col-md-3 col-lg-2">
                            <Input 
                                label={intl.formatMessage(messages.volume)}
                                type="string"
                                handleChange={(value) => handleChange(value, 'volume')}
                                input={formData.volume ? formData.volume : ""}
                                required={formData.material_type===1?requiredFields:false}
                            />
                        </FormGroup>}
                        {(formData.material_type === 1) && 
                        <FormGroup className="col-md-3 col-lg-2">
                            <Input 
                                label={intl.formatMessage(messages.issue)}
                                type="string"
                                handleChange={(value) => handleChange(value, 'issue')}
                                input={formData.issue ? formData.issue : ""}
                                required={formData.material_type===1?requiredFields:false}
                            />
                        </FormGroup>}
                        {(formData.material_type !== 4 ) && 
                        <FormGroup className="col-md-4 col-lg-3">
                            <Input 
                                label={intl.formatMessage(messages.pages)}
                                type="string"
                                handleChange={(value) => handleChange(value, 'pages')}
                                input={formData.pages ? formData.pages : ""}
                                required={formData.material_type===1?requiredFields:false}
                            />
                        </FormGroup>}
                    </Row>
                    <Row>
                        {formData.material_type != 5 && 
                        <FormGroup className="col-md-4">
                            <Input 
                                label={formData.material_type === 3?intl.formatMessage(messages.university):intl.formatMessage(messages.publisher)}
                                handleChange={(value) => handleChange(value, 'publisher')}
                                input={formData.publisher ? formData.publisher : ""}
                                required={formData.material_type===3?true:false}
                            />
                        </FormGroup>}
                        {formData.material_type != 1 &&
                        <FormGroup className="col-md-4">
                            <Input 
                                label={(formData.material_type === 2||formData.material_type === 4)?intl.formatMessage(messages.publishing_place):intl.formatMessage(messages.place)}
                                handleChange={(value) => handleChange(value, 'publishing_place')}
                                input={formData.publishing_place?formData.publishing_place : ""}
                                required={false}
                            />
                        </FormGroup>}
                    </Row>
                </Card>
                <h3>{intl.formatMessage(messages.identificationHead)}</h3>
                <Card>
                    <Row>
                        {(formData.material_type === 2 || formData.material_type === 4 )&& 
                        <FormGroup className="col-md-3">
                                <Input 
                                    label={intl.formatMessage(messages.isbn)}
                                    handleChange={(value) => handleChange(value, "isbn")}
                                    input={formData.isbn ? formData.isbn  : ""}
                                    required={false}
                                />
                        </FormGroup>}
                        {(formData.material_type === 1 || formData.material_type === 2)&& 
                        <FormGroup className="col-md-3">
                        <Input 
                                    label={intl.formatMessage(messages.issn)}
                                    handleChange={(value) => handleChange(value, "issn")}
                                    input={formData.issn ? formData.issn : ""}
                                    required={false}
                                />
                        </FormGroup>}
                        <FormGroup className="col-md-4">
                            <Input 
                                label={intl.formatMessage(messages.doi)}
                                handleChange={(value) => handleChange(value, 'doi')}
                                input={formData.doi ? formData.doi : ""}
                                required={false}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-3">
                            <Input 
                                label={intl.formatMessage(messages.sid)}
                                handleChange={(value) => handleChange(value, 'sid')}
                                input={formData.sid ? formData.sid : ""}
                                required={false}
                            />
                        </FormGroup>
                    </Row>   
                    <Row>
                        <FormGroup className="col-md-3">
                            <Input 
                                label={intl.formatMessage(messages.pmid)}
                                handleChange={(value) => handleChange(value, 'pmid')}
                                input={formData.pmid ? formData.pmid : ""}
                                required={false}
                            />
                        </FormGroup>
                        {formData.material_type === 1 &&
                        <FormGroup className="col-md-4">
                            <Input 
                                label={intl.formatMessage(messages.acnp_cod)}
                                handleChange={(value) => handleChange(value, 'acnp_cod')}
                                input={formData.acnp_cod ? formData.acnp_cod : ""}
                                required={false}
                            />
                        </FormGroup>
                        ||
                        <FormGroup className="col-md-4">
                            <Input 
                                label={intl.formatMessage(messages.sbn_docid)}
                                handleChange={(value) => handleChange(value, 'sbn_docid')}
                                input={formData.sbn_docid ? formData.sbn_docid : ""}
                                required={false}
                            />
                        </FormGroup>}
                    </Row>
                </Card>
                <h3>{intl.formatMessage(messages.abstract)}</h3>
                <Card>
                    <Input 
                        handleChange={(value) => handleChange(value, 'abstract')}
                        input={formData.abstract ? formData.abstract : ""}
                        type="textarea"
                        required={false}
                    />
                    
                </Card>
                <h3>{formData.material_type === 3?intl.formatMessage(messages.indications):formData.material_type === 4?intl.formatMessage(messages.mathnote):intl.formatMessage(messages.note)}</h3>
                <Card>
                    <Input 
                        handleChange={(value) => handleChange(value, 'note')}
                        input={formData.note ? formData.note : ""}
                        type="textarea"
                        required={false}
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