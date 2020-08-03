import React, {useState, useEffect} from 'react';
import {Card, Form as FormContainer, FormGroup, Button, Row} from 'reactstrap';
import {useIntl} from 'react-intl';
import RadioButton from 'components/Form/RadioButton';
import scrollTo from 'utils/scrollTo';
import Input from 'components/Form/Input';
import ErrorBox from 'components/Form/ErrorBox';
import ReferenceIcons from '../ReferenceIcons';
import './style.scss';

const Form = (props) => {
    console.log('Form Reference', props)
    const {reference, messages, submitCallBack, applyLabels, labelsOptionList} = props;
    const [formData, setFormData] = useState({material_type: 1})
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
   // const [formData.material_type, setMaterialType] = useState(1);
    const intl = useIntl();

    const handleChange = (value, field_name) =>{
        /* if(field_name === 'material_type'){
            setMaterialType(value)
        } */
        setFormData({ ...formData, [field_name]: value   });
        isSubmitDisabled && setIsSubmitDisabled(false)
    } 

    useEffect(() => {
        if(reference && Object.keys(reference.length > 0)){
            // setFormData(reference ? {material_type: reference.material_type} : {} )
            setFormData({...formData, ...reference})
          //  setMaterialType(reference.material_type)
        }
        //console.log(reference)
    },[reference])

    const setRequired = (field) => {
        /* let required = false
        switch(field) {
            case 'pubyear':
                formData[field] === "" && formData.page_start !== ""  
                ? required = true 
                : formData[field] === "" && formData.first_author !== "" 
                ? required = true 
                : required = false 
            break;
        }
        return required; */
    }

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
            let dataToSend = {}
            // Nel caso ci siano option list, allora restituisci solo l id / value del risultato
             Object.keys(formData).map(key => {
                dataToSend[key] = typeof formData[key] === 'object' && formData[key].hasOwnProperty('value') ?  formData[key].value : formData[key]
                
            }) 
            // Tutto ok invia Form!
            submitCallBack(dataToSend)
            console.log("Send Form", formData)
        }
    }

    return (
        <>
            <div className="section-title">
                <h1 className="large">
                    {reference && 
                        intl.formatMessage(messages.headerDetail)
                    ||
                        intl.formatMessage(messages.header)
                    }
                </h1>
            </div>
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
                {reference &&
                    <Row className="list-head">
                        <div className="features-icons">
                            <ReferenceIcons 
                                data={reference ? reference : {}}
                                icons={['assignLabel']}
                                labelsOptionList={labelsOptionList}
                                applyLabels={applyLabels}
                                selectedReferences={[reference ? reference.id : null]}
                                // deleteReference={deleteReference}
                            />
                        </div>
                    </Row>
                }
                {reference && reference.labels && Object.keys(reference.labels.data).length > 0 &&
                    <div className="labels-row">
                        {reference.labels.data.map(label => <span key={label.id}>{label.name} <i className="fas fa-times"  onClick={() => null}></i></span>)}
                    </div>
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
                    <FormGroup >
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
                            input={formData.first_author ? formData.first_author : ""}
                            // required={() => setRequired('first_author')}
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
                                input={formData.pubyear ? formData.pubyear : ""}
                                // required={formData.first_author !== "" || formData.page_start !== "" ? true : false}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-2">
                            <Input 
                                label={intl.formatMessage(messages.volume)}
                                type="number"
                                handleChange={(value) => handleChange(value, 'volume')}
                                input={formData.volume ? formData.volume : ""}
                                required={true}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-2">
                            <Input 
                                label={intl.formatMessage(messages.page_start)}
                                type="number"
                                handleChange={(value) => handleChange(value, 'page_start')}
                                input={formData.page_start ? formData.page_start : ""}
                                // required={() => setRequired('page_start')}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-2">
                            <Input 
                                label={intl.formatMessage(messages.page_end)}
                                type="number"
                                handleChange={(value) => handleChange(value, 'page_end')}
                                input={formData.page_end ? formData.page_end : ""}
                                required={true}
                            />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup className="col-md-4">
                            <Input 
                                label={intl.formatMessage(messages.publisher)}
                                handleChange={(value) => handleChange(value, 'publisher')}
                                input={formData.publisher ? formData.publisher : ""}
                                required={true}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-4">
                            <Input 
                                label={intl.formatMessage(messages.publishing_place)}
                                handleChange={(value) => handleChange(value, 'publishing_place')}
                                input={formData.publishing_place ? formData.publishing_place : ""}
                                required={true}
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
                                input={formData.material_type === 2 &&  formData.isbn ? formData.isbn : formData.issn ? formData.issn : ""}
                                required={true}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-3">
                            <Input 
                                label={intl.formatMessage(messages.doi)}
                                handleChange={(value) => handleChange(value, 'doi')}
                                input={formData.doi ? formData.doi : ""}
                                // required={true}
                            />
                        </FormGroup>
                        {formData.material_type !== 2 &&
                            <FormGroup className="col-md-3">
                                <Input 
                                    label={intl.formatMessage(messages.pmid)}
                                    handleChange={(value) => handleChange(value, 'pmid')}
                                    input={formData.pmid ? formData.pmid : ""}
                                   // required={true}
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
                                // required={true}
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

export default Form;